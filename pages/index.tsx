import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { Box, Stack } from '@mui/material';
import Projectlist from './projectlists';
import { PrismaClient } from '.prisma/client';
// import { json } from 'stream/consumers';

const inter = Inter({ subsets: ['latin'] })


export interface prop {
  projectid: number,
  id: number,
  seenstatus: boolean,
  title: string,
  freelancerid: number,
}

export interface Projectinf {
  id: number;
  title: string;
  propose?: prop[]
}


export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany(
    {
      where: {
        choosenproposeid: null
      },

      include: {
        propose: false
      }
    }
  );
  return {
    // props: JSON.parse(JSON.stringify(projects))
    props: { projects }
  }

}


export default function Home({ projects }: { projects: Projectinf[] }) {
  return (
    <Stack>
      <title>Home</title>
      <Projectlist data={projects} />

    </Stack>
  )
}
