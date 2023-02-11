import { Box, Stack, Button, Typography, Popover, TextField } from "@mui/material"
import { useRef, useState } from "react";

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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const Descref = useRef<null | HTMLInputElement>(null)

    const sendBid = (): void => {
        if (Descref.current?.value != null) {
            const proposetitle = Descref.current?.value
            fetch('/api/createbid', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(
                    {
                        title: proposetitle,
                        freelancerid: 2,
                        projecid: id,
                    }
                )
            }).then(response => response.json())

            setAnchorEl(null)
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popper' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Stack direction={'row'} style={{ justifyContent: 'space-evenly' }}>
            <title>{title}</title>
            <Typography>{id}</Typography>
            <Typography>{title}</Typography>
            <Button
                // href={`/project/${id}`}
                variant={'contained'}
                onClick={handleClick}
            > Bid </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorReference={'anchorPosition'}
                anchorPosition={{ top: 250, left: 650 }}>

                <Stack sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <TextField
                        inputRef={Descref} />
                    <Button

                        onClick={sendBid}>Send</Button>
                </Stack>
            </Popover>
        </Stack>
    )
}
