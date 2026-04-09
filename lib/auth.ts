import type { User, UserRole } from '@/types'

// ─── Mock Auth Layer ──────────────────────────────────────
// This module abstracts auth. Currently uses localStorage mock.
// Will be swapped to Supabase Auth in production.

const STORAGE_KEY = 'fitnexus_user'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  display_name: string
  avatar_url: string | null
}

// Get current user from storage
export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    return JSON.parse(data) as AuthUser
  } catch {
    return null
  }
}

// Mock sign in
export function signIn(email: string, _password: string, role: UserRole = 'customer'): AuthUser {
  const user: AuthUser = {
    id: `user_${Date.now()}`,
    email,
    role,
    display_name: role === 'customer' ? `Client#${Math.floor(1000 + Math.random() * 9000)}` : email.split('@')[0],
    avatar_url: null,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

// Mock sign up
export function signUp(email: string, password: string, role: UserRole): AuthUser {
  return signIn(email, password, role)
}

// Sign out
export function signOut(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Check if authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Get role
export function getUserRole(): UserRole | null {
  return getCurrentUser()?.role ?? null
}

// Require specific role (returns user or null)
export function requireRole(role: UserRole): AuthUser | null {
  const user = getCurrentUser()
  if (!user || user.role !== role) return null
  return user
}
