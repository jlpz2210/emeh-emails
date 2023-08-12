import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import keys from '@/KEYS.json'
import {authOptions} from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next";

export default async function postEmailHandler(req:NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'POST'){
            const {name, email, url} = JSON.parse(req.body)
            if(!name) return res.status(400).json({error: 'El nombre es requerido'})
            if(!email) return res.status(400).json({error: 'El correo es requerido'})
            if(!url) return res.status(400).json({error: 'El enlace del historial es requerido'})
            const session = await getServerSession(req, res, authOptions)
            if(!session?.access_token) return res.status(401).json({error: 'Inicia sesión primero'})
            const auth = new google.auth.OAuth2(process.env.GOOGLE_SECRET, process.env.GOOGLE_ID, process.env.NEXTAUTH_URL)
            auth.setCredentials({access_token: session.access_token})
            // const {tokens} = await auth.getToken(authUrl)
            const gmail = google.gmail({version: 'v1', auth: auth})
        
            const message =
`From: <pruebadeotracosa@gmail.com>
To: <${email}>
Subject: Hola buenas

Estimad@ ${name}:

Por este medio le hacemos llegar su historial académico correspondiente al cuatrimestre que finaliza.

En caso de presentar algún extraordinario deberá acudir al área de Subdirección Académica le donde brindaremos su formato de pago que posteriormente se entregará junto con el pago correspondiente en el área de caja, siendo el único día para realizar dicho trámite el día viernes 18 del presente mes.
El horario de atención en caja es de 9:00 hrs a 14:00 hrs y de 15:00 hrs. a 16:30 hrs. Con un costo de $246 cada uno. Cabe resaltar que el pago de extraordinario será únicamente de manera presencial.

Quedamos a sus ordenes para cualquier duda o aclaración.

${url}`
            const base64Message = Buffer.from(message).toString('base64')
            const base64EncodedMessage = base64Message.replaceAll(/\+/g, '-').replaceAll(/\//g, '_')

            const response = await gmail.users.messages.send({
                userId: 'pruebadeotracosa@gmail.com',
                requestBody: {
                    raw: base64EncodedMessage
                }
            })
            res.status(200).json(response.data)
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({error: e})
    }
}