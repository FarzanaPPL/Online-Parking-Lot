import {RxCross2} from 'react-icons/rx'
import {FaEdit} from 'react-icons/fa'
import {useContext,useState} from 'react'
import availableSlotsContext from '../../availableSlotsContext'
import allottedSlotsContext from '../../allottedSlotsContext'
import './index.css'
const Body=props=>{
    const {carDetails,onDeleteRow}=props
    const {id,ownerName,registrationNumber,color,slotNumber} = carDetails
    const {output,setOutput}=useContext(availableSlotsContext)
    const {alottedSlot,setAllottedSlot}=useContext(allottedSlotsContext)
    const [editable,setEditable]=useState(false)
    // const [render,setRender]=useState(true)

    const deleteRow=()=>{
            onDeleteRow(id)
       setOutput(output+1)
        setAllottedSlot(alottedSlot-1)
    }

    const onEditText=()=>{
        setEditable(true)
    }

    const renderTableData=()=>{
        // if(output<=0 && output>=20){
        //     setRender(false)
        //     console.log("output",parseInt(output))
        // }
    
        // console.log("output",output)
        return(
        <table className='table'>
            <tbody>
            <tr className='tableRow'>
                <td className='tableData' contentEditable={editable} align='center'>{slotNumber}</td>
                <td className='tableData' contentEditable={editable} align='center'>{registrationNumber}</td>
                <td className='tableData' contentEditable={editable} align='center'>{ownerName}</td>
                <td className='tableData' contentEditable={editable} align='center'>{color}</td>
                <td className='tableData' contentEditable={editable} align='center'><button onClick={deleteRow} className="crossButton"><RxCross2 /></button> <button onClick={onEditText} className="editButton"><FaEdit /></button></td>
            </tr>
            </tbody>
        </table>
        )
    }


    return(-
        <div>

            {renderTableData()}
        </div>
    )
}

export default Body