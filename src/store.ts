import { create } from 'zustand';
import { AcceptRequest, FriendOnline, FriendsOnline, FriendsOnlineId, UserData } from './types';
import api from './lib/axios';
import { acceptRequestSchema, rejectRequestSchema, removeFriendSchema, userDataSchema, userIdSchema } from './schema-zod';
import { toast } from 'react-toastify';
import { sendFriendRequestAction } from '@/actions/sendFriendRequestAction';
import socket from './lib/socket';

const initialValues = {
    token: '',
    userData: {
        id: 0,
        name: '',
        email: '',
        friends: [],
        requestsSent: [],
        requestsReceived: []
    },
    friendsOnline: []
}

interface Store {
    token: string,
    userData: UserData,
    friendsOnline: FriendsOnline,

    setToken: (token:string) => void,
    getUserData: () => void,
    logOut: () => void,
    sendFriendRequest: (id:UserData['id']) => void,
    acceptRequest: (dataRequest:AcceptRequest) => void,
    removeFriend: (friendId:UserData['id']) => void,
    updateOnlineFriends: (friendsOnline:FriendsOnlineId) => void,
    updateUserDisconnected: (friendId:FriendOnline['id']) => void,
    updateUserConnected: (friendId:FriendOnline['id']) => void,
}

export const useStore = create<Store>((set, get) => ({
    token: initialValues.token,
    userData: initialValues.userData,
    friendsOnline: initialValues.friendsOnline,

    setToken: (token) => {
        set(() => ({
            token: token
        }))
    },
    getUserData: async () => {
        const token = get().token
        const url = '/dashboard/api'
        try {
            const { data } = await api.get(url, { headers: { Authorization: `Bearer ${token}` } })
            const result = userDataSchema.safeParse(data)
            if(result.success) {
                set(() => ({
                    userData: {
                        id: result.data.id,
                        name: result.data.name,
                        email: result.data.email,
                        friends: result.data.friends,
                        requestsSent: result.data.requestsSent,
                        requestsReceived: result.data.requestsReceived,
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
        const currentUserid = get().userData.id
        const result = userIdSchema.safeParse(id)
        if (!result.success) {
            toast.error('There was an error sending the request, please contact support')
        }

        const data = { userId: id, currentUserid }
        try {
            const response = await sendFriendRequestAction(data)
            if (response?.errors) {
                toast.error(response.errors)
                return false
            }
            toast.success('Friend Request sent successfully')
            socket.emit('friend-request-sent', {idReceiver: id})
        } catch (error) {
            console.log('There was an error trying to send friend request: ' + error)
        }
    },

    acceptRequest: async (dataRequest) => {
        const token = get().token
        const url = '/dashboard/api'
        try {
            const { data } = await api.patch(url, dataRequest, {headers: {Authorization: `Bearer ${token}`}})
            if(dataRequest.action === 'accept') {
                // ACCEPT
                const result = acceptRequestSchema.safeParse(data)
                if(!result.success) {
                    toast.error('There was an error')
                    return
                }
    
                // Actualizar Store
                set((state) => ({
                    userData: {
                        ...state.userData,
                        friends: result.data?.user.friends,
                        requestsReceived: result.data?.user.requestsReceived
                    }
                }))
                toast.success(result.data.message)
            } else {
                // DECLINE
                const result = rejectRequestSchema.safeParse(data)
                if(!result.success) {
                    toast.error('There was an error')
                    return
                }
                // Actualizar Store
                set((state) => ({
                    userData: {
                        ...state.userData,
                        requestsReceived: result.data?.user.requestsReceived
                    }
                }))
                toast.success(result.data.message)
            }
        } catch (error) {
            console.log(`There was an error accepting the request: ${error}`)
            /* toast.error() */
        }
    },

    removeFriend: async (friendId) => {
        const token = get().token
        const url = `/dashboard/api?friendId=${friendId}`

        try {
            const { data } = await api.delete(url, {headers: {Authorization: `Bearer ${token}`}})
            const result = removeFriendSchema.safeParse(data)
            if(!result.success) {
                toast.error('There was an error')
                return
            }

            // Actualizar Store
            set((state) => ({
                userData: {
                    ...state.userData,
                    friends: result.data?.user.friends
                }
            }))
            toast.success(result.data.message)
        } catch (error) {
            console.log(`There was an error removing the friend: ${error}`)
            toast.error('There was an error')
        }
    },

    updateOnlineFriends: (friendsOnline) => {
        const friends = get().userData.friends
        const dataFriendsOnline = friends.filter(friend => friendsOnline.includes(friend.id))

        set(() => ({
            friendsOnline: dataFriendsOnline
        }))
    },

    updateUserDisconnected: (friendId) => {
        const friendsOnline = get().friendsOnline
        const friendsOnlineUpdated = friendsOnline.filter(friend => friend.id !== friendId)
        set(() => ({
            friendsOnline: friendsOnlineUpdated
        }))
    },

    updateUserConnected: (friendId) => {
        const friends = get().userData.friends
        const friendsOnline = get().friendsOnline
        const friendconnected = friends.find(friend => friend.id === friendId)
        
        if(friendconnected) {
            const existsFriendConnected = friendsOnline.find(friend => friend.id === friendconnected.id)
            if(!existsFriendConnected) {
                const friendsOnlineUpdated = [...friendsOnline, friendconnected]
                set(() => ({
                    friendsOnline: friendsOnlineUpdated
                }))
            }
        }
    }
}))