import { UsersFoundInSearch } from "@/src/types"
import User from "./User"

type FoundUsersProps = {
  users: UsersFoundInSearch
}

export default function FoundUsers({users}:FoundUsersProps) {
  return (
    <>
        {users.length ? (
          <ul className="flex flex-col gap-1 h-95 overflow-y-scroll p-1 shadow-xl">
            {users.map((user) => (
                <User
                  key={user.email}
                  user={user}
                />
            ))}
          </ul>
        ) : (
          <p className="font-bold text-2xl text-slate-600 mt-10">No se encontraron usuarios similares</p>
        )}
    </>
  )
}
