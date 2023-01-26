import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
  
    return (
      <UserContext.Provider value={{ usuario, setUsuario }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider;