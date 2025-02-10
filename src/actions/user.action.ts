"use server";

import { currentUser, auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUser() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if(!user || !userId) return;
        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        })
        if(existingUser) return existingUser;
        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ''} ${user.lastName || ''}`,
                username: user.username || user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl
            }
        })
        return dbUser;
    } catch (err) {
        console.log("Error in syncUser ", err)
    }
}

export async function getUserByClerkId (clerkId: string) {
    return prisma.user.findUnique({
        where: {
            clerkId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true
                }
            }
        }
    })
}
