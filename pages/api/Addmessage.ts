import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,) {
    if (req.method = "POST") {

        const prisma = new PrismaClient();

        const { content, projectid, user } = req.body

        await prisma.chatmessages.create(
            {
                data: {
                    content: content,
                    projectid: projectid,
                    user: user,
                }
            }
        )
        res.status(200).json({ 'message': 'message saved successfully' })
    }
}
