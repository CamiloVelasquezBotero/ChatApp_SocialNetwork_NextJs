import { useStore } from '@/src/store'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BellIcon, BellAlertIcon, } from '@heroicons/react/16/solid'
import RequestsNotification from '../users/RequestsNotification'
import { useEffect, useState } from 'react'

export default function PopOverNotification() {
  const [existsNotifications, setExistsNotifications] = useState(false)

  const requestsReceived = useStore((state) => state.userData.requestsReceived)
  
  useEffect(() => {
    if(requestsReceived.length) {
      setExistsNotifications(true)
    } else {
      setExistsNotifications(false)
    }
  }, [requestsReceived])

  return (
    <div className="flex justify-center">
      <div className="flex gap-8">
        <Popover>
          <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
            {existsNotifications ? (
              <BellAlertIcon className='text-white w-7 cursor-pointer hover:w-8 transition' />
            ) : (
              <BellIcon className='text-white w-7 cursor-pointer hover:w-8 transition' />
            )}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 rounded-xl bg-slate-700 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
          >
            <div className="p-3">
              {requestsReceived.length ? (
                <ul>
                    {requestsReceived.map(request => (
                        <RequestsNotification 
                            key={request.id}
                            request={request} 
                        />
                    ))}
                </ul>
              ): (
                <p className='text-white text-lg '>Por el momento no tienes notificaciones</p>
              )}
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  )
}
