import { Button, Stack, Typography } from "@mui/material"


export default function Project({id, title }: {id:number, title: string }) {
    return (
        <Stack direction={'row'} style={{justifyContent:'space-evenly'}}>
            <Typography>{id}</Typography>
            <Typography>{title}</Typography>
            <Button
            href={`/project/${id}`}
            //  variant={'contained'}
            >Go </Button>
        </Stack>
    )
}
