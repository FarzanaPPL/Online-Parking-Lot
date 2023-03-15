import {useContext} from 'react'
import searchContext from "../../searchContext"
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'
import logo from '../../logo.png'
const Header=()=>{
    const {searchInput,setSearchInput}=useContext(searchContext)

    const onChangeSearchInput=event=>{
        setSearchInput(event.target.value)
    }

    return(
        <header className="headerC">
            <div className='logoContainer'>
            <img src={logo} alt="logo" className='logoImg' />
        <h1 className='logoName'>Online-Parking Lot</h1>
            </div>
        <div className='inputC'>
            <input type="text" className='searchInput' placeholder="Search Your Car/Bike" onChange={onChangeSearchInput} value={searchInput}/>
            <AiOutlineSearch />
        </div>
    </header>
    )
}

export default Header