import React, { createContext, useState } from "react";
import Navigation from "./routes/navigation";




export const FormContext = createContext([])

function App() {
  const [Data, _Data] = useState([])
  return (
    <FormContext.Provider value={[Data, _Data]}>
      <Navigation />

    </FormContext.Provider>
  );
}

export default App