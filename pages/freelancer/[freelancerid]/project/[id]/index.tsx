import BidCompo from "@/pages/employee/project/bidcomponent";
import Chatcompo from "@/utils/ChatComponents";
import { Stack, Typography, Button } from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { chatmessage } from "@/utils/interfaces";
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
            chatmessages: {
                select: {
                    content: true,
                    user: true,
                    created: true,
                }
            }
        }
    })

    // return {
    //     props: { freelancerid: freelancerid, ...project_with_messages }
    // };
    
    return {
        props: JSON.parse(JSON.stringify({ freelancerid: freelancerid, ...project_with_messages }))
    }

}


interface props {
    freelancerid: number;
    id: number;
    title: string;
    propose: { title: string, freelancer: { username: string } }[];
    chatmessages?: chatmessage[];
}

export default function home({ freelancerid, id, title, propose, chatmessages }: props) {
    console.log(chatmessages)
    const sendMessage = async (payam: string, user: string) => {
        await fetch('/api/Addmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: payam,
                projectid: id,
                user: user
            })
        })

    }

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
                <Chatcompo chats={chatmessages} sendMessage={sendMessage} user={'f'} />
            </Stack>
        </Stack>
    )
}