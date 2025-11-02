'use server'
import { prisma } from "@/src/prisma-connection/prisma";
import { dataSendRequest } from "@/src/schema-zod";

export async function sendFriendRequestAction(data:unknown) {
    const result = dataSendRequest.safeParse(data)
    if(!result.success) {
        return {errors: 'There was an error adding the user, please contact support'}
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: { id: result.data.userId },
            select: { id: true, requestsReceived: true }
        })
        if(!userExists) {
            return {errors: 'There was an error adding the user, please contact support'}
        }
        const alreadyExists = userExists.requestsReceived.some(request => request.id == result.data.currentUserid)
        if(alreadyExists) {
            return {errors: 'The friend request has already been sent', exists: true}
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