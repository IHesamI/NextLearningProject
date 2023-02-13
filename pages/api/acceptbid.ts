import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,) {
    if (req.method == "POST") {

        const prisma = new PrismaClient();
        await prisma.project.update(
            {
                where: {
                    id: req.body.projectid
                },
                data: {
                    choosenproposeid: req.body.proposeid
                }
            })
        return res.status(200).json({ 'message': 'freelancer accepted' })
    }
}