import { prisma } from "@/src/prisma-connection/prisma";
import jwt from 'jsonwebtoken'

// FIND FRIENDS LIST FROM USER
export async function GET(req:Request) {
    const bearer = req.headers.get('authorization')
    if(!bearer || !bearer.startsWith('Bearer')) {
        return Response.json({errors: 'Invalid Token'}, {status: 401})
    }

    const token = bearer.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        if(typeof decoded === 'object' && decoded.id) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                }, 
                select: {
                    friends: true
                }
            })
            return Response.json(user)
        } else {
            return Response.json({errors: 'Invalid Token'}, {status: 401})
        }
    } catch (error) {
        console.log(`There was an error validating the token: ${error}`)
        return Response.json({errors: 'Invalid Token'}, {status: 401})
    }
}