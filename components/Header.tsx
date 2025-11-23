'use client'
import { useStore } from '@/src/store'
import DropDownMenu from './DropDownMenu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import PopOverNotification from './ui/PopOverNotification'
import socket from '@/src/lib/socket'
import { FriendOnline, FriendsOnlineId } from '@/src/types'

export default function Header() {
  const userData = useStore((state) => state.userData)
  const token = useStore((state) => state.token)
  const setToken = useStore((state) => state.setToken)
  const getUserData = useStore((state) => state.getUserData)
  const userId = useStore((state) => state.userData.id)
  const friends = useStore((state) => state.userData.friends)
  const updateOnlineFriends = useStore((state) => state.updateOnlineFriends)
  const updateUserDisconnected = useStore((state) => state.updateUserDisconnected)
  const updateUserConnected = useStore((state) => state.updateUserConnected)
  const router = useRouter()
  const friendsId = friends.map(friend => friend.id)
  
  // ------------------------//---------- Websockets ---------------//------------
  useEffect(() => {
    // Verificamos si ya cargo el server de Next
    if (typeof window !== "undefined") {
      // Ejcutamos sockets
      if(userId) {
        socket.connect() // Si encuentra un user conectamos el socket
        
        socket.emit('register-user', {userId, friendsId}) // Registrar usuario conectado
      }
      if(!userId) {
        socket.disconnect()
      }
      socket.on('update-notifications', () => {
        getUserData()
      })
      socket.on('friends-online', (friendsOnline:FriendsOnlineId) => {
        updateOnlineFriends(friendsOnline)
      })
      socket.on('friend-connected', (friendId:FriendOnline['id']) => {
        updateUserConnected(friendId)
      })
      socket.on('friend-disconnected', (userDisconnected:FriendOnline['id']) => {
        updateUserDisconnected(userDisconnected)
      })
    }
  }, [userId])
  
    // ------ Check exists a session saved ----------
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
    <header className="grid grid-cols-2 bg-slate-800 items-center p-4 justify-between">
            <Link href={'/dashboard'}>
              <h1 className="ml-80 text-4xl font-black text-white text-shadow-lg hover:scale-101 transition shadow-lg shadow-white/10 w-fit rounded-lg">Chat App NextJs</h1>
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
