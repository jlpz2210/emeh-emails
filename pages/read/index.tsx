import {drive_v3} from 'googleapis'
import { useSession } from 'next-auth/react';
import getSpreadSheets from "../api/sheets";
import Link from "next/link";

interface ReadlFileProps {
    files: drive_v3.Schema$File[]
}

export default function ReadFile(props: ReadlFileProps) {
    const {files} = props
    const {data: session} = useSession()

    return (
        <div className='m-10'>
            {files.map((file) => {
                return <Link key={file.id} href={`/show/${file.id}`}><button className='rounded-full bg-blue-500 p-4 text-white'>{file.name}</button></Link>
            })}
        </div>
    )
}

export async function getServerSideProps() {
    const spreadSheets = await getSpreadSheets()
    return {
        props: spreadSheets || {}
    }
}