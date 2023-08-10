import getSpreadSheetData from '@/pages/api/sheetData';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { sheets_v4 } from 'googleapis';
import { GetServerSideProps } from 'next';
import DataTable from '@/components/DataTable';
import { columns } from '@/components/columns';
import { useState } from 'react';
import postEmailHandler from '@/pages/api/sendEmail';

interface SheetValueData {
    data?: sheets_v4.Schema$ValueRange
}

interface Selected {
    [key: number]: boolean
}

interface Item {
    [key: number]: string
}

export default function SheetName(props: SheetValueData) {
    const [rowSelection, setRowSelection] = useState<Selected>({})
    const {data} = props
    const router = useRouter()
    const { sheetId } = router.query
    if(!data?.values) return
    const newData = data.values.map(val => Object.assign({}, val))

    const handleEmail = () => {
        const filtered = newData.filter((_, index) => rowSelection[index])
        console.log(filtered)
        Promise.all(filtered.map(async (item: Item)=> {
            const newItem = {
                name: item[0],
                email: item[1],
                url: item[2]
            }
            await fetch('/api/sendEmail', {
                method: 'POST',
                body: JSON.stringify(newItem)
            })
        })).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
        })
    }

    return(
        <div className='m-4'>
            <div className='flex flex-row justify-between m-4 align-center'>
                <div>{sheetId}</div>
                <button className='bg-blue-600 rounded-full p-4 text-white' onClick={handleEmail}>Send emails</button>
            </div>
            <DataTable columns={columns} data={newData} rowSelection={rowSelection} setRowSelection={setRowSelection}/>
        </div>
    )   
}

interface Params extends ParsedUrlQuery {
    id: string
    sheetId: string
}

export const getServerSideProps: GetServerSideProps<SheetValueData, Params> = async (context) => {
    const { id, sheetId } = context.query
    if(typeof id !== 'string' || typeof sheetId !== 'string') return {props: {}}
    const spreadSheet = await getSpreadSheetData(id, sheetId)
    if(!spreadSheet) return {props: {}}
    return {
        props: {data: spreadSheet}
    }
}