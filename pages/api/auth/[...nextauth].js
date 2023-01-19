import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

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
          username: { label: "Login WPensar", type: "text", placeholder: "primeiro_nome.ultimo_nome" },
          cpf: { label: "CPF", type: "text" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          
          const payload = {
            cpf: credentials.cpf,
            user_wpensar: credentials.username,
          };
  
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get_login`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const result  = await res.json()
          
          const user = result.login

          if (!isEmptyObject(user)) {
            
            return { name: user[0].username };

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

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
}
export default NextAuth(authOptions)