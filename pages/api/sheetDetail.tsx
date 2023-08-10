import { google } from 'googleapis';
import keys from '../../KEYS.json'

export default async function getSpreadSheetDetail(id: string) {
    try{
        const target = ['https://www.googleapis.com/auth/drive.readonly']
        const jwt = new google.auth.JWT(keys.client_email, undefined, keys.private_key, target)
        const sheet = google.sheets({version: 'v4', auth: jwt})
        const response = await sheet.spreadsheets.get({
            spreadsheetId: id,
        })
        return response.data
    }catch(e){
        console.log(e)
    }
}