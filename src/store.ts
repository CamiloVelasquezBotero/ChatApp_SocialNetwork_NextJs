import { create } from 'zustand'
import { UserData, UserId } from './types'
import api from './lib/axios'
import { userDataSchema, userIdSchema } from './schema-zod'
import { toast } from 'react-toastify'
import { addUser } from '@/actions/addUserAction'

const initialValues = {
    token: '',
    userData: {
        id: 0,
        name: '',
        email: ''
    }
}

interface Store {
    token: string
    userData: UserData,

    setToken: (token: string) => void,
    getUserData: () => void,
    logOut: () => void,
    sendFriendRequest: (id: UserId) => void,
    getContacts: () => {}
}

export const useStore = create<Store>((set, get) => ({
    token: initialValues.token,
    userData: initialValues.userData,

    setToken: (token) => {
        set(() => ({
            token: token
        }))
    },
    getUserData: async () => {
        const token = get().token
        try {
            const url = '/dashboard/api'
            const { data } = await api.get(url, { headers: { Authorization: `Bearer ${token}` } })
            const result = userDataSchema.safeParse(data)
            if (result.success) {
                set(() => ({
                    userData: {
                        id: result.data.id,
                        name: result.data.name,
                        email: result.data.email,
                    }
                }))
            }
        } catch (error) {
            console.log('There was an error getting user Data', error)
        }
    },

    logOut: () => {
        localStorage.removeItem('token')
        set(() => ({
            token: initialValues.token,
            userData: initialValues.userData
        }))
    },

    sendFriendRequest: async (id) => {
        const result = userIdSchema.safeParse(id)
        if (!result.success) {
            toast.error('There was an error sending the request, please contact support')
        }

        const data = { userId: id, currentUserid: get().userData.id }
        try {
            const response = await addUser(data)
            if (response?.errors) {
                toast.error(response.errors)
                return
            }

            toast.success('Friend Request sent successfully')
        } catch (error) {
            console.log('There was an error trying to send friend request: ' + error)
        }
    },

    getContacts: async () => {
        const url = `/contact-list/api?query=${get().userData.id}`
        const response = await api.get(url, { headers: { Authorization: `Bearer ${get().token}`} } )
        console.log(response)
    }
}))