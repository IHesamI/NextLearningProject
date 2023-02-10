import { Stack, Button, Typography } from "@mui/material"
// import { Context } from "react";

import { PrismaClient } from "@prisma/client"

export async function getServerSideProps(context: any) {
    const id = parseInt(context.params.id);
    const prisma = new PrismaClient();
    const project = await prisma.project.findFirst(
        {
            where: {
                id: id
            }
        });
    return {
        props: { ...project }
    };
}

interface project {
    id: number;
    title: string;
};


export default function Project({ id, title }: project) {

    return (
        <Stack direction={'row'} style={{ justifyContent: 'space-evenly' }}>
            <Typography>{id}</Typography>
            <Typography>{title}</Typography>
            <Button
                href={`/project/${id}`}
                variant={'contained'}
            > Go </Button>
        </Stack>
    )
}
