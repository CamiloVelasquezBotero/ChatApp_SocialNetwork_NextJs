'use client'
import React from 'react'
import OnlineUserInfo from './ui/OnlineFriendInfo'
import { useStore } from '@/src/store'

export default function OnlineUsers() {
    const friendsOnline = useStore((state) => state.friendsOnline)

    return (
        <div>
            <ul className="flex gap-2 flex-col items-center px-auto bg-white w-100 h-100 rounded-xl m-auto mt-10 overflow-y-auto shadow-md" >
                <h2 className="font-black text-center mt-5 text-2xl gap-2 mb-5 text-shadow-md">Tus Contactos Conectados</h2>
                {friendsOnline.map(friendInfo => (
                    <OnlineUserInfo
                        key={friendInfo.id}
                        friendInfo={friendInfo}
                    />
                ))}
            </ul>
        </div>
    )
}
