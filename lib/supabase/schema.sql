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
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL, -- Client#XXXX
  is_anonymous BOOLEAN DEFAULT TRUE,
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

-- ─────────────────────────────────────────────
-- REALTIME SUBSCRIPTIONS (enable for chat)
-- ─────────────────────────────────────────────
-- Run in Supabase Dashboard → SQL Editor:
-- ALTER PUBLICATION supabase_realtime ADD TABLE messages;
-- ALTER PUBLICATION supabase_realtime ADD TABLE chat_threads;
