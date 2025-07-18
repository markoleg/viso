'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function Navbar() {
  const { isAuth, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold text-purple-600">FlavorAI</Link>

      <div className="space-x-4">
        {isAuth ? (
          <>
            <Link href="/recipes">All Recipes</Link>
            <Link href="/recipes/my">My Recipes</Link>
            <Link href="/recipes/new">Add Recipe</Link>
            <button onClick={handleLogout} className="text-red-600 cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
