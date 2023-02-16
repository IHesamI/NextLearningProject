import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleCreateBid(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const prisma = new PrismaClient();
        const { title, freelancerid, projecid } = req.body
        const pro = await prisma.propose.create(
            {
                data: {
                    title: title,
                    freelancerid: freelancerid,
                    projecid: projecid,
                }
            }
        )
        return res.status(200).json({ 'message': 'Bid successfully applied' })
    }

}