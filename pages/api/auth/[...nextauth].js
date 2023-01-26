import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Login WPensar", type: "text", placeholder: "Exemplo: joao.silva" },
          cpf: { label: "CPF", type: "text" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied

          const prisma = new PrismaClient();
         
          const getUser = await prisma.usuarios.findFirst({
            where: {
              cpf: credentials.cpf,
              username: credentials.username,
            }
          })
          
          let userReturned;

          if (getUser) {
            userReturned = { name: getUser.nome, id: getUser.cpf }
            return userReturned ;

          } else {
            
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      session.user.id = session.id

      return session;
    },
  },
  session: {
    maxAge: 12 * 60 * 60, // 12 horas
  },
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
}
export default NextAuth(authOptions)