import { useStore } from '@/src/store'
import { BellIcon, MinusCircleIcon, UserPlusIcon } from '@heroicons/react/16/solid'
import React from 'react'

type RequestsNotificationProps = {
  request: {
    id: number,
    name: string,
    email: string,
  }
}

export default function RequestsNotification({request}:RequestsNotificationProps) {
  const acceptRequest = useStore((state) => state.acceptRequest)
  
  const handleRequest = (condition:string) => {
    acceptRequest({idSender: request.id, action: condition})
  }

  return (
    <li className='shadow-2xl p-2'>
        <div className='mb-2 rounded-xl flex items-center gap-2 p-2 hover:bg-slate-600 transition last:border-t last:border-gray-400'>
          <BellIcon className='w-5 text-lime-400' />
          <div>
            <p className='font-black text-white text-sm'>{request.name} Te ha enviado una solicitud de amistad</p>
            <p className='text-slate-400 text-sm text-start'>{request.email}</p>
          </div>
        </div>
        <div className='flex gap-5'>
          <button 
            className='shadow-xl p-1 bg-sky-700 hover:bg-sky-800 flex gap-1 items-center cursor-pointer rounded-md text-white font-black'
            onClick={() => handleRequest('accept')}
          >
             Agregar <UserPlusIcon className='w-6'/>
          </button>
          <button 
            className='shadow-xl p-1 bg-red-700 hover:bg-red-800 flex gap-1 items-center cursor-pointer rounded-md text-white font-black'
            onClick={() => handleRequest('decline')}
          >
             Rechazar <MinusCircleIcon className='w-6'/>
          </button>
        </div>
    </li>
  )
}
