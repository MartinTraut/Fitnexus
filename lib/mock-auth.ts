export type MockUser = {
  id: string
  name: string
  email: string
  role: 'customer' | 'trainer'
  displayName: string
}

const STORAGE_KEY = 'fitnexus_user'

export function getMockUser(): MockUser | null {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function setMockUser(user: MockUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearMockUser(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function createMockUser(name: string, email: string, role: 'customer' | 'trainer'): MockUser {
  const id = Math.random().toString(36).slice(2, 10)
  const clientNumber = Math.floor(1000 + Math.random() * 9000)
  return {
    id,
    name,
    email,
    role,
    displayName: role === 'customer' ? `Client#${clientNumber}` : name,
  }
}
