import { UserInfo } from '@/src/types'
import React from 'react'
import { ChatBubbleLeftRightIcon, UserMinusIcon } from '@heroicons/react/16/solid'
import { useStore } from '@/src/store'
import Swal from 'sweetalert2'

type UserInfoProps = {
  friend: UserInfo
}

export default function FriendInfo({friend}:UserInfoProps) {
  const removeFriend = useStore((state) => state.removeFriend)

  const handleDeleteFriend = () => {
    // Confirmacion Sweetalert2
    Swal.fire({
      title: `¿Estas seguro de eliminar a ${friend.name}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#117D00',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if(result.isConfirmed) {
        removeFriend(friend.id)
      }
    })
  }

  return (
    <li className='flex gap-5 items-center shadow-xl p-2 rounded-2xl w-83'>
      <img src="/pruebaUser.jpg" alt="friendPhoto" className='w-10 h-10'/>
      <div className=''>
        <p className='font-black'>{friend.name}</p>
        <p className='text-slate-600 font-bold'>{friend.email}</p>
      </div>
      <div className='flex gap-5'>
        <button className='shadow-2xl' ><ChatBubbleLeftRightIcon className='w-8 h-8 text-white bg-blue-500 rounded-xl p-1 hover:bg-blue-600 transition cursor-pointer hover:scale-105' /></button>
        <button 
          className='shadow-2xl' 
          onClick={handleDeleteFriend}
        >
          <UserMinusIcon className='w-8 h-8 text-white bg-red-800 rounded-xl p-1 hover:bg-red-600 transition cursor-pointer hover:scale-105' />
        </button>
      </div>
    </li>
  )
}
