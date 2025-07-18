'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
  const { isAuth, logout } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
    setMenuOpen(false)
  }

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev)
  }

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow relative">
      <Link href="/" className="text-xl font-bold text-purple-600">FlavorAI</Link>

      {/* Burger icon for mobile */}
      <button
        className="md:hidden cursor-pointer flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Menu links */}
      <div
        className={`space-x-4 md:space-x-4 md:flex md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-gray-100 md:bg-transparent shadow md:shadow-none z-20 transition-all duration-200 ease-in-out
        ${menuOpen ? 'flex flex-col p-4' : 'hidden'} md:flex`}
      >
        {isAuth ? (
          <>
            <Link className='text-gray-800 hover:text-purple-600 text-center py-2' href="/recipes" onClick={() => setMenuOpen(false)}>All Recipes</Link>
            <Link className='text-gray-800 hover:text-purple-600 text-center py-2' href="/recipes/my" onClick={() => setMenuOpen(false)}>My Recipes</Link>
            <Link className='text-gray-800 hover:text-purple-600 text-center py-2' href="/recipes/new" onClick={() => setMenuOpen(false)}>Add Recipe</Link>
            <button onClick={handleLogout} className="text-red-600 cursor-pointer text-center py-2 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
