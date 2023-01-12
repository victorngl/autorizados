import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [responsavel, setResponsavel] = useState({});
    const [usuario, setUsuario] = useState({});
  
    return (
      <AuthContext.Provider value={{ responsavel, setResponsavel, usuario, setUsuario }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export default AuthProvider;