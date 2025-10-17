'use client'
import { useEffect, useState } from "react";
import FoundUsers from "./FoundUsers";
import api from "@/src/lib/axios";
import { UserData } from "@/src/types";
import { usersDataSchema } from "@/src/schema-zod";

export default function UserSearch() {
    const [query, setQuery] = useState<string>('')
    const [users, setUsers] = useState<UserData[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const {data} = await api.get(`/add-contact/api?query=${query}`)
                const result = usersDataSchema.safeParse(data)
                if(result.success) {
                    setUsers(result.data)
                }
            } catch (error) {
                console.log('There was an error fetching the users')
            }
        }
        if(query.length) {
          fetchUsers()
        } 
    }, [query])

  return (
    <div className='bg-white w-3xl rounded-xl h-135 shadow-md'>
        <p className="font-black text-4xl text-center mt-2">
          Encuentra a tu <span className="text-indigo-800">Contacto</span>
        </p>

        <form 
        >
          <div className='flex justify-center gap-3 mt-5'>
            <label 
              htmlFor="querySearch" 
              className='font-bold text-2xl'
            >Email o Nombre:</label>
            <input
              id='querySearch'
              type="text"
              placeholder='Escribe el "Email" o "Nombre" de tu contacto para encontrarlo'
              className='outline-none p-2 shadow-md w-100'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </form>

          <div className="flex justify-center mt-5 w-auto">
                <FoundUsers
                    users={users}
                />
          </div>
      </div>
  )
}
