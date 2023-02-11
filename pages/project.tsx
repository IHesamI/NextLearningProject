import { Button, Stack, Typography, Badge } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail'
import { prop } from '.'
export default function Project({ id, title, propose }: { id: number, title: string, propose?: prop[] }) {

    return (
        <Stack direction={'row'} style={{ justifyContent: 'space-evenly' }}>
            <Typography>{id}</Typography>
            <Typography>{title}</Typography>
            <Button
                href={propose?.length== 0 ? `/project/${id}` : `/employee/project/${id}`}
            //  variant={'contained'}
            >Go </Button>
            {
                propose?.length ? <>
                    <Badge badgeContent={propose.filter(pro => pro.seenstatus == false).length} color={'primary'}>
                        <MailIcon color={'action'} />
                    </Badge>
                </> : <></>
            }
        </Stack>
    )
}
