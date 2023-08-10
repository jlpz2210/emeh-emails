import { google } from 'googleapis';
import keys from '../../KEYS.json'

export default async function getSpreadSheets() {
    try {
        const target = ['https://www.googleapis.com/auth/drive.readonly']
        const jwt = new google.auth.JWT(keys.client_email, undefined, keys.private_key, target)
        const drive = google.drive({version: 'v3', auth: jwt});
        const response = await drive.files.list();
        return response.data
    } catch(e) {
        console.log(e)
    }
}