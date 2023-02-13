import { Stack, Typography, Button } from "@mui/material";
import { handleacceptfunc } from './[projectid]';
export default function BidCompo({ id, title, username, freelancerid, handelaccept }: { id: number, title: string, username: string, freelancerid: number, handelaccept?: handleacceptfunc, }) {
    return (
        <Stack direction={'row'} style={{ justifyContent: 'space-evenly' }}>
            <Typography>{username}</Typography>
            <Typography>{freelancerid}</Typography>
            <Typography>{title}</Typography>
            {
                handelaccept ?
                    <Button color={'success'}
                        variant={'contained'}
                        onClick={() => { handelaccept(id) }}>
                        accept
                    </Button>
                    :
                    <></>
            }

        </Stack>
    )

}