import { createContext, useState } from "react";

export const AlunosContext = createContext();

function AlunosProvider({ children }) {
    const [alunos, setAlunos] = useState(null);
  
    return (
      <AlunosContext.Provider value={{ alunos, setAlunos }}>
        {children}
      </AlunosContext.Provider>
    );
  }

  export default AlunosProvider;