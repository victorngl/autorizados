import '../styles/globals.css'
import Head from 'next/head'
import UserProvider from '../providers/user'
import { SessionProvider } from "next-auth/react"
import Login from '../components/auth/login'
import AlunosProvider from '../providers/alunos'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Intranet - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>

      <SessionProvider>
        <UserProvider>
          <AlunosProvider>
            <Login>
              <Component {...pageProps} />
            </Login>
          </AlunosProvider>
        </UserProvider>
      </SessionProvider>

    </>
  )
}

export default MyApp