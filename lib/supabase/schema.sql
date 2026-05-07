-- ═══════════════════════════════════════════════════════════════
-- FITNEXUS – Complete Database Schema for Supabase (PostgreSQL)
-- ═══════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────
-- ENUM TYPES
-- ─────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('customer', 'trainer', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'paused', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded');
CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'system');
CREATE TYPE subscription_tier AS ENUM ('starter', 'pro');
CREATE TYPE photo_category AS ENUM ('front', 'side', 'back', 'other');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'in_progress', 'converted', 'declined', 'lost');
CREATE TYPE notification_type AS ENUM ('booking', 'message', 'contract', 'payment', 'review', 'system');
CREATE TYPE audit_action AS ENUM ('insert', 'update', 'delete', 'login', 'export');

-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trainer profiles
CREATE TABLE trainer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT DEFAULT '',
  categories TEXT[] DEFAULT '{}',
  city TEXT DEFAULT '',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  radius_km INTEGER DEFAULT 25,
  hourly_rate NUMERIC(10,2) DEFAULT 0,
  intro_video_url TEXT,
  profile_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  rating_average NUMERIC(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  subscription_tier subscription_tier DEFAULT 'starter',
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trainer packages
CREATE TABLE trainer_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  sessions INTEGER NOT NULL DEFAULT 1,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customer profiles
-- WICHTIG: Anonymitaet wird hier durchgesetzt - Klarnamen liegen in profiles
-- aber RLS auf customer_profiles erlaubt Trainer nur Zugriff bei aktivem Vertrag.
-- Solange is_anonymous=true ist, darf KEIN Klarname-Lookup ueber profiles passieren.
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL, -- Client#XXXX
  is_anonymous BOOLEAN DEFAULT TRUE,
  -- Optionale Klarnamen-Felder, werden bei Vertragsabschluss aus profiles gespiegelt
  -- damit RLS sauberer durchsetzbar ist (statt JOIN auf profiles).
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  fitness_goals TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate display_name for customers
CREATE OR REPLACE FUNCTION generate_client_display_name()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.display_name IS NULL OR NEW.display_name = '' THEN
    NEW.display_name := 'Client#' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_display_name
  BEFORE INSERT ON customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_client_display_name();

-- ─────────────────────────────────────────────
-- BOOKINGS
-- ─────────────────────────────────────────────

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  status booking_status NOT NULL DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  notes TEXT,
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- CONTRACTS
-- ─────────────────────────────────────────────

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  package_id UUID REFERENCES trainer_packages(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status contract_status NOT NULL DEFAULT 'draft',
  monthly_rate NUMERIC(10,2) NOT NULL DEFAULT 0,
  platform_fee_percent NUMERIC(5,2) NOT NULL DEFAULT 7.00,
  sessions_total INTEGER DEFAULT 0,
  sessions_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- CHAT
-- ─────────────────────────────────────────────

CREATE TABLE chat_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(trainer_id, customer_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  message_type message_type NOT NULL DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update last_message_at on new message
CREATE OR REPLACE FUNCTION update_thread_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_threads SET last_message_at = NEW.created_at WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_last_message();

-- ─────────────────────────────────────────────
-- TRAINING & NUTRITION PLANS
-- ─────────────────────────────────────────────

CREATE TABLE workout_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  week_number INTEGER NOT NULL DEFAULT 1,
  exercises JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  calories_target INTEGER DEFAULT 0,
  protein_g INTEGER DEFAULT 0,
  carbs_g INTEGER DEFAULT 0,
  fat_g INTEGER DEFAULT 0,
  meals JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- PROGRESS TRACKING
-- ─────────────────────────────────────────────

CREATE TABLE progress_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  weight_kg NUMERIC(5,2),
  body_fat_percent NUMERIC(5,2),
  muscle_mass_kg NUMERIC(5,2),
  notes TEXT,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE progress_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  category photo_category DEFAULT 'other',
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  rating_total NUMERIC(3,2) NOT NULL CHECK (rating_total >= 1 AND rating_total <= 5),
  punctuality NUMERIC(3,2) NOT NULL CHECK (punctuality >= 1 AND punctuality <= 5),
  motivation NUMERIC(3,2) NOT NULL CHECK (motivation >= 1 AND motivation <= 5),
  knowledge NUMERIC(3,2) NOT NULL CHECK (knowledge >= 1 AND knowledge <= 5),
  sympathy NUMERIC(3,2) NOT NULL CHECK (sympathy >= 1 AND sympathy <= 5),
  cleanliness NUMERIC(3,2) NOT NULL CHECK (cleanliness >= 1 AND cleanliness <= 5),
  text TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update trainer rating on new review
CREATE OR REPLACE FUNCTION update_trainer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE trainer_profiles SET
    rating_average = (
      SELECT ROUND(AVG(rating_total)::NUMERIC, 2)
      FROM reviews
      WHERE trainer_id = NEW.trainer_id AND is_visible = TRUE
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE trainer_id = NEW.trainer_id AND is_visible = TRUE
    )
  WHERE id = NEW.trainer_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_trainer_rating();

-- ─────────────────────────────────────────────
-- PAYMENTS
-- ─────────────────────────────────────────────

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  stripe_payment_id TEXT,
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'eur',
  status payment_status NOT NULL DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- WORKOUT LOGS (was wurde wirklich trainiert)
-- ─────────────────────────────────────────────

CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES workout_plans(id) ON DELETE SET NULL,
  exercise_id TEXT NOT NULL,            -- ID aus dem JSONB-Plan
  exercise_name TEXT NOT NULL,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  prescribed_sets INTEGER,
  prescribed_reps TEXT,
  prescribed_weight TEXT,
  actual_sets JSONB NOT NULL DEFAULT '[]',  -- [{ reps, weight, rpe }]
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- MEAL LOGS (was wurde wirklich gegessen)
-- ─────────────────────────────────────────────

CREATE TABLE meal_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  meals JSONB NOT NULL DEFAULT '[]',     -- [{ name, time, foods:[{name,amount,kcal,p,c,f}] }]
  water_ml INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, recorded_at)
);

-- ─────────────────────────────────────────────
-- TRAINER AVAILABILITY (Slots / Kalender)
-- ─────────────────────────────────────────────

CREATE TABLE trainer_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  weekday SMALLINT CHECK (weekday BETWEEN 0 AND 6), -- 0=Sonntag
  start_time TIME,
  end_time TIME,
  -- Einmal-Slots oder Blockaden:
  date DATE,
  is_blocked BOOLEAN DEFAULT FALSE,      -- Urlaub / nicht buchbar
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- LEADS (Anfragen ueber Marketplace)
-- ─────────────────────────────────────────────

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
  status lead_status NOT NULL DEFAULT 'new',
  message TEXT,
  goals TEXT[] DEFAULT '{}',
  preferred_modes TEXT[] DEFAULT '{}',   -- online / vor-ort / hybrid
  budget_monthly NUMERIC(10,2),
  source TEXT,                           -- z.B. 'profile_page', 'category', 'city_page'
  converted_contract_id UUID REFERENCES contracts(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- TRAINER CERTIFICATES (verifizierbare Qualifikationen)
-- ─────────────────────────────────────────────

CREATE TABLE trainer_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT,
  document_url TEXT,                     -- Storage: certificates/
  is_verified BOOLEAN DEFAULT FALSE,     -- Manuell durch Admin
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- CATEGORIES (Master-Tabelle, statt TEXT[])
-- ─────────────────────────────────────────────

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,             -- z.B. 'krafttraining', 'yoga'
  name TEXT NOT NULL,                    -- 'Krafttraining'
  description TEXT,
  icon TEXT,                             -- Lucide-Icon-Name
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- N:M Trainer <-> Categories (zusaetzlich zu trainer_profiles.categories TEXT[])
CREATE TABLE trainer_category_links (
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (trainer_id, category_id)
);

-- ─────────────────────────────────────────────
-- NOTIFICATIONS (Push / E-Mail / In-App)
-- ─────────────────────────────────────────────

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link_url TEXT,                         -- Deep-Link ins Dashboard
  related_entity_type TEXT,              -- 'booking' / 'message' / 'contract'
  related_entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  sent_via TEXT[] DEFAULT '{}',          -- ['in_app','push','email']
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- COACH-ABOS (Plattform-Subscription, NICHT Kunden-Vertrag!)
-- ─────────────────────────────────────────────

CREATE TABLE coach_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'starter',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active / past_due / cancelled / trialing
  monthly_price_cents INTEGER NOT NULL DEFAULT 4900,  -- 49 EUR default
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- AUDIT LOG (Compliance / DSGVO)
-- ─────────────────────────────────────────────

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  entity_type TEXT NOT NULL,             -- 'contract' / 'profile' / 'payment' / ...
  entity_id UUID,
  diff JSONB,                            -- before/after fuer Updates
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- AUTH-SIGNUP TRIGGER (KRITISCH!)
-- Legt automatisch profiles + role-spezifisches Profil an
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role user_role;
BEGIN
  -- Rolle aus raw_user_meta_data lesen, default 'customer'
  v_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::user_role,
    'customer'
  );

  -- Basis-Profil
  INSERT INTO profiles (id, email, role, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    v_role,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );

  -- Rollen-spezifisches Profil
  IF v_role = 'customer' THEN
    INSERT INTO customer_profiles (user_id) VALUES (NEW.id);
  ELSIF v_role = 'trainer' THEN
    INSERT INTO trainer_profiles (user_id) VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────

CREATE INDEX idx_trainer_profiles_city ON trainer_profiles(city);
CREATE INDEX idx_trainer_profiles_categories ON trainer_profiles USING GIN(categories);
CREATE INDEX idx_trainer_profiles_rating ON trainer_profiles(rating_average DESC);
CREATE INDEX idx_trainer_profiles_active ON trainer_profiles(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_bookings_trainer ON bookings(trainer_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_contracts_trainer ON contracts(trainer_id);
CREATE INDEX idx_contracts_customer ON contracts(customer_id);
CREATE INDEX idx_messages_thread ON messages(thread_id, created_at DESC);
CREATE INDEX idx_chat_threads_participants ON chat_threads(trainer_id, customer_id);
CREATE INDEX idx_workout_plans_customer ON workout_plans(customer_id);
CREATE INDEX idx_nutrition_plans_customer ON nutrition_plans(customer_id);
CREATE INDEX idx_progress_metrics_customer ON progress_metrics(customer_id, recorded_at DESC);
CREATE INDEX idx_reviews_trainer ON reviews(trainer_id);
CREATE INDEX idx_workout_logs_customer_date ON workout_logs(customer_id, recorded_at DESC);
CREATE INDEX idx_meal_logs_customer_date ON meal_logs(customer_id, recorded_at DESC);
CREATE INDEX idx_availability_trainer ON trainer_availability(trainer_id);
CREATE INDEX idx_availability_date ON trainer_availability(date) WHERE date IS NOT NULL;
CREATE INDEX idx_leads_trainer_status ON leads(trainer_id, status);
CREATE INDEX idx_leads_customer ON leads(customer_id);
CREATE INDEX idx_certificates_trainer ON trainer_certificates(trainer_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_coach_sub_trainer ON coach_subscriptions(trainer_id);
CREATE INDEX idx_audit_user_date ON audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_category_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trainer profiles: public read, owner update
CREATE POLICY "Trainer profiles are viewable by everyone" ON trainer_profiles FOR SELECT USING (true);
CREATE POLICY "Trainers can update own profile" ON trainer_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Trainers can insert own profile" ON trainer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trainer packages: public read, owner manage
CREATE POLICY "Packages are viewable by everyone" ON trainer_packages FOR SELECT USING (true);
CREATE POLICY "Trainers can manage own packages" ON trainer_packages FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Customer profiles: own only (privacy)
CREATE POLICY "Customers can view own profile" ON customer_profiles FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Customers can update own profile" ON customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Customers can insert own profile" ON customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
-- Trainers can see their clients
CREATE POLICY "Trainers can see their clients" ON customer_profiles FOR SELECT
  USING (
    id IN (
      SELECT customer_id FROM contracts
      WHERE trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
      AND status = 'active'
    )
  );

-- Bookings: participants can see their bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
  );
CREATE POLICY "Customers can create bookings" ON bookings FOR INSERT
  WITH CHECK (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
-- Trainer kann Buchungen bestaetigen / absagen / abschliessen
CREATE POLICY "Trainers can update their bookings" ON bookings FOR UPDATE
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));
-- Customer kann eigene Buchung stornieren
CREATE POLICY "Customers can update own bookings" ON bookings FOR UPDATE
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));

-- Contracts: participants only
CREATE POLICY "Users can view own contracts" ON contracts FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
  );

-- Chat: participants only
CREATE POLICY "Users can view own threads" ON chat_threads FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view messages in their threads" ON messages FOR SELECT
  USING (
    thread_id IN (
      SELECT id FROM chat_threads WHERE
        customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
        OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
    )
  );
CREATE POLICY "Users can send messages in their threads" ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND thread_id IN (
      SELECT id FROM chat_threads WHERE
        customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
        OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
    )
  );

-- Workout/Nutrition plans: participants only
CREATE POLICY "Users can view own plans" ON workout_plans FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
  );
CREATE POLICY "Trainers can manage plans" ON workout_plans FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own nutrition plans" ON nutrition_plans FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
  );
CREATE POLICY "Trainers can manage nutrition plans" ON nutrition_plans FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Progress: customer own + their trainer
CREATE POLICY "Customers can manage own progress" ON progress_metrics FOR ALL
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Trainers can view client progress" ON progress_metrics FOR SELECT
  USING (
    customer_id IN (
      SELECT customer_id FROM contracts
      WHERE trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
      AND status = 'active'
    )
  );

CREATE POLICY "Customers can manage own photos" ON progress_photos FOR ALL
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));

-- Reviews: public read, customer create
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT
  WITH CHECK (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));

-- Payments: participants only
CREATE POLICY "Users can view own payments" ON payments FOR SELECT
  USING (
    contract_id IN (
      SELECT id FROM contracts WHERE
        customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
        OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
    )
  );

-- Workout-Logs: Kunde self + verbundener Coach
CREATE POLICY "Customers manage own workout logs" ON workout_logs FOR ALL
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Trainers can view client workout logs" ON workout_logs FOR SELECT
  USING (
    customer_id IN (
      SELECT customer_id FROM contracts
      WHERE trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
      AND status = 'active'
    )
  );

-- Meal-Logs: identisch
CREATE POLICY "Customers manage own meal logs" ON meal_logs FOR ALL
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Trainers can view client meal logs" ON meal_logs FOR SELECT
  USING (
    customer_id IN (
      SELECT customer_id FROM contracts
      WHERE trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
      AND status = 'active'
    )
  );

-- Availability: public-read (fuer Booking-UI), Owner schreibt
CREATE POLICY "Availability public read" ON trainer_availability FOR SELECT USING (true);
CREATE POLICY "Trainer manages own availability" ON trainer_availability FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Leads: Trainer sieht eigene, Customer sieht eigene
CREATE POLICY "Trainer sees own leads" ON leads FOR SELECT
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Customer sees own leads" ON leads FOR SELECT
  USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Customer creates lead" ON leads FOR INSERT
  WITH CHECK (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Trainer updates lead status" ON leads FOR UPDATE
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Certificates: public read, Trainer manages
CREATE POLICY "Certificates public read" ON trainer_certificates FOR SELECT USING (true);
CREATE POLICY "Trainer manages own certificates" ON trainer_certificates FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Categories: public read, nur Admin schreibt (default-deny)
CREATE POLICY "Categories public read" ON categories FOR SELECT USING (true);

-- Category-Links: public read, Trainer pflegt eigene
CREATE POLICY "Category links public read" ON trainer_category_links FOR SELECT USING (true);
CREATE POLICY "Trainer manages own category links" ON trainer_category_links FOR ALL
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Notifications: nur Empfaenger
CREATE POLICY "Users see own notifications" ON notifications FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "Users mark own notifications read" ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Coach-Subscriptions: nur Owner
CREATE POLICY "Trainer sees own subscription" ON coach_subscriptions FOR SELECT
  USING (trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid()));

-- Audit-Log: nur self - SELECT, INSERT/UPDATE nur via Service-Role
CREATE POLICY "Users see own audit entries" ON audit_log FOR SELECT
  USING (user_id = auth.uid());

-- ─────────────────────────────────────────────
-- AUTO-UPDATE updated_at
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_trainer_profiles_updated_at BEFORE UPDATE ON trainer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_customer_profiles_updated_at BEFORE UPDATE ON customer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_workout_plans_updated_at BEFORE UPDATE ON workout_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_nutrition_plans_updated_at BEFORE UPDATE ON nutrition_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_meal_logs_updated_at BEFORE UPDATE ON meal_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_coach_subs_updated_at BEFORE UPDATE ON coach_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────
-- REALTIME SUBSCRIPTIONS
-- ─────────────────────────────────────────────
-- Run in Supabase Dashboard → SQL Editor:
-- ALTER PUBLICATION supabase_realtime ADD TABLE messages;
-- ALTER PUBLICATION supabase_realtime ADD TABLE chat_threads;
-- ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
-- ALTER PUBLICATION supabase_realtime ADD TABLE leads;

-- ─────────────────────────────────────────────
-- SEED: Default-Kategorien
-- ─────────────────────────────────────────────
INSERT INTO categories (slug, name, icon, sort_order) VALUES
  ('krafttraining',   'Krafttraining',     'Dumbbell',  1),
  ('functional',      'Functional',        'Activity',  2),
  ('hiit',            'HIIT',              'Zap',       3),
  ('yoga',            'Yoga',              'Flower',    4),
  ('mobility',        'Mobility',          'Move',      5),
  ('ausdauer',        'Ausdauer',          'Heart',     6),
  ('kampfsport',      'Kampfsport',        'Sword',     7),
  ('ernaehrung',      'Ernaehrungsberatung','Apple',    8),
  ('rehabilitation',  'Rehabilitation',    'Stethoscope', 9),
  ('schwangerschaft', 'Schwangerschaft',   'Baby',      10)
ON CONFLICT (slug) DO NOTHING;
