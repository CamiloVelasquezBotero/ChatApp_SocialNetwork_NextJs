'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import OnlineUsers from "@/components/OnlineUsers";
import { useStore } from "@/src/store";
import io from "socket.io-client";

export default function DashBoard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  const userData = useStore((state) => state.userData)
  

  if(userData.email) return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col w-full">
          <OnlineUsers />

          <div className="flex mx-auto gap-20 mt-3 items-center">
            <button>
              <MagnifyingGlassIcon
                className="rounded-full shadow-xl size-13 text-cyan-900 hover:text-cyan-800 hover:scale-102 transition cursor-pointer"
                onClick={() => router.push('/add-contact')}
              />
            </button>
            <button 
              className="shadow-2xl text-shadow-2xl p-2.5 transition-all bg-cyan-900 hover:bg-cyan-800 hover:scale-101 text-white font-bold text-xl rounded-xl cursor-pointer"
              onClick={() => router.push('/contact-list')}
            >Ver Contactos</button>
          </div>
        </div>

        <div className="flex items-center">
          {isChatOpen ? (
            <div>chat</div>
          ) : (
            <p className="font-black text-5xl text-center mx-5 hover:text-slate-700 transition-all text-shadow-lg">
              Empieza Eligiendo un <span className="text-indigo-800 hover:text-indigo-700">Contacto en linea</span> en linea para <span className="text-indigo-800 hover:text-indigo-700">Chatear</span>
            </p>
          )}
        </div>
      </div>
    </>
  )
}
