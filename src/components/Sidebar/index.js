import {useState,useContext} from 'react'
import { v4 as uuidv4 } from 'uuid'
import searchContext from '../../searchContext'
import Body from '../Body'
import './index.css'

let errorName=false
let existRegNum=false
let existSlot=false
let error={ownerName:'',registrationNumber:'',color:'',slotNumber:''}


const Sidebar=()=>{
    const {inputData,setInputData,data,setData,searchInput,output,setOutput,alottedSlot,setAllottedSlot,bolin, setBolin,index}=useContext(searchContext)
    let {ownerName,registrationNumber,color,slotNumber}=inputData
    const [generateSlot,setGenerateSlot]=useState('')
    const [slotError,setSlotError]=useState('')
    const [errorData,setErrorData]=useState(false)

    const onSubmitAlotSlot=event=>{
        event.preventDefault()
        if(output>0){
            if(error.ownerName===''&&error.registrationNumber===''&&error.color===''&&error.slotNumber===''){
                
                const newData={
                    id:uuidv4(),
                    ownerName,
                    registrationNumber,
                    color,
                    slotNumber
                   }
                   if(ownerName===''&&registrationNumber===''&&color===''&&slotNumber===''){
                    alert("Enter all the fields ")
                   }
                   else{
                    console.log('formData',true)
                    setData((prev)=>[...prev,newData])
                    setInputData({ownerName:'',registrationNumber:'',color:'',slotNumber:''})
                    setOutput(output-1)
                    setAllottedSlot(alottedSlot+1)
                    setSlotError(false)
                    setErrorData(false)
                    
                       
                   }
                
            }else{
                setErrorData(true)
            }
           }else{
             setSlotError(true)
             
           }
    }

    const onSubmitGenerateSlots=event=>{
        setOutput((previousOutput)=>{
            const newVal=previousOutput?`${parseInt(previousOutput)+parseInt(generateSlot)}`:generateSlot
            setGenerateSlot('')
            setSlotError(false)
             return newVal
        })
        
    }

    const onChangeOwnerName=event=>{
        setInputData({...inputData,ownerName:event.target.value})
        const newName=event.target.value 
        const regex=/^[a-zA-Z ]+$/ 
        const checkOwnerName=regex.test(newName)
        
        if(!checkOwnerName){
            error.ownerName='Enter the name'
        }
        else{
            error.ownerName=''
        }
    }
    const onChangeRegistrationNumber=(event)=>{
        const newNumber=event.target.value 
        setInputData({...inputData,registrationNumber:newNumber})
        const regex=/^[a-zA-Z ]{2}[0-9]{2}[-][A-Za-z0-9]{2}[-][0-9]{4}/
        const checkRegistrationNumber=regex.test(newNumber)
        
        if(!checkRegistrationNumber){
            error.registrationNumber="The format should be TS33-AA-0001"  
        }else{
            error.registrationNumber=""
        } 

        const check=data.some((each)=>each.registrationNumber.toLowerCase()===newNumber.toLowerCase())
       if(check){
        existRegNum=true
       }else{
        existRegNum=false
       }
    }
    const onChangeColor=event=>{
        setInputData({...inputData,color:event.target.value})
        const newColor=event.target.value 
        const regex=/^[a-zA-Z]*$/
        const checkColor=regex.test(newColor)

        if(!checkColor){
            error.color="Enter the color"
            
        }else{
            error.color=""
            
        }
    }
    const onChangeSlotNumber=event=>{
        setInputData({...inputData,slotNumber:event.target.value})
        const newSlotNum=event.target.value 
        const regex=/^[0-9]*$/
        const checkSlotNumber=regex.test(newSlotNum)
        console.log('data',data)
        const check=data.some((each)=>each.slotNumber===newSlotNum)
       if(check){
        existSlot=true
       }else{
        existSlot=false
       }
        
        if(!checkSlotNumber){
            error.slotNumber="Enter the slotNUmber"
            
        }else{
            error.slotNumber=""
            
        }
    }
    const onChangeSlots=event=>{
        setGenerateSlot(event.target.value)  
    }

    const onDeleteRow=(id)=>{
        const filData=data.filter((v)=>v.id!==id)
        setData(filData)
}

const onUpdateAlotSlot=(event)=>{
    event.preventDefault()
    let total=[...data]
  total.splice(index,1,{ownerName,registrationNumber,color,slotNumber})
  setData(total)
   setBolin(false)
setInputData({ownerName:'',registrationNumber:'',color:'',slotNumber:''})
}

const filteredData=data.filter(each=>each.ownerName.toLowerCase().includes(searchInput)||each.registrationNumber.toLowerCase().includes(searchInput)||each.color.toLowerCase().includes(searchInput)||each.slotNumber.includes(searchInput))

return(
        <div className='appContainer'>
            <div className='sidebarC'>
        <form onSubmit={!bolin?onSubmitAlotSlot:onUpdateAlotSlot}>
    <div className="inputsC">
        <input type="text" required className='sideInput' name="ownerName" placeholder="Owner_Name" onChange={onChangeOwnerName} value={inputData.ownerName} autoComplete='off'  />
        {error.ownerName&&<p className='error'>{error.ownerName}</p>}
        <input type="text" required className='sideInput' name="registrationNumber" placeholder="Registration_Number" onChange={onChangeRegistrationNumber} value={inputData.registrationNumber} autoComplete='off'  />
        {error.registrationNumber&&<p className='error'>{error.registrationNumber}</p>}
        {existRegNum?<p className='error'>Alreeady Exists</p>:''}
        <input type="text" required className='sideInput' name="color" placeholder="car/Bike_Color" onChange={onChangeColor} value={inputData.color} autoComplete='off'  />
        {error.color&&<p className='error'>{error.color}</p>}
        <input type="text" required className='sideInput' name="slotNumber" placeholder="Slot_Number" onChange={onChangeSlotNumber} value={inputData.slotNumber} autoComplete='off'  /> 
        {error.slotNumber&&<p className='error'>{error.slotNumber}</p>}
        {existSlot?<p className='error'>Alreeady Exists</p>:''}
    </div>
    <button className='alotSlotButton'>{!bolin?`Alot Slot`:`Update data`}</button>
    </form>
    <div className='formC'>
    <div>
        <label className='labelT'>Generate Slots:
        <input type="text" className='generateInput' onChange={onChangeSlots} value={generateSlot}  />
        </label>
        <button className="generateButton" onClick={onSubmitGenerateSlots}>Generate</button>
    </div>
    {output?<p className='availableSlots'>{`Available Slots: ${output}`}</p>:<p className='availableSlots'>{`Available Slots: 0`}</p>}
    
    <p className='alottedSlots'>{`Alotted Slots: ${alottedSlot}`}</p>
    </div>
    </div>
    <div className='tableDiv'>
    <table className="tableC" >
    <thead>
            <tr className='tr'>
                   
                <th className='tableD'>SL_Num</th>
                <th className='tableD'>Registration_Number</th>
                <th className='tableD'>Owner_Name</th>
                <th className='tableD'>Car/Bike Color</th>
                <th className='tableD'>Remove/Update</th>
            </tr>
            </thead>
            <tbody>
                {filteredData.map((each,index)=>(
        <Body key={each.id} carDetails={each} index={index} onDeleteRow={onDeleteRow}  />
        
    ))}
    </tbody>
    </table>
    {slotError?<p className='slotError'>Slots Not Available</p>:''}
    {errorData?<p className='slotError'>Enter the proper data</p>:''}
        </div>
        </div>
    )
}




export default Sidebar
