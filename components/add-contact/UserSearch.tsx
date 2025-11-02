'use client'
import { useEffect, useState } from "react";
import FoundUsers from "./FoundUsers";
import api from "@/src/lib/axios";
import { UserData, UsersFoundInSearch } from "@/src/types";
import { usersFoundInSearch } from "@/src/schema-zod";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";

export default function UserSearch() {
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState<string>('')
    const [users, setUsers] = useState<UsersFoundInSearch>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true) // Activamos spinner
                const {data} = await api.get(`/add-contact/api?query=${query}`)
                console.log(data)
                const result = usersFoundInSearch.safeParse(data)
                if(!result.success) {
                  return toast.error("There was an error in the search")
                }
                // Mostramos los usuarios
                setUsers(result.data)
                setIsLoading(false) // Spinner off
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
            {isLoading ? (
              <Spinner />
            ): (
              <FoundUsers
                  users={users}
              />
            )}
          </div>
      </div>
  )
}
