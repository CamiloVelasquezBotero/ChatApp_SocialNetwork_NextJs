import { prisma } from "@/src/prisma-connection/prisma";

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    console.log(query)
}