import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
// interface project {
//     id: number;
//     title: string;
// }

export default async function createHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // console.log(req.method);
    if (req.method == 'POST') {
        // console.log(req.body)
        const prisma = new PrismaClient();
        const pro = await prisma.project.create(
            {
                data: {
                    employeeid: req.body.id,
                    title: req.body.title,
                }
            }
        )
            prisma.$disconnect();
        // console.log(pro)

        return res.status(200).json({ "message": "project created" });
    }
}