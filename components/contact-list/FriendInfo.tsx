import { UserInfo } from '@/src/types'
import React from 'react'
import { ChatBubbleLeftRightIcon, UserMinusIcon } from '@heroicons/react/16/solid'

type UserInfoProps = {
  user: UserInfo
}

export default function FriendInfo({user}:UserInfoProps) {

  return (
    <li className='flex gap-5 items-center shadow-xl p-2 rounded-2xl w-83'>
      <img src="/pruebaUser.jpg" alt="friendPhoto" className='w-10 h-10'/>
      <div className=''>
        <p className='font-black'>{user.name}</p>
        <p className='text-slate-600 font-bold'>{user.email}</p>
      </div>
      <div className='flex gap-5'>
        <button className='shadow-2xl' ><ChatBubbleLeftRightIcon className='w-8 h-8 text-white bg-blue-500 rounded-xl p-1 hover:bg-blue-600 transition cursor-pointer hover:scale-105' /></button>
        <button className='shadow-2xl' ><UserMinusIcon className='w-8 h-8 text-white bg-red-800 rounded-xl p-1 hover:bg-red-600 transition cursor-pointer hover:scale-105' /></button>
      </div>
    </li>
  )
}
