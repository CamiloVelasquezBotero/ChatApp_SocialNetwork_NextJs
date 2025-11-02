'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import UserInfo from '@/components/contact-list/UserInfo'
import { CursorArrowRaysIcon } from '@heroicons/react/16/solid'
import { useStore } from '@/src/store'

export default function contactList() {
  const friends = useStore((state) => state.userData.friends)
  const token = useStore((state) => state.token)

  return (
    <div className='flex justify-center w-full p-5'>
      <div className='bg-white w-300 h-130 shadow-2xl rounded-2xl p-10'>
        <ul className='flex w-full h-full items-center justify-center'>
          {friends.length ? (
            <p>user</p>
          ) : (
            <p className="flex font-bold text-2xl text-slate-600 gap-2">
              Aun no tienes friends agregados,
              <Link href={'/add-contact'} className='flex font-bold text-lime-500 gap-2 hover:text-shadow-md'>
                empieza a agregarlos <CursorArrowRaysIcon className='w-10 h-10' />
              </Link>
              
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}
