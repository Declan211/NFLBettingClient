import React from 'react'
import Home from './components/Home'
import { GamesContextProvider } from './context/GamesContext';
import { Chart } from "react-google-charts";


function App() {
 
  
    return (
  
        
        <GamesContextProvider>
    <>
   <Home />
    </>
    </GamesContextProvider>
    )
}

export default App; 