import { Stack, Typography, Button } from "@mui/material";
export default function BidCompo({ id, title, username }: { id: number, title: string, username: string }) {
    return (
        <Stack direction={'row'} style={{ justifyContent: 'space-evenly' }}>
            <Typography>{username}</Typography>
            {/* <Typography>{id}</Typography> */}
            <Typography>{title}</Typography>
            <Button color={'success'}
                variant={'contained'}>
                accept
            </Button>

        </Stack>
    )

}