'use server'
import { prisma } from "@/src/prisma-connection/prisma";
import { dataSendRequest } from "@/src/schema-zod";

export async function sendFriendRequestAction(data:unknown) {
    const result = dataSendRequest.safeParse(data)
    if(!result.success) {
        return {errors: 'Hubo un error enviando la solicitud, por favor contacta a soporte'}
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: { id: result.data.userId },
            select: { id:true, requestsReceived:true, friends:true },
        })
        if(!userExists) {
            return {errors: 'Hubo un error enviando la solicitud, por favor contacta a soporte'}
        }
        const alreadyFriends = userExists.friends.some(friend => friend.id === result.data.currentUserid)
        if(alreadyFriends) {
            return {errors: 'Este usuario ya esta en tu lista de amigos'}
        }
        const alreadyExists = userExists.requestsReceived.some(request => request.id === result.data.currentUserid)
        if(alreadyExists) {
            return {errors: 'Solicitud de amistad enviada'}
        }
        
        // Adding user
        await prisma.user.update({
            where: {
                id: userExists.id,
            },
            data: {
                requestsReceived: {
                    connect: {id: result.data.currentUserid}
                }   
            }
        })
    } catch (error) {
        console.log(`There was an error trying to add the user: ${error}`)
    }
}