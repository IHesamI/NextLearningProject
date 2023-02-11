import { PrismaClient } from '.prisma/client';

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

export default function employeehome({emp_projects}:{emp_projects:any}) {
    console.log(emp_projects)
}