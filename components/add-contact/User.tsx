import { UserPlusIcon } from '@heroicons/react/16/solid'
import { UserData } from "@/src/types"
import { useStore } from '@/src/store'

type UserProps = {
    user: UserData
}

export default function User({user}:UserProps) {
    const sendFriendRequest = useStore((state) => state.sendFriendRequest)

  return (
    <li className="flex justify-between p-2 bg-slate-300 rounded-lg items-center w-130">
        <p>(FOTO)</p>
        <p className="font-black text-xl">{user.name}</p>
        <p className="font-black text-slate-700">{user.email}</p>
          <input type="hidden" name='userId' value={user.id} />
          <button 
            type='button'
            className='cursor-pointer'
            onClick={() => sendFriendRequest(user.id)}
          >
            <UserPlusIcon className='text-white rounded-xl bg-green-500 p-2 w-9 hover:bg-green-400 transition'/>
          </button>
    </li>
  )
}
