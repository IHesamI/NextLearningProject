// import { Prisma } from '@prisma/client'
import { Stack } from '@mui/material';
import Project from './project';
import { Projectinf } from './index';



export default function Projectlist({ data }: { data: Projectinf[] }) {
    return (
        <Stack>
            {
                data.map((pro) => (
                    <Project key={pro.id} id={pro.id} title={pro.title} propose={pro.propose}></Project>
                )
                )
            }

        </Stack>
    )

}