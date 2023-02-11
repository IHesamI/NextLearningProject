import { PrismaClient } from '.prisma/client';
import Projectlist from '../projectlists';
import { Projectinf } from '..';

export async function getServerSideProps(context: any) {
    const employee_id = parseInt(context.params.id);
    const prisma = new PrismaClient();
    const emp_projects = await prisma.project.findMany(
        {
            where: {
                employeeid: employee_id,
            },

            include: {
                propose: true,
            }
        }
    )

    return {
        props: { emp_projects }
    }

}
// interface bids {
//     projectid:number,
//     id: number, 
//     title: string,
//     freelancerid: number,
// }

// interface employeeprojects {
//     id: number,
//     employeeid: number,
//     title: string,
//     propose: bids[],
// }

// interface props {
//     emp_projects: employeeprojects[]
// }

export default function employeehome({ emp_projects }: { emp_projects: Projectinf[] }) {
    // console.log(emp_projects)
    // console.log(emp_projects[0].propose)

    return (
        <>
            <Projectlist data={emp_projects} />

        </>
    )


}