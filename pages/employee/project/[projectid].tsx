import { Box, Stack, Button, Typography, Popover, TextField } from "@mui/material"
// import { useRef, useState } from "react";
import { PrismaClient } from "@prisma/client"
import BidCompo from "./bidcomponent";
import Chatcompo from "@/utils/ChatComponents";
import { project } from "@/utils/interfaces";


export async function getServerSideProps(context: any) {
    const id = parseInt(context.params.projectid);
    const prisma = new PrismaClient();
    let project;
    const project_status = await prisma.project.findFirst(
        {
            where: {
                id: id
            },
            select: {
                choosenproposeid: true,
            }
        }
    )
    if (project_status?.choosenproposeid == null) {
        project = await prisma.project.findFirst(
            {
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true,
                    propose: {
                        include: {
                            freelancer: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    }
                },
            }
        );

    }
    else {
        project = await prisma.project.findFirst(
            {
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true,
                    choosenproposeid: true,
                    propose: {
                        where: {
                            id: project_status?.choosenproposeid
                        },
                        include: {
                            freelancer: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    },
                    chatmessages: {
                        where: {
                            projectid: id
                        },
                        select: {
                            content: true,
                            user: true,
                            created:true
                        }

                    }
                },
            }
        );
    }

    await prisma.propose.updateMany({
        where: {
            projecid: id
        },
        data: {
            seenstatus: true
        }
    });
    return {
        props: JSON.parse(JSON.stringify({ ...project }))
    }
}


export type handleacceptfunc = (proposeid: number) => void

export default function Project({ id, title, propose, chatmessages, choosenproposeid }: project) {
    // export default function Project(project:any) {
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


    const handleaccept: handleacceptfunc = async (proposeid: number) => {
        // todo
        await fetch('/api/acceptbid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                proposeid: proposeid,
                projectid: id
            })
        }).then(response => response.json()).then(message => console.log(message))

    }

    return (
        <Stack >
            <title>{title}</title>
            <Stack
                direction={'row'} style={{ justifyContent: 'space-evenly' }}>
                <Typography>{id}</Typography>
                <Typography>{title}</Typography>
            </Stack>
            {choosenproposeid == undefined ?
                <Stack>
                    {propose.map((pro) => (<BidCompo key={pro.id} id={pro.id} title={pro.title} username={pro.freelancer.username} freelancerid={pro.freelancerid} handelaccept={handleaccept} />))}
                </Stack>
                :
                <>
                    <BidCompo

                        key={propose[0].id} id={propose[0].id} title={propose[0].title} username={propose[0].freelancer.username} freelancerid={propose[0].freelancerid} />
                    <Chatcompo
                        // chats={chats}
                        sendMessage={sendMessage}
                        chats={chatmessages}
                        user={'e'}

                    />
                </>
            }
        </Stack>
    )
}
