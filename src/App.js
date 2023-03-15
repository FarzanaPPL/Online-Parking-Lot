import Header from './components/Header'
import Sidebar from './components/Sidebar'
import searchContext from './searchContext'
import availableSlotsContext from './availableSlotsContext'
import allottedSlotsContext from './allottedSlotsContext'
import Footer from './components/Footer'
import { useState } from 'react'
import './App.css'
const App=()=>{
  const [searchInput,setSearchInput]=useState('')
  const [output,setOutput]=useState('')
  const [alottedSlot,setAllottedSlot]=useState(0)

  return(
    <div className='appC'>
    <searchContext.Provider value={{searchInput,setSearchInput}}>
  <availableSlotsContext.Provider value={{output,setOutput}}>
    <allottedSlotsContext.Provider value={{alottedSlot,setAllottedSlot}}>
    <Header />
    <Sidebar />
    <Footer />
    </allottedSlotsContext.Provider>
  </availableSlotsContext.Provider>
  </searchContext.Provider>
  </div>
  )
}

export default App;
