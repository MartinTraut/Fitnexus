/**
 * FITNEXUS Local Store
 * localStorage-based state management that simulates a backend.
 * Ready to be swapped for Supabase queries.
 */

import type {
  Booking, BookingStatus, Contract, ContractStatus,
  ChatThread, Message, WorkoutPlan, WorkoutExercise,
  NutritionPlan, ProgressMetric, ProgressPhoto, Review,
  WorkoutLog, MealLog,
} from '@/types'
import { mockTrainers, mockReviews, mockBookings } from '@/lib/mock-data'

// ─── Storage Keys ─────────────────────────────────────────
const KEYS = {
  bookings: 'fn_bookings',
  contracts: 'fn_contracts',
  threads: 'fn_threads',
  messages: 'fn_messages',
  workoutPlans: 'fn_workout_plans',
  nutritionPlans: 'fn_nutrition_plans',
  progressMetrics: 'fn_progress_metrics',
  progressPhotos: 'fn_progress_photos',
  reviews: 'fn_reviews',
  workoutLogs: 'fn_workout_logs',
  mealLogs: 'fn_meal_logs',
  initialized: 'fn_initialized_v4',
} as const

// ─── Helpers ──────────────────────────────────────────────
function uid(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function now(): string {
  return new Date().toISOString()
}

function get<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function set<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// ─── Initialize with Seed Data ────────────────────────────
export function initializeStore(): void {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(KEYS.initialized)) return

  // Clear all old data on version bump
  Object.values(KEYS).forEach(key => localStorage.removeItem(key))

  // Seed bookings
  set(KEYS.bookings, mockBookings)

  // Seed reviews
  set(KEYS.reviews, mockReviews)

  // Seed a chat thread + messages
  const seedThread: ChatThread = {
    id: 'thread_1',
    trainer_id: 'tr_1',
    customer_id: 'c_demo',
    last_message_at: '2026-04-08T14:30:00Z',
    created_at: '2026-04-05T10:00:00Z',
  }
  const seedMessages: Message[] = [
    {
      id: 'msg_1', thread_id: 'thread_1', sender_id: 'c_demo',
      content: 'Hallo Max, ich interessiere mich für dein Transformation-Paket. Hast du aktuell noch Plätze frei?',
      message_type: 'text', is_read: true, created_at: '2026-04-05T10:05:00Z',
    },
    {
      id: 'msg_2', thread_id: 'thread_1', sender_id: 'tr_1',
      content: 'Hi! Ja, ich habe aktuell noch 3 Plätze frei. Lass uns gerne ein Kennenlerngespräch machen, dann besprechen wir alles. Wann passt es dir diese Woche?',
      message_type: 'text', is_read: true, created_at: '2026-04-05T11:20:00Z',
    },
    {
      id: 'msg_3', thread_id: 'thread_1', sender_id: 'c_demo',
      content: 'Super! Mittwoch oder Donnerstag Nachmittag wäre perfekt für mich.',
      message_type: 'text', is_read: true, created_at: '2026-04-05T12:00:00Z',
    },
    {
      id: 'msg_4', thread_id: 'thread_1', sender_id: 'tr_1',
      content: 'Perfekt, dann lass uns Mittwoch um 15:00 Uhr machen. Ich schicke dir gleich eine Bestätigung. Bis dann! 💪',
      message_type: 'text', is_read: false, created_at: '2026-04-08T14:30:00Z',
    },
  ]
  set(KEYS.threads, [seedThread])
  set(KEYS.messages, seedMessages)

  // Seed a workout plan
  const seedWorkout: WorkoutPlan = {
    id: 'wp_1',
    trainer_id: 'tr_1',
    customer_id: 'c_demo',
    title: 'Hypertrophie – Woche 1',
    week_number: 1,
    exercises: [
      { id: 'ex_1', name: 'Bankdrücken', sets: 4, reps: '8-10', weight: '80kg', rest_seconds: 90, notes: 'Controlled eccentric', video_url: 'https://www.youtube.com/watch?v=rT7DgCr-3pg', order: 1, day: 1, superset_group: null },
      { id: 'ex_2', name: 'Schrägbankdrücken (KH)', sets: 3, reps: '10-12', weight: '30kg', rest_seconds: 75, notes: null, video_url: 'https://www.youtube.com/watch?v=8iPEnn-ltC8', order: 2, day: 1, superset_group: null },
      { id: 'ex_3', name: 'Butterfly', sets: 3, reps: '12-15', weight: '20kg', rest_seconds: 60, notes: 'Peak contraction halten', video_url: null, order: 3, day: 1, superset_group: null },
      { id: 'ex_4', name: 'Trizeps Pushdowns', sets: 3, reps: '12-15', weight: '25kg', rest_seconds: 60, notes: null, video_url: null, order: 4, day: 1, superset_group: null },
      { id: 'ex_5', name: 'Kniebeugen', sets: 4, reps: '6-8', weight: '100kg', rest_seconds: 120, notes: 'ATG', video_url: 'https://www.youtube.com/watch?v=ultWZbUMPL8', order: 1, day: 2, superset_group: null },
      { id: 'ex_6', name: 'Beinpresse', sets: 3, reps: '10-12', weight: '180kg', rest_seconds: 90, notes: null, video_url: null, order: 2, day: 2, superset_group: null },
      { id: 'ex_7', name: 'Beinstrecker', sets: 3, reps: '12-15', weight: '50kg', rest_seconds: 60, notes: null, video_url: null, order: 3, day: 2, superset_group: null },
      { id: 'ex_8', name: 'Wadenheben', sets: 4, reps: '15-20', weight: '40kg', rest_seconds: 45, notes: null, video_url: null, order: 4, day: 2, superset_group: null },
      { id: 'ex_9', name: 'Klimmzüge', sets: 4, reps: '8-10', weight: 'Bodyweight', rest_seconds: 90, notes: 'Schulterbreit', video_url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g', order: 1, day: 3, superset_group: null },
      { id: 'ex_10', name: 'Langhantelrudern', sets: 4, reps: '8-10', weight: '70kg', rest_seconds: 90, notes: 'Obergriff', video_url: null, order: 2, day: 3, superset_group: null },
      { id: 'ex_11', name: 'Face Pulls', sets: 3, reps: '15-20', weight: '15kg', rest_seconds: 60, notes: null, video_url: null, order: 3, day: 3, superset_group: null },
      { id: 'ex_12', name: 'Bizeps Curls', sets: 3, reps: '10-12', weight: '15kg', rest_seconds: 60, notes: null, video_url: null, order: 4, day: 3, superset_group: null },
    ],
    notes: 'Push/Pull/Legs Split – Fokus Hypertrophie. Tempo: 3-0-1-0. Pause zwischen Sätzen einhalten.',
    created_at: '2026-04-01T10:00:00Z',
    updated_at: '2026-04-01T10:00:00Z',
  }
  set(KEYS.workoutPlans, [seedWorkout])

  // Seed nutrition plan
  const seedNutrition: NutritionPlan = {
    id: 'np_1',
    trainer_id: 'tr_1',
    customer_id: 'c_demo',
    title: 'Aufbau-Ernährungsplan',
    calories_target: 2800,
    protein_g: 180,
    carbs_g: 320,
    fat_g: 85,
    meals: [
      { id: 'meal_1', name: 'Frühstück', time: '07:30', foods: [
        { name: 'Haferflocken', amount: '100g', calories: 370, protein: 13, carbs: 60, fat: 7 },
        { name: 'Banane', amount: '1 Stück', calories: 95, protein: 1, carbs: 24, fat: 0 },
        { name: 'Whey Protein', amount: '30g', calories: 120, protein: 24, carbs: 3, fat: 1 },
      ]},
      { id: 'meal_2', name: 'Mittagessen', time: '12:30', foods: [
        { name: 'Hähnchenbrust', amount: '200g', calories: 220, protein: 46, carbs: 0, fat: 3 },
        { name: 'Reis', amount: '150g (gekocht)', calories: 195, protein: 4, carbs: 43, fat: 0 },
        { name: 'Brokkoli', amount: '150g', calories: 50, protein: 4, carbs: 7, fat: 1 },
      ]},
      { id: 'meal_3', name: 'Snack', time: '15:30', foods: [
        { name: 'Magerquark', amount: '250g', calories: 175, protein: 30, carbs: 10, fat: 1 },
        { name: 'Beeren-Mix', amount: '100g', calories: 45, protein: 1, carbs: 10, fat: 0 },
      ]},
      { id: 'meal_4', name: 'Abendessen', time: '19:00', foods: [
        { name: 'Lachs', amount: '200g', calories: 400, protein: 40, carbs: 0, fat: 26 },
        { name: 'Süßkartoffel', amount: '200g', calories: 170, protein: 3, carbs: 40, fat: 0 },
        { name: 'Salat', amount: '100g', calories: 20, protein: 1, carbs: 3, fat: 0 },
      ]},
    ],
    notes: 'Mindestens 3L Wasser am Tag. Pre-Workout: 30min vor dem Training Kohlenhydrate. Post-Workout: Protein innerhalb von 60min.',
    created_at: '2026-04-01T10:00:00Z',
    updated_at: '2026-04-01T10:00:00Z',
  }
  set(KEYS.nutritionPlans, [seedNutrition])

  // Seed progress data
  const seedProgress: ProgressMetric[] = [
    { id: 'pm_1', customer_id: 'c_demo', weight_kg: 85.2, body_fat_percent: 18.5, muscle_mass_kg: 38.1, notes: 'Start', recorded_at: '2026-03-01T08:00:00Z', created_at: '2026-03-01T08:00:00Z' },
    { id: 'pm_2', customer_id: 'c_demo', weight_kg: 84.8, body_fat_percent: 17.9, muscle_mass_kg: 38.4, notes: null, recorded_at: '2026-03-08T08:00:00Z', created_at: '2026-03-08T08:00:00Z' },
    { id: 'pm_3', customer_id: 'c_demo', weight_kg: 84.1, body_fat_percent: 17.2, muscle_mass_kg: 38.8, notes: 'Ernährung angepasst', recorded_at: '2026-03-15T08:00:00Z', created_at: '2026-03-15T08:00:00Z' },
    { id: 'pm_4', customer_id: 'c_demo', weight_kg: 83.5, body_fat_percent: 16.6, muscle_mass_kg: 39.2, notes: null, recorded_at: '2026-03-22T08:00:00Z', created_at: '2026-03-22T08:00:00Z' },
    { id: 'pm_5', customer_id: 'c_demo', weight_kg: 83.0, body_fat_percent: 16.1, muscle_mass_kg: 39.5, notes: 'Guter Fortschritt!', recorded_at: '2026-03-29T08:00:00Z', created_at: '2026-03-29T08:00:00Z' },
    { id: 'pm_6', customer_id: 'c_demo', weight_kg: 82.4, body_fat_percent: 15.5, muscle_mass_kg: 39.9, notes: null, recorded_at: '2026-04-05T08:00:00Z', created_at: '2026-04-05T08:00:00Z' },
  ]
  set(KEYS.progressMetrics, seedProgress)

  // Seed contracts
  const seedContracts: Contract[] = [
    {
      id: 'ct_1',
      trainer_id: 'tr_1',
      customer_id: 'c_demo',
      package_id: 'pkg_1b',
      start_date: '2026-03-01T00:00:00Z',
      end_date: '2026-04-26T00:00:00Z',
      status: 'active',
      monthly_rate: 720,
      platform_fee_percent: 7,
      sessions_total: 12,
      sessions_used: 6,
      created_at: '2026-02-28T10:00:00Z',
      updated_at: '2026-04-01T10:00:00Z',
    },
    {
      id: 'ct_2',
      trainer_id: 'tr_1',
      customer_id: 'c_4',
      package_id: 'pkg_1a',
      start_date: '2026-02-15T00:00:00Z',
      end_date: '2026-05-15T00:00:00Z',
      status: 'active',
      monthly_rate: 480,
      platform_fee_percent: 7,
      sessions_total: 8,
      sessions_used: 5,
      created_at: '2026-02-14T10:00:00Z',
      updated_at: '2026-04-01T10:00:00Z',
    },
    {
      id: 'ct_3',
      trainer_id: 'tr_1',
      customer_id: 'c_5',
      package_id: 'pkg_1b',
      start_date: '2026-01-10T00:00:00Z',
      end_date: '2026-04-10T00:00:00Z',
      status: 'active',
      monthly_rate: 720,
      platform_fee_percent: 7,
      sessions_total: 12,
      sessions_used: 10,
      created_at: '2026-01-09T10:00:00Z',
      updated_at: '2026-04-01T10:00:00Z',
    },
    {
      id: 'ct_4',
      trainer_id: 'tr_1',
      customer_id: 'c_6',
      package_id: 'pkg_1a',
      start_date: '2026-03-01T00:00:00Z',
      end_date: '2026-06-01T00:00:00Z',
      status: 'active',
      monthly_rate: 480,
      platform_fee_percent: 7,
      sessions_total: 8,
      sessions_used: 3,
      created_at: '2026-02-28T10:00:00Z',
      updated_at: '2026-04-01T10:00:00Z',
    },
    {
      id: 'ct_5',
      trainer_id: 'tr_1',
      customer_id: 'c_7',
      package_id: 'pkg_1b',
      start_date: '2025-12-01T00:00:00Z',
      end_date: '2026-03-01T00:00:00Z',
      status: 'completed',
      monthly_rate: 720,
      platform_fee_percent: 7,
      sessions_total: 12,
      sessions_used: 12,
      created_at: '2025-11-30T10:00:00Z',
      updated_at: '2026-03-01T10:00:00Z',
    },
  ]
  set(KEYS.contracts, seedContracts)

  // Seed workout logs — realistic progression over 8+ weeks
  const seedWorkoutLogs: WorkoutLog[] = [
    // ═══ Bankdrücken — 8 Sessions (Montag, Push Day) ═══
    // Woche 1: Start bei 60kg
    { id: 'wl_1', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-02-17T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 60, completed: true }, { set_number: 2, reps: 7, weight: 60, completed: true }, { set_number: 3, reps: 6, weight: 60, completed: true }, { set_number: 4, reps: 6, weight: 55, completed: true },
    ], notes: null, created_at: '2026-02-17T10:00:00Z' },
    // Woche 2
    { id: 'wl_2', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-02-24T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 9, weight: 62.5, completed: true }, { set_number: 2, reps: 8, weight: 62.5, completed: true }, { set_number: 3, reps: 7, weight: 60, completed: true }, { set_number: 4, reps: 6, weight: 60, completed: true },
    ], notes: null, created_at: '2026-02-24T10:00:00Z' },
    // Woche 3
    { id: 'wl_3', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-03-03T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 65, completed: true }, { set_number: 2, reps: 9, weight: 65, completed: true }, { set_number: 3, reps: 8, weight: 65, completed: true }, { set_number: 4, reps: 7, weight: 62.5, completed: true },
    ], notes: null, created_at: '2026-03-03T10:00:00Z' },
    // Woche 4
    { id: 'wl_4', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-03-10T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 70, completed: true }, { set_number: 2, reps: 9, weight: 70, completed: true }, { set_number: 3, reps: 8, weight: 67.5, completed: true }, { set_number: 4, reps: 7, weight: 67.5, completed: true },
    ], notes: null, created_at: '2026-03-10T10:00:00Z' },
    // Woche 5
    { id: 'wl_5', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-03-17T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 72.5, completed: true }, { set_number: 2, reps: 10, weight: 72.5, completed: true }, { set_number: 3, reps: 9, weight: 70, completed: true }, { set_number: 4, reps: 8, weight: 70, completed: true },
    ], notes: null, created_at: '2026-03-17T10:00:00Z' },
    // Woche 6
    { id: 'wl_6', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-03-24T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 75, completed: true }, { set_number: 2, reps: 10, weight: 75, completed: true }, { set_number: 3, reps: 9, weight: 75, completed: true }, { set_number: 4, reps: 8, weight: 72.5, completed: true },
    ], notes: null, created_at: '2026-03-24T10:00:00Z' },
    // Woche 7
    { id: 'wl_7', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-03-31T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 77.5, completed: true }, { set_number: 2, reps: 10, weight: 77.5, completed: true }, { set_number: 3, reps: 9, weight: 75, completed: true }, { set_number: 4, reps: 8, weight: 75, completed: true },
    ], notes: null, created_at: '2026-03-31T10:00:00Z' },
    // Woche 8
    { id: 'wl_8', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_1', exercise_name: 'Bankdrücken', date: '2026-04-07T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '80kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 80, completed: true }, { set_number: 2, reps: 10, weight: 80, completed: true }, { set_number: 3, reps: 9, weight: 77.5, completed: true }, { set_number: 4, reps: 8, weight: 77.5, completed: true },
    ], notes: 'Ziel 80kg erreicht!', created_at: '2026-04-07T10:00:00Z' },

    // ═══ Kniebeugen — 7 Sessions (Dienstag, Leg Day) ═══
    { id: 'wl_9', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-02-18T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 6, weight: 70, completed: true }, { set_number: 2, reps: 5, weight: 70, completed: true }, { set_number: 3, reps: 5, weight: 65, completed: true }, { set_number: 4, reps: 4, weight: 65, completed: true },
    ], notes: null, created_at: '2026-02-18T10:00:00Z' },
    { id: 'wl_10', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-02-25T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 7, weight: 75, completed: true }, { set_number: 2, reps: 6, weight: 75, completed: true }, { set_number: 3, reps: 6, weight: 72.5, completed: true }, { set_number: 4, reps: 5, weight: 72.5, completed: true },
    ], notes: null, created_at: '2026-02-25T10:00:00Z' },
    { id: 'wl_11', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-03-04T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 80, completed: true }, { set_number: 2, reps: 7, weight: 80, completed: true }, { set_number: 3, reps: 6, weight: 77.5, completed: true }, { set_number: 4, reps: 6, weight: 77.5, completed: true },
    ], notes: null, created_at: '2026-03-04T10:00:00Z' },
    { id: 'wl_12', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-03-11T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 82.5, completed: true }, { set_number: 2, reps: 7, weight: 82.5, completed: true }, { set_number: 3, reps: 7, weight: 80, completed: true }, { set_number: 4, reps: 6, weight: 80, completed: true },
    ], notes: null, created_at: '2026-03-11T10:00:00Z' },
    { id: 'wl_13', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-03-18T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 85, completed: true }, { set_number: 2, reps: 8, weight: 85, completed: true }, { set_number: 3, reps: 7, weight: 82.5, completed: true }, { set_number: 4, reps: 6, weight: 82.5, completed: true },
    ], notes: null, created_at: '2026-03-18T10:00:00Z' },
    { id: 'wl_14', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-03-25T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 90, completed: true }, { set_number: 2, reps: 8, weight: 87.5, completed: true }, { set_number: 3, reps: 7, weight: 87.5, completed: true }, { set_number: 4, reps: 6, weight: 85, completed: true },
    ], notes: null, created_at: '2026-03-25T10:00:00Z' },
    { id: 'wl_15', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_5', exercise_name: 'Kniebeugen', date: '2026-04-08T10:00:00Z', prescribed_sets: 4, prescribed_reps: '6-8', prescribed_weight: '100kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 95, completed: true }, { set_number: 2, reps: 8, weight: 92.5, completed: true }, { set_number: 3, reps: 7, weight: 92.5, completed: true }, { set_number: 4, reps: 7, weight: 90, completed: true },
    ], notes: null, created_at: '2026-04-08T10:00:00Z' },

    // ═══ Langhantelrudern — 7 Sessions (Mittwoch, Pull Day) ═══
    { id: 'wl_16', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-02-19T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 8, weight: 45, completed: true }, { set_number: 2, reps: 7, weight: 45, completed: true }, { set_number: 3, reps: 7, weight: 42.5, completed: true }, { set_number: 4, reps: 6, weight: 42.5, completed: true },
    ], notes: null, created_at: '2026-02-19T10:00:00Z' },
    { id: 'wl_17', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-02-26T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 9, weight: 47.5, completed: true }, { set_number: 2, reps: 8, weight: 47.5, completed: true }, { set_number: 3, reps: 8, weight: 45, completed: true }, { set_number: 4, reps: 7, weight: 45, completed: true },
    ], notes: null, created_at: '2026-02-26T10:00:00Z' },
    { id: 'wl_18', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-03-05T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 50, completed: true }, { set_number: 2, reps: 9, weight: 50, completed: true }, { set_number: 3, reps: 8, weight: 50, completed: true }, { set_number: 4, reps: 7, weight: 47.5, completed: true },
    ], notes: null, created_at: '2026-03-05T10:00:00Z' },
    { id: 'wl_19', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-03-12T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 55, completed: true }, { set_number: 2, reps: 9, weight: 55, completed: true }, { set_number: 3, reps: 9, weight: 52.5, completed: true }, { set_number: 4, reps: 8, weight: 52.5, completed: true },
    ], notes: null, created_at: '2026-03-12T10:00:00Z' },
    { id: 'wl_20', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-03-19T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 57.5, completed: true }, { set_number: 2, reps: 10, weight: 57.5, completed: true }, { set_number: 3, reps: 9, weight: 55, completed: true }, { set_number: 4, reps: 8, weight: 55, completed: true },
    ], notes: null, created_at: '2026-03-19T10:00:00Z' },
    { id: 'wl_21', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-04-02T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 60, completed: true }, { set_number: 2, reps: 10, weight: 60, completed: true }, { set_number: 3, reps: 9, weight: 60, completed: true }, { set_number: 4, reps: 9, weight: 57.5, completed: true },
    ], notes: null, created_at: '2026-04-02T10:00:00Z' },
    { id: 'wl_22', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_10', exercise_name: 'Langhantelrudern', date: '2026-04-09T10:00:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: '70kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 65, completed: true }, { set_number: 2, reps: 10, weight: 62.5, completed: true }, { set_number: 3, reps: 10, weight: 62.5, completed: true }, { set_number: 4, reps: 9, weight: 60, completed: true },
    ], notes: null, created_at: '2026-04-09T10:00:00Z' },

    // ═══ Klimmzüge — 6 Sessions (Bodyweight, Wdh-Steigerung) ═══
    { id: 'wl_23', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-02-19T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 5, weight: 0, completed: true }, { set_number: 2, reps: 4, weight: 0, completed: true }, { set_number: 3, reps: 4, weight: 0, completed: true }, { set_number: 4, reps: 3, weight: 0, completed: true },
    ], notes: null, created_at: '2026-02-19T10:30:00Z' },
    { id: 'wl_24', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-03-05T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 6, weight: 0, completed: true }, { set_number: 2, reps: 5, weight: 0, completed: true }, { set_number: 3, reps: 5, weight: 0, completed: true }, { set_number: 4, reps: 4, weight: 0, completed: true },
    ], notes: null, created_at: '2026-03-05T10:30:00Z' },
    { id: 'wl_25', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-03-12T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 7, weight: 0, completed: true }, { set_number: 2, reps: 6, weight: 0, completed: true }, { set_number: 3, reps: 6, weight: 0, completed: true }, { set_number: 4, reps: 5, weight: 0, completed: true },
    ], notes: null, created_at: '2026-03-12T10:30:00Z' },
    { id: 'wl_26', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-03-19T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 8, weight: 0, completed: true }, { set_number: 2, reps: 7, weight: 0, completed: true }, { set_number: 3, reps: 6, weight: 0, completed: true }, { set_number: 4, reps: 6, weight: 0, completed: true },
    ], notes: null, created_at: '2026-03-19T10:30:00Z' },
    { id: 'wl_27', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-04-02T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 9, weight: 0, completed: true }, { set_number: 2, reps: 8, weight: 0, completed: true }, { set_number: 3, reps: 7, weight: 0, completed: true }, { set_number: 4, reps: 7, weight: 0, completed: true },
    ], notes: null, created_at: '2026-04-02T10:30:00Z' },
    { id: 'wl_28', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_9', exercise_name: 'Klimmzüge', date: '2026-04-09T10:30:00Z', prescribed_sets: 4, prescribed_reps: '8-10', prescribed_weight: 'Bodyweight', actual_sets: [
      { set_number: 1, reps: 10, weight: 0, completed: true }, { set_number: 2, reps: 9, weight: 0, completed: true }, { set_number: 3, reps: 8, weight: 0, completed: true }, { set_number: 4, reps: 7, weight: 0, completed: true },
    ], notes: null, created_at: '2026-04-09T10:30:00Z' },

    // ═══ Beinpresse — 5 Sessions ═══
    { id: 'wl_29', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_6', exercise_name: 'Beinpresse', date: '2026-02-18T10:30:00Z', prescribed_sets: 3, prescribed_reps: '10-12', prescribed_weight: '180kg', actual_sets: [
      { set_number: 1, reps: 10, weight: 120, completed: true }, { set_number: 2, reps: 9, weight: 120, completed: true }, { set_number: 3, reps: 8, weight: 110, completed: true },
    ], notes: null, created_at: '2026-02-18T10:30:00Z' },
    { id: 'wl_30', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_6', exercise_name: 'Beinpresse', date: '2026-03-04T10:30:00Z', prescribed_sets: 3, prescribed_reps: '10-12', prescribed_weight: '180kg', actual_sets: [
      { set_number: 1, reps: 12, weight: 130, completed: true }, { set_number: 2, reps: 10, weight: 130, completed: true }, { set_number: 3, reps: 9, weight: 125, completed: true },
    ], notes: null, created_at: '2026-03-04T10:30:00Z' },
    { id: 'wl_31', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_6', exercise_name: 'Beinpresse', date: '2026-03-18T10:30:00Z', prescribed_sets: 3, prescribed_reps: '10-12', prescribed_weight: '180kg', actual_sets: [
      { set_number: 1, reps: 12, weight: 145, completed: true }, { set_number: 2, reps: 11, weight: 145, completed: true }, { set_number: 3, reps: 10, weight: 140, completed: true },
    ], notes: null, created_at: '2026-03-18T10:30:00Z' },
    { id: 'wl_32', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_6', exercise_name: 'Beinpresse', date: '2026-04-01T10:30:00Z', prescribed_sets: 3, prescribed_reps: '10-12', prescribed_weight: '180kg', actual_sets: [
      { set_number: 1, reps: 12, weight: 160, completed: true }, { set_number: 2, reps: 11, weight: 155, completed: true }, { set_number: 3, reps: 10, weight: 150, completed: true },
    ], notes: null, created_at: '2026-04-01T10:30:00Z' },
    { id: 'wl_33', customer_id: 'c_demo', plan_id: 'wp_1', exercise_id: 'ex_6', exercise_name: 'Beinpresse', date: '2026-04-08T10:30:00Z', prescribed_sets: 3, prescribed_reps: '10-12', prescribed_weight: '180kg', actual_sets: [
      { set_number: 1, reps: 12, weight: 170, completed: true }, { set_number: 2, reps: 12, weight: 165, completed: true }, { set_number: 3, reps: 10, weight: 160, completed: true },
    ], notes: null, created_at: '2026-04-08T10:30:00Z' },
  ]
  set(KEYS.workoutLogs, seedWorkoutLogs)

  localStorage.setItem(KEYS.initialized, 'true')
}

// ═══════════════════════════════════════════════════════════
// BOOKINGS
// ═══════════════════════════════════════════════════════════

export function getBookings(): Booking[] {
  return get<Booking>(KEYS.bookings)
}

export function getBookingsForTrainer(trainerId: string): Booking[] {
  return getBookings().filter(b => b.trainer_id === trainerId)
}

export function getBookingsForCustomer(customerId: string): Booking[] {
  return getBookings().filter(b => b.customer_id === customerId)
}

export function createBooking(data: {
  trainer_id: string
  customer_id: string
  message: string
  preferred_times?: string
}): Booking {
  const booking: Booking = {
    id: `bk_${uid()}`,
    trainer_id: data.trainer_id,
    customer_id: data.customer_id,
    status: 'pending',
    scheduled_at: '',
    duration_minutes: 30,
    notes: data.message,
    meeting_url: null,
    created_at: now(),
    updated_at: now(),
  }
  const bookings = getBookings()
  bookings.unshift(booking)
  set(KEYS.bookings, bookings)
  return booking
}

export function updateBookingStatus(bookingId: string, status: BookingStatus): void {
  const bookings = getBookings()
  const idx = bookings.findIndex(b => b.id === bookingId)
  if (idx >= 0) {
    bookings[idx].status = status
    bookings[idx].updated_at = now()
    set(KEYS.bookings, bookings)
  }
}

// ═══════════════════════════════════════════════════════════
// CONTRACTS
// ═══════════════════════════════════════════════════════════

export function getContracts(): Contract[] {
  return get<Contract>(KEYS.contracts)
}

export function getContractsForTrainer(trainerId: string): Contract[] {
  return getContracts().filter(c => c.trainer_id === trainerId)
}

export function getContractsForCustomer(customerId: string): Contract[] {
  return getContracts().filter(c => c.customer_id === customerId)
}

export function createContract(data: {
  trainer_id: string
  customer_id: string
  package_name: string
  price: number
  duration_weeks: number
  sessions: number
}): Contract {
  const contract: Contract = {
    id: `ct_${uid()}`,
    trainer_id: data.trainer_id,
    customer_id: data.customer_id,
    package_id: null,
    start_date: now(),
    end_date: new Date(Date.now() + data.duration_weeks * 7 * 86400000).toISOString(),
    status: 'draft',
    monthly_rate: data.price,
    platform_fee_percent: 7,
    sessions_total: data.sessions,
    sessions_used: 0,
    created_at: now(),
    updated_at: now(),
  }
  const contracts = getContracts()
  contracts.unshift(contract)
  set(KEYS.contracts, contracts)
  return contract
}

export function updateContractStatus(contractId: string, status: ContractStatus): void {
  const contracts = getContracts()
  const idx = contracts.findIndex(c => c.id === contractId)
  if (idx >= 0) {
    contracts[idx].status = status
    contracts[idx].updated_at = now()
    set(KEYS.contracts, contracts)
  }
}

// ═══════════════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════════════

export function getThreads(): ChatThread[] {
  return get<ChatThread>(KEYS.threads)
}

export function getThreadsForUser(userId: string): ChatThread[] {
  return getThreads().filter(t => t.trainer_id === userId || t.customer_id === userId)
}

export function getOrCreateThread(trainerId: string, customerId: string): ChatThread {
  const threads = getThreads()
  const existing = threads.find(t => t.trainer_id === trainerId && t.customer_id === customerId)
  if (existing) return existing

  const thread: ChatThread = {
    id: `thread_${uid()}`,
    trainer_id: trainerId,
    customer_id: customerId,
    last_message_at: null,
    created_at: now(),
  }
  threads.unshift(thread)
  set(KEYS.threads, threads)
  return thread
}

export function getMessages(threadId: string): Message[] {
  return get<Message>(KEYS.messages)
    .filter(m => m.thread_id === threadId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
}

export function sendMessage(data: {
  thread_id: string
  sender_id: string
  content: string
  message_type?: Message['message_type']
}): Message {
  const message: Message = {
    id: `msg_${uid()}`,
    thread_id: data.thread_id,
    sender_id: data.sender_id,
    content: data.content,
    message_type: data.message_type ?? 'text',
    is_read: false,
    created_at: now(),
  }
  const messages = get<Message>(KEYS.messages)
  messages.push(message)
  set(KEYS.messages, messages)

  // Update thread last_message_at
  const threads = getThreads()
  const idx = threads.findIndex(t => t.id === data.thread_id)
  if (idx >= 0) {
    threads[idx].last_message_at = message.created_at
    set(KEYS.threads, threads)
  }

  return message
}

export function markMessagesRead(threadId: string, readerId: string): void {
  const messages = get<Message>(KEYS.messages)
  let changed = false
  messages.forEach(m => {
    if (m.thread_id === threadId && m.sender_id !== readerId && !m.is_read) {
      m.is_read = true
      changed = true
    }
  })
  if (changed) set(KEYS.messages, messages)
}

export function getUnreadCount(threadId: string, userId: string): number {
  return get<Message>(KEYS.messages)
    .filter(m => m.thread_id === threadId && m.sender_id !== userId && !m.is_read)
    .length
}

// ═══════════════════════════════════════════════════════════
// WORKOUT PLANS
// ═══════════════════════════════════════════════════════════

export function getWorkoutPlans(customerId: string): WorkoutPlan[] {
  return get<WorkoutPlan>(KEYS.workoutPlans).filter(w => w.customer_id === customerId)
}

export function getWorkoutPlan(planId: string): WorkoutPlan | null {
  return get<WorkoutPlan>(KEYS.workoutPlans).find(w => w.id === planId) ?? null
}

export function saveWorkoutPlan(plan: WorkoutPlan): void {
  const plans = get<WorkoutPlan>(KEYS.workoutPlans)
  const idx = plans.findIndex(p => p.id === plan.id)
  if (idx >= 0) {
    plans[idx] = { ...plan, updated_at: now() }
  } else {
    plans.unshift({ ...plan, id: plan.id || `wp_${uid()}`, created_at: now(), updated_at: now() })
  }
  set(KEYS.workoutPlans, plans)
}

export function deleteWorkoutPlan(planId: string): void {
  set(KEYS.workoutPlans, get<WorkoutPlan>(KEYS.workoutPlans).filter(p => p.id !== planId))
}

// ═══════════════════════════════════════════════════════════
// NUTRITION PLANS
// ═══════════════════════════════════════════════════════════

export function getNutritionPlans(customerId: string): NutritionPlan[] {
  return get<NutritionPlan>(KEYS.nutritionPlans).filter(n => n.customer_id === customerId)
}

export function saveNutritionPlan(plan: NutritionPlan): void {
  const plans = get<NutritionPlan>(KEYS.nutritionPlans)
  const idx = plans.findIndex(p => p.id === plan.id)
  if (idx >= 0) {
    plans[idx] = { ...plan, updated_at: now() }
  } else {
    plans.unshift({ ...plan, id: plan.id || `np_${uid()}`, created_at: now(), updated_at: now() })
  }
  set(KEYS.nutritionPlans, plans)
}

// ═══════════════════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════════════════

export function getProgressMetrics(customerId: string): ProgressMetric[] {
  return get<ProgressMetric>(KEYS.progressMetrics)
    .filter(p => p.customer_id === customerId)
    .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime())
}

export function addProgressMetric(data: {
  customer_id: string
  weight_kg: number | null
  body_fat_percent: number | null
  muscle_mass_kg: number | null
  notes: string | null
}): ProgressMetric {
  const metric: ProgressMetric = {
    id: `pm_${uid()}`,
    ...data,
    recorded_at: now(),
    created_at: now(),
  }
  const metrics = get<ProgressMetric>(KEYS.progressMetrics)
  metrics.push(metric)
  set(KEYS.progressMetrics, metrics)
  return metric
}

export function updateProgressMetric(id: string, data: Partial<Pick<ProgressMetric, 'weight_kg' | 'body_fat_percent' | 'muscle_mass_kg' | 'notes'>>): void {
  const metrics = get<ProgressMetric>(KEYS.progressMetrics)
  const idx = metrics.findIndex(m => m.id === id)
  if (idx >= 0) {
    metrics[idx] = { ...metrics[idx], ...data }
    set(KEYS.progressMetrics, metrics)
  }
}

export function deleteProgressMetric(id: string): void {
  set(KEYS.progressMetrics, get<ProgressMetric>(KEYS.progressMetrics).filter(m => m.id !== id))
}

export function getProgressPhotos(customerId: string): ProgressPhoto[] {
  return get<ProgressPhoto>(KEYS.progressPhotos)
    .filter(p => p.customer_id === customerId)
    .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())
}

export function addProgressPhoto(data: {
  customer_id: string
  image_url: string
  category: ProgressPhoto['category']
}): ProgressPhoto {
  const photo: ProgressPhoto = {
    id: `pp_${uid()}`,
    ...data,
    recorded_at: now(),
    created_at: now(),
  }
  const photos = get<ProgressPhoto>(KEYS.progressPhotos)
  photos.unshift(photo)
  set(KEYS.progressPhotos, photos)
  return photo
}

// ═══════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════

export function getReviews(): (Review & { customer_display_name?: string })[] {
  return get(KEYS.reviews)
}

export function getReviewsForTrainer(trainerId: string): (Review & { customer_display_name?: string })[] {
  return getReviews().filter(r => r.trainer_id === trainerId)
}

export function createReview(data: {
  trainer_id: string
  customer_id: string
  contract_id?: string
  punctuality: number
  motivation: number
  knowledge: number
  sympathy: number
  cleanliness: number
  text: string | null
}): Review {
  const totalRating = Math.round(
    (data.punctuality + data.motivation + data.knowledge + data.sympathy + data.cleanliness) / 5 * 10
  ) / 10
  const review: Review = {
    id: `rev_${uid()}`,
    trainer_id: data.trainer_id,
    customer_id: data.customer_id,
    booking_id: null,
    rating_total: totalRating,
    punctuality: data.punctuality,
    motivation: data.motivation,
    knowledge: data.knowledge,
    sympathy: data.sympathy,
    cleanliness: data.cleanliness,
    text: data.text,
    is_visible: true,
    created_at: now(),
  }
  const reviews = getReviews()
  reviews.unshift({ ...review, customer_display_name: `Client#${Math.floor(1000 + Math.random() * 9000)}` })
  set(KEYS.reviews, reviews)
  return review
}

// ═══════════════════════════════════════════════════════════
// WORKOUT LOGS
// ═══════════════════════════════════════════════════════════

export function getWorkoutLogs(customerId: string, exerciseName?: string): WorkoutLog[] {
  let logs = get<WorkoutLog>(KEYS.workoutLogs).filter(l => l.customer_id === customerId)
  if (exerciseName) {
    logs = logs.filter(l => l.exercise_name === exerciseName)
  }
  return logs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getExerciseHistory(customerId: string, exerciseName: string): WorkoutLog[] {
  return getWorkoutLogs(customerId, exerciseName)
}

export function addWorkoutLog(data: Omit<WorkoutLog, 'id' | 'created_at'>): WorkoutLog {
  const log: WorkoutLog = {
    ...data,
    id: `wl_${uid()}`,
    created_at: now(),
  }
  const logs = get<WorkoutLog>(KEYS.workoutLogs)
  logs.push(log)
  set(KEYS.workoutLogs, logs)
  return log
}

// ═══════════════════════════════════════════════════════════
// MEAL LOGS
// ═══════════════════════════════════════════════════════════

export function getMealLogs(customerId: string, date?: string): MealLog[] {
  let logs = get<MealLog>(KEYS.mealLogs).filter(l => l.customer_id === customerId)
  if (date) {
    logs = logs.filter(l => l.date === date)
  }
  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getMealLog(customerId: string, date: string): MealLog | null {
  return getMealLogs(customerId, date)[0] ?? null
}

export function saveMealLog(log: MealLog): void {
  const logs = get<MealLog>(KEYS.mealLogs)
  const idx = logs.findIndex(l => l.id === log.id)
  if (idx >= 0) {
    logs[idx] = { ...log, updated_at: now() }
  } else {
    logs.push({ ...log, id: log.id || `ml_${uid()}`, created_at: now(), updated_at: now() })
  }
  set(KEYS.mealLogs, logs)
}

export function getMealLogHistory(customerId: string, days: number = 7): MealLog[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return get<MealLog>(KEYS.mealLogs)
    .filter(l => l.customer_id === customerId && new Date(l.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// ═══════════════════════════════════════════════════════════
// RESET
// ═══════════════════════════════════════════════════════════

export function resetStore(): void {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key))
}
