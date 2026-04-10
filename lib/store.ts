/**
 * FITNEXUS Local Store
 * localStorage-based state management that simulates a backend.
 * Ready to be swapped for Supabase queries.
 */

import type {
  Booking, BookingStatus, Contract, ContractStatus,
  ChatThread, Message, WorkoutPlan, WorkoutExercise,
  NutritionPlan, ProgressMetric, ProgressPhoto, Review,
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
  initialized: 'fn_initialized',
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

  // Seed contract
  const seedContract: Contract = {
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
  }
  set(KEYS.contracts, [seedContract])

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
// RESET
// ═══════════════════════════════════════════════════════════

export function resetStore(): void {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key))
}
