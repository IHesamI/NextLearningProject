// import { Prisma } from '@prisma/client'
import { Stack } from '@mui/material';
import Project from './project';
import { Projectinf} from './index';



export default function Projectlist({ data }: {  data: Projectinf[] }) {
    console.log(data)
    return (
        <Stack>
            {
                data.map((pro) => (
                    <Project key={pro.id} id={pro.id} title={pro.title}></Project>
                )
                )
            }

        </Stack>
    )

}