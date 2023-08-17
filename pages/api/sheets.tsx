import { google } from 'googleapis';

export default async function getSpreadSheets() {
    try {
        const target = ['https://www.googleapis.com/auth/drive.readonly']
        const jwt = new google.auth.JWT(process.env.GOOGLE_EMAIL, undefined, process.env.GOOGLE_PRIVATE_KEY, target)
        const drive = google.drive({version: 'v3', auth: jwt});
        const response = await drive.files.list();
        return response.data
    } catch(e) {
        console.log(e)
    }
}