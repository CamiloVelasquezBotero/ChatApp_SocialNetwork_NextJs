import { FriendOnline } from '@/src/types'
import { LightBulbIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import React from 'react'

type OnlineFriendInfoProps = {
    friendInfo: FriendOnline
}

export default function OnlineFriendInfo({ friendInfo }:OnlineFriendInfoProps) {

    return (
        <li className="w-60 p-2 bg-slate-300 rounded-full shadow-lg">
            <div className="flex gap-5 items-center justify-center">
                <LightBulbIcon className="size-5  text-green-400" />
                <p className="text-xl font-bold">{friendInfo.name}</p>
                <Image
                    src={'/pruebaUser.jpg'}
                    width={40}
                    height={40}
                    alt="User Image"
                    className="rounded-full"
                />
            </div>
        </li>
    )
}
