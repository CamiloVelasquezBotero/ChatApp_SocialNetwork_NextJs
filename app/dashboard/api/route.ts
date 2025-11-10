'use server'
import { prisma } from '@/src/prisma-connection/prisma';
import jwt from 'jsonwebtoken'

// GET GET USERDATA
export async function GET(req:Request) {
    const bearer = req.headers.get("authorization");
    if(!bearer || !bearer.startsWith('Bearer')) {
        return Response.json({error: 'Invalid Token'}, {status: 401})
    }

    const token = bearer.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        if(typeof decoded === 'object' && decoded.id) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
                include: {
                    friends: { select: {id: true, name: true, email: true} },
                    requestsSent: {
                        select: {id:true, name:true, email:true}
                    },
                    requestsReceived: {
                        select: {id:true, name:true, email:true}
                    },
                }
            })
            return Response.json(user, {status: 200})
        } else {
            return Response.json({error: 'Invalid Token'}, {status: 401})
        }
    } catch (error) {
        console.log('There was an error validating the Token', error)
        return Response.json({error: 'Invalid Token'}, {status: 401})
    }
}

// PATCH - Aceptar, Rechazar solicitud de amistad
export async function PATCH(req: Request) {
    const bearer = req.headers.get("authorization");
    if (!bearer || !bearer.startsWith('Bearer')) {
        return Response.json({ error: 'Invalid Token' }, { status: 401 });
    }
    
    const token = bearer.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        if (typeof decoded !== 'object' || !decoded.id) {
            return Response.json({ error: 'Invalid Token' }, { status: 401 });
        }
        
        const userId = +decoded.id;
        const body = await req.json();
        const idSender = +body.idSender;
        const action = body.action;

        if (!idSender) {
            return Response.json({ error: 'idSender is required' }, { status: 400 });
        }

        try {
            if(action === 'accept') {
                // ACCEPT REQUEST AND UPDATE THE FRIENDS
                const user = await prisma.user.update({
                    where: {id : userId},
                    data:{
                        friends: { connect: {id: idSender}},
                        requestsReceived: { disconnect: { id: idSender} }
                    },
                    select: {
                        friends: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            }
                        },
                        requestsReceived: {select: {id:true, name:true, email:true}}
                    }
                })
                await prisma.user.update({
                    where: {id: idSender},
                    data: {
                        friends: {connect: {id: userId}},
                        requestsSent: {disconnect: {id: userId}}
                    }
                })
                return Response.json({ message: 'Friend request accepted', user }, { status: 200 });
            } else {
                // DECLINE REQUEST AND REMOVE TE REQUEST
                const user = await prisma.user.update({
                    where: {id: userId},
                    data: {
                        requestsReceived: {disconnect: {id: idSender}}
                    },
                    select: {
                        requestsReceived:{
                            select: {id:true, name:true, email:true}
                        }
                    }
                })
                // Remove te requestSent  from the idSender
                await prisma.user.update({
                    where: {id: idSender},
                    data: {
                        requestsSent: {disconnect: {id: userId}}
                    }
                })
                return Response.json({ message: 'Rejected Request Sucessfully', user}, { status: 200 });
            }
        } catch (dbError) {
            console.log('Error accepting friend request', dbError);
            return Response.json({ error: 'Could not accept request' }, { status: 500 });
        }
    } catch (error) {
        console.log('There was an error accepting te friend request', error);
        return Response.json({ error: 'There was an error' }, { status: 401 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const queryFriendId = Number(searchParams.get('friendId'))
    if(!queryFriendId) return Response.json({error: '¡FriendId no encontrada!'}, {status:400})
    const bearer = req.headers.get('authorization')
    
    if(!bearer || !bearer.startsWith('Bearer')) {
        return Response.json({error: 'Invalid Token'}, {status: 401})
    }

   const token = bearer.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        if(typeof decoded !== 'object' || !decoded.id) {
            return Response.json({error: 'Invalid Token'}, {status: 401})
        }
        const userId = Number(decoded.id)

        // Verificar existencia
        const existsFriend = await prisma.user.findUnique({
            where: { id: userId},
            select: { 
                friends: { 
                    where: { id: queryFriendId },
                    select: { id: true } // Solo el id por seguridad
                }
            }
        })
        if(!existsFriend || existsFriend.friends.length === 0) {
            return Response.json({error: 'Amigo no encontrado'}, {status: 401})
        }
        
        // Si pasa atualizamos amigos...
        const user = await prisma.user.update({
            where: {id: userId},
            data: {
                friends: {disconnect: {id: queryFriendId}}
            },
            select: {
                friends:true
            }
        })
        await prisma.user.update({
            where: {id: queryFriendId},
            data:{
                friends: {disconnect: {id: userId}}
            }
        })

        return Response.json({message: 'Friend Removed Successfully', user}, {status: 200})
    } catch (error) {
        console.log(`There was an error removing the Request: ${error}`)
    }
} 