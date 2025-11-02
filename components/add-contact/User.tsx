import { UserPlusIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/16/solid'
import { UserFoundInSearch } from "@/src/types"
import { useStore } from '@/src/store'

type UserProps = {
    user: UserFoundInSearch
}

export default function User({user}:UserProps) {
  const sendFriendRequest = useStore((state) => state.sendFriendRequest)
  const userData = useStore((state) => state.userData)
  let response
  const handleSubmit = () => {
    response = sendFriendRequest(user.id)
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
              {response ? (
                <ChatBubbleLeftRightIcon className="text-white rounded-xl bg-blue-500 p-2 w-9 hover:bg-blue-400 transition"/>
              ) : (
                <UserPlusIcon className="text-white rounded-xl bg-green-500 p-2 w-9 hover:bg-green-400 transition"/>
              )}
            </button>
          ) : (
            <UserIcon className="text-white rounded-xl bg-blue-500 p-2 w-9 hover:bg-blue-400 transition"/>
          )}
    </li>
  )
}
