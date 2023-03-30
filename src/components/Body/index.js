import {RxCross2} from 'react-icons/rx'
import {FaEdit} from 'react-icons/fa'
import searchContext from '../../searchContext'
import { useContext } from 'react'

const Body=(props)=>{
    const {carDetails,index, onDeleteRow}=props 
    const {id,slotNumber,registrationNumber,ownerName,color}=carDetails
    const {output,setOutput,alottedSlot,setAllottedSlot,data,setBolin,setIndex,setInputData}=useContext(searchContext)
    const deleteRow=()=>{
        onDeleteRow(id)
        setAllottedSlot(alottedSlot-1)
        setOutput(parseInt(output)+1)
    }
    const handleEdit=(i)=>{
    let {ownerName,registrationNumber,color,slotNumber}=data[i]
    setInputData({ownerName,registrationNumber,color,slotNumber})
    setBolin(true)
    setIndex(i)
}
    return(
        <>
    <tr className='tr'>
            <td className='tableData'>{slotNumber}</td>
                <td className='tableData'>{registrationNumber.toUpperCase()}</td>
                <td  className='tableData'>{ownerName.trim()}</td>
                <td className='tableData'>{color}</td>
                <td className='tableData'><button className="crossButton" onClick={deleteRow}><RxCross2 /></button> <button className="editButton" onClick={()=>handleEdit(index)} ><FaEdit /></button></td>
        </tr>
    </>
    )
}

export default Body