import { Box, Stack, Button, Typography, Popover, TextField } from "@mui/material"
// import { useRef, useState } from "react";
import { PrismaClient } from "@prisma/client"
import BidCompo from "./bidcomponent";

export async function getServerSideProps(context: any) {
    const id = parseInt(context.params.projectid);
    const prisma = new PrismaClient();
    const project = await prisma.project.findFirst(
        {
            where: {
                id: id
            },
            include: {
                propose: {
                    include: {
                        freelancer: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        });

    await prisma.project.update(
        {
            where: {
                id: id,
            },
            data: {
                propose: {
                    updateMany: {
                        where: {
                            seenstatus: false
                        },
                        data: {
                            seenstatus: true,
                        }
                    }
                }
            }
        });
    return {
        props: { ...project }
    };

}

export interface prop {
    projectid: number,
    id: number,
    title: string,
    freelancerid: number,
    freelancer: {username:string},
}

interface project {
    id: number;
    title: string;
    propose: prop[];
};


export default function Project({ id, title, propose }: project) {
    return (
        <Stack >
            <title>{title}</title>
            <Stack
                direction={'row'} style={{ justifyContent: 'space-evenly' }}>
                <Typography>{id}</Typography>
                <Typography>{title}</Typography>
            </Stack>
            <Stack>
                {propose.map((pro) => (<BidCompo key={pro.id} id={pro.id} title={pro.title} username={pro.freelancer.username} />))}
            </Stack>

        </Stack>
    )
}
