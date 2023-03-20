import Header from './components/Header'
import Sidebar from './components/Sidebar'
import searchContext from './searchContext'
import Footer from './components/Footer'
import { useState } from 'react'
import './App.css'
const App=()=>{
  const [inputData,setInputData]=useState({ownerName:'',registrationNumber:'',color:'',slotNumber:''})
  const [searchInput,setSearchInput]=useState('')
  const [output,setOutput]=useState(0)
  const [alottedSlot,setAllottedSlot]=useState(0)
  const [data,setData]=useState([])
  const [bolin, setBolin] = useState(false);
    const [index,setIndex]=useState()


  return(
    <div className='appCt'>
    <searchContext.Provider value={{inputData,setInputData,searchInput,setSearchInput,output,setOutput,alottedSlot,setAllottedSlot,data,setData,bolin, setBolin,index,setIndex}}>
    <Header />
    <Sidebar />
    <Footer />
  </searchContext.Provider>
  </div>
  )
}

export default App;
