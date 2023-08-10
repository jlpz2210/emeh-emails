import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
        <>
            Sesión iniciada como {session?.user?.email} <br />
            <Link href='/read'>Leer archivo</Link>
            <button onClick={() => signOut()}>Cerrar sesión</button>
        </>
        )
    }
    return (
        <>
        Not signed in <br />
        <button onClick={() => signIn()}>Iniciar sesión</button>
        </>
    )
}