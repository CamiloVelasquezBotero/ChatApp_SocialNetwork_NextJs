'use client'
import { useStore } from '@/src/store'
import DropDownMenu from './DropDownMenu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import PopOverNotification from './ui/PopOverNotification'

export default function Header() {

  const userData = useStore((state) => state.userData)
  const token = useStore((state) => state.token)
  const setToken = useStore((state) => state.setToken)
  const getUserData = useStore((state) => state.getUserData)
  const router = useRouter()

  // Comprobamos Sesion abierta
  useEffect(() => {
     const existsToken = localStorage.getItem('token')
     if(!existsToken) {
       router.push('/')
       return
     }
     setToken(existsToken)
     getUserData()
  }, [token])
  if(userData) {
  }

    return (
        <header className="grid grid-cols-2 bg-slate-800 items-center p-4">
            <Link href={'/dashboard'}>
              <h1 className="text-end text-4xl font-black text-white text-shadow-lg">Chat App NextJs</h1>
            </Link>
            {userData.email && (
              <div className="flex justify-end mr-10 gap-10 items-center">
                <PopOverNotification />
                <p className="text-white font-black">¡Hola {userData.name}!</p>
                <DropDownMenu />
              </div>
            )} 
        </header>
    )
}
