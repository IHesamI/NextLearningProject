import { Box, Stack, Typography, Button } from "@mui/material"
import { PrismaClient } from "@prisma/client";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StarIcon from '@mui/icons-material/Star';

export async function getServerSideProps(context: any) {
    const id = parseInt(context.params.id);
    const prisma = new PrismaClient();
    const user_bids = await prisma.freelancer.findFirst(
        {
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                proposes: {
                    include: {
                        choosenpropose: true
                    }
                },

            }

        }
    )
    return {
        props: { ...user_bids }
    }

}

interface propose {
    id: number;
    seenstatus: boolean;
    title: string;
    freelancerid: number,
    projecid: number,
    choosenpropose?: object
}
interface props {
    id: number,
    username: string,
    proposes: propose[]
}

export default function home({ id, username, proposes }: props) {
    console.log(
        // id,
        // username,
        proposes,
    );

    return (
        <Stack >
            <Stack direction={'row'}
                justifyContent={'space-evenly'}>
                <Typography>{id}</Typography>
                <Typography>{username}</Typography>
            </Stack>
            <>
                {proposes.map((pro) => (
                    <Stack
                        key={pro.id}
                        direction={'row'} justifyContent={'space-evenly'}>
                        <Typography>{pro.title}</Typography>
                        <Typography>{pro.id}</Typography>
                        {
                            pro.seenstatus ? <DoneAllIcon color={'primary'} /> : <DoneIcon color={'primary'} />
                        }
                        {
                            pro.choosenpropose != null ? <Button href={`/freelancer/${id}/project/${pro.projecid}`}><StarIcon color={'success'} /></Button> : <StarIcon color={'action'} />
                        }
                    </Stack>
                ))
                }
            </>
        </Stack>
    )
} 