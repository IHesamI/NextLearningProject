import BidCompo from "@/pages/employee/project/bidcomponent";
import { Stack, Typography, Button } from "@mui/material";
import { PrismaClient } from "@prisma/client";
export async function getServerSideProps(context: any) {
    const projectid = parseInt(context.params.id);
    const freelancerid = parseInt(context.params.freelancerid);

    const prisma = new PrismaClient();
    const project_with_messages = await prisma.project.findFirst({
        where: {
            id: projectid
        },
        select: {
            title: true,
            id: true,
            propose: {
                where: {
                    freelancerid: freelancerid
                },
                select: {
                    title: true,
                    freelancer: {
                        select: {
                            username: true
                        }
                    }
                }
            },
            chatmessages: true
        }
    })

    return {
        props: { freelancerid: freelancerid, ...project_with_messages, }
    }
}


interface props {
    freelancerid: number;
    id: number;
    title: string;
    propose: { title: string, freelancer: { username: string } }[];
    chatmessages?: object[];
}

export default function home({ freelancerid, id, title, propose, chatmessages }: props) {
    return (
        <Stack>
            <Stack >
                <title>{title}</title>
                <Stack
                    direction={'row'} style={{ justifyContent: 'space-evenly' }}>
                    <Typography>{id}</Typography>
                    <Typography>{title}</Typography>
                </Stack>
                    <BidCompo id={id} title={propose[0].title} username={propose[0].freelancer.username} freelancerid={freelancerid} />
            </Stack>
        </Stack>
    )
}