import type { TrainerProfile, Review, Booking, WorkoutPlan, NutritionPlan } from '@/types'

// ─── Mock Trainers ────────────────────────────────────────
export interface TrainerCertificate {
  name: string
  issuer: string
  year: string
  verified: boolean
}

export const mockTrainers: (TrainerProfile & { slug: string; display_name: string; specialties: string[]; languages: string[]; coaching_modes: string[]; response_time_hours: number; free_spots: number; member_since: string; total_clients: number; certificates: TrainerCertificate[] })[] = [
  {
    id: 'tr_1',
    slug: 'max-mueller',
    user_id: 'u_1',
    first_name: 'Max',
    last_name: 'Müller',
    display_name: 'Max Müller',
    bio: 'Zertifizierter Personal Trainer mit 8 Jahren Erfahrung im Kraft- und Ausdauertraining. Ich helfe dir, dein volles Potenzial zu entfalten – egal ob Muskelaufbau, Fettabbau oder allgemeine Fitness.',
    categories: ['Personal Training', 'Krafttraining', 'HIIT'],
    specialties: ['Muskelaufbau', 'Fettabbau', 'Functional Training'],
    city: 'Berlin',
    latitude: 52.52,
    longitude: 13.405,
    radius_km: 15,
    hourly_rate: 75,
    packages: [
      { id: 'pkg_1a', name: 'Starter', description: '4 Sessions pro Monat', sessions: 4, price: 260, duration_weeks: 4 },
      { id: 'pkg_1b', name: 'Transformation', description: '12 Sessions in 8 Wochen + Ernährungsplan', sessions: 12, price: 720, duration_weeks: 8 },
      { id: 'pkg_1c', name: 'Premium', description: 'Unbegrenzt Sessions + Full Support', sessions: 20, price: 1200, duration_weeks: 8 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.9,
    rating_count: 47,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch', 'Englisch'],
    coaching_modes: ['Vor Ort', 'Online', 'Hybrid'],
    response_time_hours: 2,
    free_spots: 3,
    member_since: '2024-03',
    total_clients: 89,
    certificates: [
      { name: 'A-Lizenz Fitnesstrainer', issuer: 'Deutsche Sporthochschule Köln', year: '2019', verified: true },
      { name: 'Ernährungsberater B-Lizenz', issuer: 'IST-Studieninstitut', year: '2020', verified: true },
    ],
    created_at: '2024-03-15T10:00:00Z',
    updated_at: '2026-04-01T10:00:00Z',
  },
  {
    id: 'tr_2',
    slug: 'sarah-schmidt',
    user_id: 'u_2',
    first_name: 'Sarah',
    last_name: 'Schmidt',
    display_name: 'Sarah Schmidt',
    bio: 'Yoga-Lehrerin und Ernährungsberaterin mit Fokus auf ganzheitliches Wohlbefinden. Mein Ansatz verbindet Bewegung, Ernährung und Achtsamkeit zu einem nachhaltigen Lifestyle.',
    categories: ['Yoga', 'Ernährungsberatung', 'Pilates'],
    specialties: ['Hatha Yoga', 'Vinyasa Flow', 'Meal Prep Coaching'],
    city: 'München',
    latitude: 48.1351,
    longitude: 11.582,
    radius_km: 20,
    hourly_rate: 65,
    packages: [
      { id: 'pkg_2a', name: 'Yoga Basics', description: '8 Sessions Yoga-Einführung', sessions: 8, price: 440, duration_weeks: 4 },
      { id: 'pkg_2b', name: 'Ganzheitlich Fit', description: 'Yoga + Ernährungsberatung', sessions: 12, price: 680, duration_weeks: 8 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.8,
    rating_count: 63,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch', 'Englisch', 'Französisch'],
    coaching_modes: ['Vor Ort', 'Online'],
    response_time_hours: 1,
    free_spots: 5,
    member_since: '2024-01',
    total_clients: 124,
    certificates: [
      { name: 'Yoga Alliance RYT-500', issuer: 'Yoga Alliance', year: '2018', verified: true },
      { name: 'Ernährungsberaterin IHK', issuer: 'IHK München', year: '2021', verified: true },
    ],
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2026-04-02T10:00:00Z',
  },
  {
    id: 'tr_3',
    slug: 'leon-weber',
    user_id: 'u_3',
    first_name: 'Leon',
    last_name: 'Weber',
    display_name: 'Leon Weber',
    bio: 'CrossFit Level 2 Trainer und ehemaliger Leistungssportler. Ich bringe dich an deine Grenzen – und darüber hinaus. Spezialisiert auf funktionelles Training und Wettkampfvorbereitung.',
    categories: ['CrossFit', 'Krafttraining', 'Outdoor Training'],
    specialties: ['Wettkampfvorbereitung', 'Olympic Lifting', 'Conditioning'],
    city: 'Hamburg',
    latitude: 53.5511,
    longitude: 9.9937,
    radius_km: 10,
    hourly_rate: 85,
    packages: [
      { id: 'pkg_3a', name: 'Competition Prep', description: 'Intensive 12-Wochen Vorbereitung', sessions: 24, price: 1680, duration_weeks: 12 },
      { id: 'pkg_3b', name: 'Foundations', description: 'CrossFit Grundlagen', sessions: 8, price: 560, duration_weeks: 4 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.7,
    rating_count: 35,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch', 'Englisch'],
    coaching_modes: ['Vor Ort', 'Hybrid'],
    response_time_hours: 3,
    free_spots: 2,
    member_since: '2024-06',
    total_clients: 56,
    certificates: [
      { name: 'CrossFit Level 2 Trainer', issuer: 'CrossFit Inc.', year: '2021', verified: true },
      { name: 'Olympic Weightlifting Coach', issuer: 'BVDG', year: '2022', verified: true },
    ],
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2026-03-28T10:00:00Z',
  },
  {
    id: 'tr_4',
    slug: 'anna-klein',
    user_id: 'u_4',
    first_name: 'Anna',
    last_name: 'Klein',
    display_name: 'Anna Klein',
    bio: 'Online Fitness Coach für Frauen. Ich zeige dir, wie du mit minimalem Equipment maximale Ergebnisse erzielst. Spezialisiert auf Home Workouts, Bodyweight Training und nachhaltige Ernährungsumstellung.',
    categories: ['Online Coaching', 'HIIT', 'Ernährungsberatung'],
    specialties: ['Home Workouts', 'Bodyweight Training', 'Frauen-Fitness'],
    city: 'Köln',
    latitude: 50.9375,
    longitude: 6.9603,
    radius_km: 50,
    hourly_rate: 55,
    packages: [
      { id: 'pkg_4a', name: 'Online Starter', description: '4 Wochen Online-Coaching', sessions: 8, price: 320, duration_weeks: 4 },
      { id: 'pkg_4b', name: 'Transformation Online', description: '12 Wochen + Ernährung + Check-ins', sessions: 24, price: 840, duration_weeks: 12 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.9,
    rating_count: 91,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch'],
    coaching_modes: ['Online'],
    response_time_hours: 1,
    free_spots: 8,
    member_since: '2023-11',
    total_clients: 203,
    certificates: [
      { name: 'Personal Trainerin B-Lizenz', issuer: 'BSA Akademie', year: '2020', verified: true },
    ],
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2026-04-05T10:00:00Z',
  },
  {
    id: 'tr_5',
    slug: 'david-braun',
    user_id: 'u_5',
    first_name: 'David',
    last_name: 'Braun',
    display_name: 'David Braun',
    bio: 'Bodybuilding Coach und Wettkampfathlet. 15+ Jahre Erfahrung in Hypertrophie-Training, Periodisierung und Contest Prep. Wissenschaftlich fundiert, individuell angepasst.',
    categories: ['Bodybuilding', 'Krafttraining', 'Ernährungsberatung'],
    specialties: ['Hypertrophie', 'Contest Prep', 'Periodisierung'],
    city: 'Frankfurt',
    latitude: 50.1109,
    longitude: 8.6821,
    radius_km: 25,
    hourly_rate: 90,
    packages: [
      { id: 'pkg_5a', name: 'Coaching Monat', description: 'Monatliches 1:1 Coaching', sessions: 8, price: 600, duration_weeks: 4 },
      { id: 'pkg_5b', name: 'Contest Prep', description: 'Wettkampfvorbereitung 16 Wochen', sessions: 32, price: 2400, duration_weeks: 16 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.6,
    rating_count: 28,
    is_verified: false,
    is_active: true,
    subscription_tier: 'starter',
    languages: ['Deutsch', 'Englisch'],
    coaching_modes: ['Vor Ort', 'Online'],
    response_time_hours: 4,
    free_spots: 4,
    member_since: '2025-02',
    total_clients: 34,
    certificates: [
      { name: 'Bodybuilding Coach Zertifikat', issuer: 'DBFV', year: '2023', verified: false },
    ],
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2026-04-03T10:00:00Z',
  },
  {
    id: 'tr_6',
    slug: 'lena-fischer',
    user_id: 'u_6',
    first_name: 'Lena',
    last_name: 'Fischer',
    display_name: 'Lena Fischer',
    bio: 'Mobility- und Rehabilitations-Spezialistin. Ich helfe Menschen nach Verletzungen zurück in Bewegung und optimiere die Beweglichkeit von Athleten und Büroarbeitern gleichermaßen.',
    categories: ['Mobility', 'Rehabilitation', 'Pilates'],
    specialties: ['Schmerztherapie', 'Beweglichkeit', 'Haltungskorrektur'],
    city: 'Stuttgart',
    latitude: 48.7758,
    longitude: 9.1829,
    radius_km: 15,
    hourly_rate: 70,
    packages: [
      { id: 'pkg_6a', name: 'Mobility Check', description: 'Analyse + 4 Sessions', sessions: 4, price: 280, duration_weeks: 4 },
      { id: 'pkg_6b', name: 'Reha Programm', description: '12 Wochen Rehabilitations-Programm', sessions: 24, price: 1440, duration_weeks: 12 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.8,
    rating_count: 42,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch', 'Englisch', 'Spanisch'],
    coaching_modes: ['Vor Ort', 'Online', 'Hybrid'],
    response_time_hours: 2,
    free_spots: 6,
    member_since: '2024-08',
    total_clients: 67,
    certificates: [
      { name: 'Physiotherapeutin', issuer: 'Hochschule Fresenius', year: '2017', verified: true },
      { name: 'Mobility Specialist', issuer: 'FMS', year: '2021', verified: true },
      { name: 'Pilates Instructor', issuer: 'Polestar Pilates', year: '2019', verified: true },
    ],
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2026-04-04T10:00:00Z',
  },
  {
    id: 'tr_7',
    slug: 'tom-hartmann',
    user_id: 'u_7',
    first_name: 'Tom',
    last_name: 'Hartmann',
    display_name: 'Tom Hartmann',
    bio: 'Kampfsport-Trainer mit Schwarzgurt in Jiu-Jitsu und Muay Thai. Ich unterrichte Selbstverteidigung, Fitness-Boxen und Wettkampf-Coaching für alle Level.',
    categories: ['Kampfsport', 'Boxen', 'HIIT'],
    specialties: ['Muay Thai', 'Brazilian Jiu-Jitsu', 'Fitness-Boxen'],
    city: 'Berlin',
    latitude: 52.52,
    longitude: 13.405,
    radius_km: 12,
    hourly_rate: 80,
    packages: [
      { id: 'pkg_7a', name: 'Fight Ready', description: '8 Sessions Kampfsport', sessions: 8, price: 520, duration_weeks: 4 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.7,
    rating_count: 31,
    is_verified: true,
    is_active: true,
    subscription_tier: 'starter',
    languages: ['Deutsch', 'Englisch'],
    coaching_modes: ['Vor Ort'],
    response_time_hours: 5,
    free_spots: 1,
    member_since: '2025-01',
    total_clients: 41,
    certificates: [
      { name: 'Muay Thai Kru Level 3', issuer: 'WMF', year: '2020', verified: true },
    ],
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2026-04-01T10:00:00Z',
  },
  {
    id: 'tr_8',
    slug: 'nina-bauer',
    user_id: 'u_8',
    first_name: 'Nina',
    last_name: 'Bauer',
    display_name: 'Nina Bauer',
    bio: 'Calisthenics-Coach und Influencerin. Ich zeige dir, wie du mit deinem eigenen Körpergewicht unglaubliche Kraft und Kontrolle aufbaust. Von Anfänger bis Muscle-Up.',
    categories: ['Calisthenics', 'Outdoor Training', 'Online Coaching'],
    specialties: ['Bodyweight Skills', 'Muscle-Up Coaching', 'Handstand Training'],
    city: 'Leipzig',
    latitude: 51.3397,
    longitude: 12.3731,
    radius_km: 30,
    hourly_rate: 60,
    packages: [
      { id: 'pkg_8a', name: 'Cali Starter', description: 'Grundlagen Bodyweight', sessions: 8, price: 380, duration_weeks: 4 },
      { id: 'pkg_8b', name: 'Skill Mastery', description: 'Advanced Skills Training', sessions: 16, price: 720, duration_weeks: 8 },
    ],
    intro_video_url: null,
    profile_image_url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&crop=face',
    gallery_urls: [],
    rating_average: 4.9,
    rating_count: 55,
    is_verified: true,
    is_active: true,
    subscription_tier: 'pro',
    languages: ['Deutsch', 'Englisch'],
    coaching_modes: ['Vor Ort', 'Online', 'Hybrid'],
    response_time_hours: 1,
    free_spots: 4,
    member_since: '2024-05',
    total_clients: 98,
    certificates: [
      { name: 'Calisthenics Coach Level 2', issuer: 'School of Calisthenics', year: '2022', verified: true },
      { name: 'Personal Trainerin A-Lizenz', issuer: 'DFAV', year: '2021', verified: true },
    ],
    created_at: '2024-05-01T10:00:00Z',
    updated_at: '2026-04-06T10:00:00Z',
  },
]

// ─── Mock Reviews ─────────────────────────────────────────
export const mockReviews: (Review & { customer_display_name: string })[] = [
  {
    id: 'rev_1', trainer_id: 'tr_1', customer_id: 'c_1', booking_id: 'b_1',
    rating_total: 5, punctuality: 5, motivation: 5, knowledge: 5, sympathy: 5, cleanliness: 5,
    text: 'Max ist ein absoluter Profi. In 8 Wochen habe ich mehr Fortschritt gemacht als in 2 Jahren alleine. Sehr empfehlenswert!',
    is_visible: true, created_at: '2026-03-15T10:00:00Z', customer_display_name: 'Client#4821',
  },
  {
    id: 'rev_2', trainer_id: 'tr_1', customer_id: 'c_2', booking_id: 'b_2',
    rating_total: 5, punctuality: 5, motivation: 5, knowledge: 4, sympathy: 5, cleanliness: 5,
    text: 'Super motivierend und immer pünktlich. Die Trainingsplanung ist top durchdacht.',
    is_visible: true, created_at: '2026-02-20T10:00:00Z', customer_display_name: 'Client#7193',
  },
  {
    id: 'rev_3', trainer_id: 'tr_2', customer_id: 'c_3', booking_id: 'b_3',
    rating_total: 5, punctuality: 5, motivation: 5, knowledge: 5, sympathy: 5, cleanliness: 5,
    text: 'Sarah hat mir geholfen, Yoga in meinen stressigen Alltag zu integrieren. Die Ernährungsberatung war ein Game-Changer.',
    is_visible: true, created_at: '2026-03-01T10:00:00Z', customer_display_name: 'Client#2547',
  },
  {
    id: 'rev_4', trainer_id: 'tr_4', customer_id: 'c_4', booking_id: 'b_4',
    rating_total: 5, punctuality: 5, motivation: 5, knowledge: 5, sympathy: 5, cleanliness: 5,
    text: 'Annas Online-Coaching ist mega. Trotz Distanz fühlt es sich persönlich an. Die Check-ins halten mich auf Kurs.',
    is_visible: true, created_at: '2026-03-10T10:00:00Z', customer_display_name: 'Client#8362',
  },
  {
    id: 'rev_5', trainer_id: 'tr_3', customer_id: 'c_5', booking_id: 'b_5',
    rating_total: 4, punctuality: 4, motivation: 5, knowledge: 5, sympathy: 4, cleanliness: 4,
    text: 'Leon fordert dich wirklich heraus. Nichts für schwache Nerven, aber die Ergebnisse sprechen für sich.',
    is_visible: true, created_at: '2026-01-28T10:00:00Z', customer_display_name: 'Client#5091',
  },
]

// ─── Mock Bookings ────────────────────────────────────────
export const mockBookings: Booking[] = [
  // c_demo bookings (Kunde)
  {
    id: 'bk_1', trainer_id: 'tr_1', customer_id: 'c_demo', status: 'confirmed',
    scheduled_at: '2026-04-14T10:00:00Z', duration_minutes: 60,
    notes: 'Oberkörper-Training – Fokus Brust & Trizeps', meeting_url: null,
    created_at: '2026-04-05T10:00:00Z', updated_at: '2026-04-06T10:00:00Z',
  },
  {
    id: 'bk_2', trainer_id: 'tr_1', customer_id: 'c_demo', status: 'confirmed',
    scheduled_at: '2026-04-16T10:00:00Z', duration_minutes: 60,
    notes: 'Bein-Tag – Kniebeugen & Beinpresse', meeting_url: null,
    created_at: '2026-04-06T10:00:00Z', updated_at: '2026-04-06T10:00:00Z',
  },
  {
    id: 'bk_3', trainer_id: 'tr_1', customer_id: 'c_demo', status: 'completed',
    scheduled_at: '2026-04-10T10:00:00Z', duration_minutes: 60,
    notes: 'Rücken & Bizeps', meeting_url: null,
    created_at: '2026-04-03T10:00:00Z', updated_at: '2026-04-10T11:00:00Z',
  },
  {
    id: 'bk_4', trainer_id: 'tr_1', customer_id: 'c_demo', status: 'completed',
    scheduled_at: '2026-04-07T15:00:00Z', duration_minutes: 60,
    notes: 'Oberkörper – Push Day', meeting_url: null,
    created_at: '2026-04-01T10:00:00Z', updated_at: '2026-04-07T16:00:00Z',
  },
  {
    id: 'bk_5', trainer_id: 'tr_1', customer_id: 'c_demo', status: 'completed',
    scheduled_at: '2026-04-03T10:00:00Z', duration_minutes: 60,
    notes: 'Erstgespräch & Körperanalyse', meeting_url: null,
    created_at: '2026-03-28T10:00:00Z', updated_at: '2026-04-03T11:00:00Z',
  },
  {
    id: 'bk_6', trainer_id: 'tr_2', customer_id: 'c_demo', status: 'pending',
    scheduled_at: '2026-04-18T14:00:00Z', duration_minutes: 45,
    notes: 'Yoga Probestunde', meeting_url: null,
    created_at: '2026-04-09T10:00:00Z', updated_at: '2026-04-09T10:00:00Z',
  },
  {
    id: 'bk_7', trainer_id: 'tr_4', customer_id: 'c_demo', status: 'completed',
    scheduled_at: '2026-04-01T16:00:00Z', duration_minutes: 30,
    notes: 'Online Kennenlernen', meeting_url: 'https://meet.google.com/abc',
    created_at: '2026-03-28T10:00:00Z', updated_at: '2026-04-01T17:00:00Z',
  },
  // Other customer bookings (for trainer dashboard)
  {
    id: 'bk_8', trainer_id: 'tr_1', customer_id: 'c_2', status: 'pending',
    scheduled_at: '2026-04-15T09:00:00Z', duration_minutes: 60,
    notes: 'Erstgespräch – Abnehmen & Fitness', meeting_url: null,
    created_at: '2026-04-10T08:00:00Z', updated_at: '2026-04-10T08:00:00Z',
  },
  {
    id: 'bk_9', trainer_id: 'tr_1', customer_id: 'c_3', status: 'pending',
    scheduled_at: '2026-04-17T11:00:00Z', duration_minutes: 45,
    notes: 'Probetraining – Kraftaufbau', meeting_url: null,
    created_at: '2026-04-11T09:00:00Z', updated_at: '2026-04-11T09:00:00Z',
  },
  {
    id: 'bk_10', trainer_id: 'tr_1', customer_id: 'c_4', status: 'confirmed',
    scheduled_at: '2026-04-15T16:00:00Z', duration_minutes: 60,
    notes: 'Wöchentliches Coaching – Woche 8', meeting_url: null,
    created_at: '2026-04-08T10:00:00Z', updated_at: '2026-04-09T10:00:00Z',
  },
  {
    id: 'bk_11', trainer_id: 'tr_1', customer_id: 'c_5', status: 'confirmed',
    scheduled_at: '2026-04-13T14:00:00Z', duration_minutes: 60,
    notes: 'Ernährungsberatung & Check-in', meeting_url: null,
    created_at: '2026-04-07T10:00:00Z', updated_at: '2026-04-08T10:00:00Z',
  },
  {
    id: 'bk_12', trainer_id: 'tr_1', customer_id: 'c_6', status: 'completed',
    scheduled_at: '2026-04-09T10:00:00Z', duration_minutes: 60,
    notes: 'Mobility & Recovery Session', meeting_url: null,
    created_at: '2026-04-02T10:00:00Z', updated_at: '2026-04-09T11:00:00Z',
  },
]

// ─── Helper Functions ─────────────────────────────────────
export function getTrainerBySlug(slug: string) {
  return mockTrainers.find(t => t.slug === slug) ?? null
}

export function getTrainerById(id: string) {
  return mockTrainers.find(t => t.id === id) ?? null
}

export function getTrainersByCity(city: string) {
  return mockTrainers.filter(t => t.city.toLowerCase() === city.toLowerCase())
}

export function getTrainersByCategory(category: string) {
  const normalized = category.toLowerCase().replace(/-/g, ' ')
  return mockTrainers.filter(t =>
    t.categories.some(c => c.toLowerCase() === normalized)
  )
}

export function getReviewsForTrainer(trainerId: string) {
  return mockReviews.filter(r => r.trainer_id === trainerId)
}

export function searchTrainers(filters: {
  query?: string
  city?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  mode?: string
  sortBy?: string
}) {
  let results = [...mockTrainers]

  if (filters.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(t =>
      t.display_name.toLowerCase().includes(q) ||
      t.bio.toLowerCase().includes(q) ||
      t.categories.some(c => c.toLowerCase().includes(q)) ||
      t.city.toLowerCase().includes(q)
    )
  }
  if (filters.city) {
    results = results.filter(t => t.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters.category) {
    const cat = filters.category.toLowerCase()
    results = results.filter(t => t.categories.some(c => c.toLowerCase() === cat))
  }
  if (filters.minPrice !== undefined) {
    results = results.filter(t => t.hourly_rate >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter(t => t.hourly_rate <= filters.maxPrice!)
  }
  if (filters.minRating !== undefined) {
    results = results.filter(t => t.rating_average >= filters.minRating!)
  }
  if (filters.mode) {
    results = results.filter(t => t.coaching_modes.some(m => m.toLowerCase() === filters.mode!.toLowerCase()))
  }

  // Sort
  switch (filters.sortBy) {
    case 'rating':
      results.sort((a, b) => b.rating_average - a.rating_average)
      break
    case 'price_asc':
      results.sort((a, b) => a.hourly_rate - b.hourly_rate)
      break
    case 'price_desc':
      results.sort((a, b) => b.hourly_rate - a.hourly_rate)
      break
    case 'newest':
      results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
    default:
      // Default: by rating + verified first
      results.sort((a, b) => {
        if (a.is_verified !== b.is_verified) return a.is_verified ? -1 : 1
        return b.rating_average - a.rating_average
      })
  }

  return results
}

// ─── Stats for Landing Page ───────────────────────────────
export const platformStats = {
  trainers: '500+',
  activeUsers: '10.000+',
  cities: '50+',
  averageRating: '4.8',
}

// ─── Pricing Plans ────────────────────────────────────────
export const pricingPlans = [
  {
    name: 'Kunde',
    price: 'Kostenlos',
    period: '',
    description: 'Finde deinen perfekten Coach',
    features: [
      'Coach-Suche & Filter',
      'Profilansichten ohne Limit',
      'Erstgespräch buchen',
      'Bewertungen lesen & schreiben',
      'Fortschrittstracking',
    ],
    highlighted: false,
    ctaVariant: 'cyan' as const,
    ctaText: 'Jetzt starten',
  },
  {
    name: 'Starter',
    price: '49€',
    period: '/Monat',
    description: 'Fur ambitionierte Trainer',
    features: [
      'Eigenes Trainer-Profil',
      'Bis zu 15 aktive Kunden',
      'Trainingsplan-Builder',
      'Basis-Ernährungspläne',
      'In-App Chat',
      'Terminverwaltung',
    ],
    highlighted: false,
    ctaVariant: 'cyan' as const,
    ctaText: 'Starter wählen',
  },
  {
    name: 'Pro',
    price: '99€',
    period: '/Monat',
    description: 'Fur professionelle Coaches',
    features: [
      'Alles aus Starter',
      'Unbegrenzte Kunden',
      'Erweiterte Trainingspläne',
      'Detaillierte Ernährungspläne',
      'Analytics & Reports',
      'Prioritäts-Support',
      'Top-Ranking Boost',
      'Verifizierungs-Badge',
    ],
    highlighted: true,
    ctaVariant: 'brand' as const,
    ctaText: 'Pro wählen',
  },
]

// ─── FAQ Items ────────────────────────────────────────────
export const faqItems = [
  {
    question: 'Ist FITNEXUS wirklich kostenlos für Kunden?',
    answer: 'Ja. Als Kunde registrierst du dich kostenlos, suchst Trainer, siehst Profile und buchst Erstgespräche – ohne versteckte Kosten.',
  },
  {
    question: 'Wie finde ich den richtigen Coach?',
    answer: 'Nutze unsere Filter: Standort, Spezialisierung, Preisspanne, Bewertung und Coaching-Modus (vor Ort / online / hybrid). Dann buchst du ein kostenloses Kennenlern-Gespräch.',
  },
  {
    question: 'Wie funktioniert die Anonymität?',
    answer: 'Deine persönlichen Kontaktdaten bleiben geschützt, bis du einen Vertrag abschließt. Vorher kommunizierst du unter einem anonymen Alias (z.B. Client#4821) über die Plattform.',
  },
  {
    question: 'Kann ich als Trainer FITNEXUS kostenlos testen?',
    answer: 'Du kannst dein Profil kostenlos erstellen und die Plattform kennenlernen. Für aktives Coaching brauchst du einen Starter- oder Pro-Plan.',
  },
  {
    question: 'Welche Zahlungsmethoden gibt es?',
    answer: 'Kreditkarte (Visa, Mastercard), SEPA-Lastschrift und PayPal. Alle Zahlungen laufen sicher über Stripe.',
  },
  {
    question: 'Kann ich jederzeit kündigen?',
    answer: 'Ja. Alle Pläne sind monatlich kündbar, ohne Mindestlaufzeit. Du behältst Zugang bis zum Ende des Abrechnungszeitraums.',
  },
  {
    question: 'Was passiert mit meinen Daten?',
    answer: 'Deine Daten gehören dir. Wir verkaufen nichts an Dritte. Alle Daten werden DSGVO-konform in europäischen Rechenzentren gespeichert.',
  },
  {
    question: 'Wie werden Trainer verifiziert?',
    answer: 'Trainer können Zertifikate, Qualifikationen und Lizenzen hochladen. Unser Team prüft diese und vergibt den Verifizierungs-Badge.',
  },
]

// ─── Testimonials ─────────────────────────────────────────
export const testimonials = [
  {
    rating: 5,
    quote: 'Seit ich über FITNEXUS meinen Coach gefunden habe, trainiere ich strukturierter als je zuvor. Die Plattform macht es unglaublich einfach.',
    name: 'Laura M.',
    role: 'Kundin seit 2025',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    rating: 5,
    quote: 'Als Personal Trainer spare ich mir 10 Stunden pro Woche an Verwaltung. Trainingsplanung, Kommunikation, Check-ins – alles an einem Ort.',
    name: 'Markus B.',
    role: 'Personal Trainer, München',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    rating: 5,
    quote: 'Die Anonymität am Anfang war für mich entscheidend. Endlich eine Plattform, die wirklich mitdenkt und sich hochwertig anfühlt.',
    name: 'Sophie H.',
    role: 'Kundin seit 2024',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
]
