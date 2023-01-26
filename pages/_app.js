import '../styles/globals.css'
import Head from 'next/head'
import UserProvider from '../providers/user'
import { SessionProvider } from "next-auth/react"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Autorizador a Buscar - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>
      <UserProvider>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </UserProvider>
    </>
  )
}

export default MyApp