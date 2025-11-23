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
} from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useStore } from '@/src/store'
import { useRouter } from 'next/navigation'

export default function DropDownMenu() {
  const logOut = useStore((state) => state.logOut)
  const router = useRouter()

  const handleLogOut = () => {
    logOut()
    router.push('/')
  }

  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm/6 font-semibold text-white shadow-lg border-slate-700 shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 cursor-pointer transition-all">
          <Image
            src={'/profile.jpg'}
            alt="Profile Picture"
            width={40}
            height={40}
          />
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-40 pb-4 origin-top-right rounded-xl bg-slate-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="transition group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
              <PencilSquareIcon className="size-6 fill-white/30" />
              Edit Profile
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline"></kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="transition group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer">
              <AdjustmentsHorizontalIcon className="size-6 fill-white/30" />
              Change Color
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline"></kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button 
              className="transition group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer"
              onClick={handleLogOut}
            >
              <ArrowLeftEndOnRectangleIcon className="size-6 fill-white/30" />
              Log Out
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline"></kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
