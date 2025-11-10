import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
   ArchiveBoxXMarkIcon,
   ChevronDownIcon,
   PencilIcon,
   Square2StackIcon,
   AdjustmentsHorizontalIcon,
   ArrowLeftEndOnRectangleIcon,
   PencilSquareIcon,
   TrashIcon,
   BellAlertIcon,
   BellIcon,
} from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useStore } from '@/src/store'
import { useEffect, useState } from 'react'
import RequestsNotification from '../users/RequestsNotification'

export default function PopOverNotification() {
   const [existsNotifications, setExistsNotifications] = useState(false)

   const requestsReceived = useStore((state) => state.userData.requestsReceived)

   useEffect(() => {
      if (requestsReceived.length) {
         setExistsNotifications(true)
      } else {
         setExistsNotifications(false)
      }
   }, [requestsReceived])

   return (
      <div className="">
         <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-m px-3 py-2 text-sm/6 font-semibold text-white shadow-lg rounded-2xl border-slate-700 shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 cursor-pointer transition-all">
               {existsNotifications ? (
                  <BellAlertIcon className='text-lime-300 w-7 cursor-pointer hover:scale-120 transition-all duration-200' />
               ) : (
                  <BellIcon className='text-white w-7 cursor-pointer hover:scale-120 transition-all duration-200' />
               )}
            </MenuButton>

            <MenuItems
               transition
               anchor="bottom end"
               className="w-100 origin-top-right rounded-xl bg-slate-700 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
               <div className="h-px bg-white/5" />
               <div className="pb-4">
                     {requestsReceived.length ? (
                        <ul>
                           {requestsReceived.map(request => (
                              <RequestsNotification
                                 key={request.id}
                                 request={request}
                              />
                           ))}
                        </ul>
                     ) : (
                        <p className='text-white text-lg mt-2 text-center'>Por el momento no tienes notificaciones</p>
                     )}
                  </div>
            </MenuItems>
         </Menu>
      </div>
   )
}
