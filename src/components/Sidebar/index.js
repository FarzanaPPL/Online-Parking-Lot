import {useState,useContext} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Body from '../Body'
import searchContext from '../../searchContext'
import availableSlotsContext from '../../availableSlotsContext'
import allottedSlotsContext from '../../allottedSlotsContext'
import './index.css'

const Sidebar=()=>{
    const [ownerName,setOwnerName]=useState('')
    const [registrationNumber,setRegistrationNumber]=useState('')
    const [color,setColor]=useState('')
    const [slotNumber,setSlotNumber]=useState('')
    const [data,setData]=useState([])
    // const [submitted, setSubmitted] = useState(false);
    const [generateSlot,setGenerateSlot]=useState('')
    const {output,setOutput}=useContext(availableSlotsContext)
    const {alottedSlot,setAllottedSlot}=useContext(allottedSlotsContext)
    const {searchInput}=useContext(searchContext)
    const [errorMsg,setErrorMsg]=useState('')

    const onSubmitAlotSlot=event=>{
        event.preventDefault()
        console.log(data)
       const newData={
        id:uuidv4(),
        ownerName,
        registrationNumber,
        color,
        slotNumber
       }
       if(ownerName!=='' && (registrationNumber.slice(0,2)==='TS'|| registrationNumber.slice(0,2)==='AP')){
        
       }
       setData([...data,newData])
       setOwnerName('')
       setRegistrationNumber('')
       setColor('')
       setSlotNumber('')
        setAllottedSlot(alottedSlot+1)
       setOutput(output-1)
    }
    const onSubmitGenerateSlots=event=>{
        setOutput((previousOutput)=>{
            const newVal=previousOutput?`${parseInt(previousOutput)+parseInt(generateSlot)}`:generateSlot
            setGenerateSlot('')
             return newVal
        })
        
    }

    const onChangeOwnerName=event=>{
        setOwnerName(event.target.value)
    }
    const onChangeRegistrationNumber=event=>{
        const newNumber=event.target.value 
        setRegistrationNumber(newNumber)
        const regex=/^[a-zA-Z]{2}/
        const checkRegistrationNumber=regex.test(newNumber)
        if(!checkRegistrationNumber){
            setErrorMsg('First two charecters must be alphabets')
        }else{
            setErrorMsg('')
        }
    }
    const onChangeColor=event=>{
        setColor(event.target.value)
    }
    const onChangeSlotNumber=event=>{
        setSlotNumber(event.target.value)
    }
    const onChangeSlots=event=>{
        setGenerateSlot(event.target.value)  
    }

    const onDeleteRow=id=>{
        const filData=data.filter(i=>i.id!==id)
        setData(filData)
    }

    const filteredData=data.filter(each=>each.ownerName.toLowerCase().includes(searchInput)||each.registrationNumber.toLowerCase().includes(searchInput)||each.color.toLowerCase().includes(searchInput)||each.slotNumber.toLowerCase().includes(searchInput))
   
    return(
        <div className='appContainer'>
            <div className='sidebarC'>
    <form onSubmit={onSubmitAlotSlot}>
    <div className="inputsC">
        <input type="text" required className='sideInput' placeholder="Owner_Name" onChange={onChangeOwnerName} value={ownerName} />
        <input type="text" required className='sideInput' placeholder="Registration_Number" onChange={onChangeRegistrationNumber} value={registrationNumber} />
        <p className='error'>{errorMsg}</p>
        <input type="text" required className='sideInput' placeholder="car/Bike_Color" onChange={onChangeColor} value={color} />
        <input type="text" required className='sideInput' placeholder="Slot_Number" onChange={onChangeSlotNumber} value={slotNumber} /> 
    </div>
    <button className='alotSlotButton' onClick={onSubmitAlotSlot}>Alot the slot</button>
    </form>
    <div className='formC'>
    <div>
        <label>Generate Slots:
        <input type="text" className='generateInput' onChange={onChangeSlots} value={generateSlot}  />
        </label>
        <button className="generateButton" onClick={onSubmitGenerateSlots}>Generate</button>
    </div>
    {output?<p>{`Available Slots:${output}`}</p>:<p>Available Slots:0</p>}
    
    <p>Alotted Slots:{alottedSlot}</p>
    </div>
    </div>
    <table className='tableC'>
    <thead>
            <tr className='tableRow'>
                <th className='tableD'>SL_Num</th>
                <th className='tableD'>Registration_Number</th>
                <th className='tableD'>Owner_Name</th>
                <th className='tableD'>Car/Bike Color</th>
                <th className='tableD'>Remove/Update</th>
            </tr>
            </thead>
            <ul>
    {data.length===0?data.map((each)=>(
        <Body key={each.id} carDetails={each} onDeleteRow={onDeleteRow} errorMsg={errorMsg}  />
    )):filteredData.map((each)=>(
        <Body key={each.id} carDetails={each} onDeleteRow={onDeleteRow} errorMsg={errorMsg} />
    ))}
    </ul>
    </table>
        </div>
    )
}

export default Sidebar