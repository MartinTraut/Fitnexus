// User roles
export type UserRole = 'customer' | 'trainer' | 'admin'

// User
export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

// Trainer Profile
export interface TrainerProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  bio: string
  categories: string[]
  city: string
  latitude: number | null
  longitude: number | null
  radius_km: number
  hourly_rate: number
  packages: TrainerPackage[]
  intro_video_url: string | null
  profile_image_url: string | null
  gallery_urls: string[]
  rating_average: number
  rating_count: number
  is_verified: boolean
  is_active: boolean
  subscription_tier: 'starter' | 'pro'
  created_at: string
  updated_at: string
}

export interface TrainerPackage {
  id: string
  name: string
  description: string
  sessions: number
  price: number
  duration_weeks: number
}

// Customer Profile
export interface CustomerProfile {
  id: string
  user_id: string
  display_name: string  // Client#XXXX
  is_anonymous: boolean
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  fitness_goals: string[]
  created_at: string
  updated_at: string
}

// Booking
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  trainer_id: string
  customer_id: string
  status: BookingStatus
  scheduled_at: string
  duration_minutes: number
  notes: string | null
  meeting_url: string | null
  created_at: string
  updated_at: string
}

// Contract
export type ContractStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'

export interface Contract {
  id: string
  trainer_id: string
  customer_id: string
  package_id: string | null
  start_date: string
  end_date: string | null
  status: ContractStatus
  monthly_rate: number
  platform_fee_percent: number
  sessions_total: number
  sessions_used: number
  created_at: string
  updated_at: string
}

// Chat
export interface ChatThread {
  id: string
  trainer_id: string
  customer_id: string
  last_message_at: string | null
  created_at: string
}

export interface Message {
  id: string
  thread_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'system'
  is_read: boolean
  created_at: string
}

// Workout Plan
export interface WorkoutPlan {
  id: string
  trainer_id: string
  customer_id: string
  title: string
  week_number: number
  exercises: WorkoutExercise[]
  notes: string | null
  created_at: string
  updated_at: string
}

export interface WorkoutExercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string | null
  rest_seconds: number
  notes: string | null
  order: number
  day: number
  superset_group: string | null
}

// Nutrition Plan
export interface NutritionPlan {
  id: string
  trainer_id: string
  customer_id: string
  title: string
  calories_target: number
  protein_g: number
  carbs_g: number
  fat_g: number
  meals: NutritionMeal[]
  notes: string | null
  created_at: string
  updated_at: string
}

export interface NutritionMeal {
  id: string
  name: string
  time: string
  foods: NutritionFood[]
}

export interface NutritionFood {
  name: string
  amount: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

// Progress Metrics
export interface ProgressMetric {
  id: string
  customer_id: string
  weight_kg: number | null
  body_fat_percent: number | null
  muscle_mass_kg: number | null
  notes: string | null
  recorded_at: string
  created_at: string
}

// Progress Photos
export interface ProgressPhoto {
  id: string
  customer_id: string
  image_url: string
  category: 'front' | 'side' | 'back' | 'other'
  recorded_at: string
  created_at: string
}

// Review
export interface Review {
  id: string
  trainer_id: string
  customer_id: string
  booking_id: string | null
  rating_total: number
  punctuality: number
  motivation: number
  knowledge: number
  sympathy: number
  cleanliness: number
  text: string | null
  is_visible: boolean
  created_at: string
}

// Payment
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded'

export interface Payment {
  id: string
  contract_id: string
  stripe_payment_id: string | null
  amount_cents: number
  currency: string
  status: PaymentStatus
  description: string | null
  created_at: string
}

// Search / Filter
export interface TrainerSearchFilters {
  query?: string
  city?: string
  categories?: string[]
  min_price?: number
  max_price?: number
  min_rating?: number
  radius_km?: number
  sort_by?: 'rating' | 'price_asc' | 'price_desc' | 'distance' | 'newest'
}

// Categories
export const TRAINER_CATEGORIES = [
  'Personal Training',
  'Yoga',
  'Pilates',
  'Krafttraining',
  'Ausdauer',
  'CrossFit',
  'Boxen',
  'Kampfsport',
  'Schwimmen',
  'Ernährungsberatung',
  'Rehabilitation',
  'Mobility',
  'HIIT',
  'Bodybuilding',
  'Calisthenics',
  'Outdoor Training',
  'Gruppentraining',
  'Online Coaching',
] as const

export type TrainerCategory = typeof TRAINER_CATEGORIES[number]

// German Cities
export const GERMAN_CITIES = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt',
  'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
  'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Mannheim', 'Karlsruhe', 'Augsburg', 'Wiesbaden', 'Freiburg',
] as const
