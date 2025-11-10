import { UserPlusIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/16/solid'
import { UserInfo } from "@/src/types"
import { useStore } from '@/src/store'
import { useMemo } from 'react'

type UserProps = {
    user: UserInfo
}

export default function User({user}:UserProps) {
  const sendFriendRequest = useStore((state) => state.sendFriendRequest)
  const userData = useStore((state) => state.userData)
  const friendsUser = useStore((state) => state.userData.friends)
  // Check if already friends
  const alreadyFriends = useMemo(() => friendsUser.some(friend => friend.id === user.id), [friendsUser])

  const handleSubmit = () => {
    if(!alreadyFriends) {
      sendFriendRequest(user.id)
    }
  }

  return (
    <li className="flex justify-between p-2 bg-slate-300 rounded-lg items-center w-130">
        <p>(FOTO)</p>
        <p className="font-black text-xl">{user.name}</p>
        <p className="font-black text-slate-700">{user.email}</p>
          {user.id !== userData.id ? (
            <button 
              type='button'
              className='cursor-pointer'
              onClick={handleSubmit}
            >
              {alreadyFriends ? (
                <ChatBubbleLeftRightIcon className="shadow-xl text-white rounded-xl bg-blue-500 p-2 w-9 hover:bg-blue-400 transition"/>
              ) : (
                <UserPlusIcon className="shadow-xl text-white rounded-xl bg-green-500 p-2 w-9 hover:bg-green-400 transition"/>
              )}
            </button>
          ) : (
            <UserIcon className="shadow-xl text-white rounded-xl bg-blue-700 p-2 w-9 hover:bg-blue-600 transition"/>
          )}
    </li>
  )
}
