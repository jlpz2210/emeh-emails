import { google } from 'googleapis';

export default async function getSpreadSheetDetail(id: string) {
    try{
        const target = ['https://www.googleapis.com/auth/drive.readonly']
        const jwt = new google.auth.JWT(process.env.GOOGLE_EMAIL, undefined, process.env.GOOGLE_PRIVATE_KEY, target)
        const sheet = google.sheets({version: 'v4', auth: jwt})
        const response = await sheet.spreadsheets.get({
            spreadsheetId: id,
        })
        return response.data
    }catch(e){
        console.log(e)
    }
}