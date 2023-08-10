import { sheets_v4 } from "googleapis"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import Link from 'next/link';
import getSpreadSheetDetail from "@/pages/api/sheetDetail";

interface ShowFileProps {
    file?: sheets_v4.Schema$Spreadsheet
}

export default function FileId(props: ShowFileProps) {
    const {file} = props
    const router = useRouter()
    return(
        <div className="m-4">
            {file?.sheets?.map(sheet => <Link key={sheet.properties?.title} href={`${file.spreadsheetId}/sheet/${encodeURIComponent(sheet.properties?.title || '')}`}><button className="rounded-full bg-blue-500 p-4 mb-1 text-white">{sheet.properties?.title}</button></Link>)}
        </div>
    )
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getServerSideProps: GetServerSideProps<ShowFileProps, Params> = async (context) => {
    const { id } = context.query
    if(typeof id !== 'string') return {props: {}}
    const spreadSheet = await getSpreadSheetDetail(id)
    if(!spreadSheet) return {props: {}}
    return {
        props: {file: spreadSheet}
    }
}