import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDetailsStore } from '../App';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.scss';


const Header = () => {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [isAdminBtn, setIsAdminBtn] = useState(false);

    const Status = userDetailsStore(state => state.success);
    const setStatus = userDetailsStore(state => state.updateSuccess);

    const onLogoutClick = () => {
        setStatus("false");
        setIsShown(false);
        localStorage.removeItem("CurrentUser");
    }
    return(
        <>
        <div className="homeComponent">
            <header>
                {/* navigate('/AdminPortal'); */}
                {(Status == "Padmavathi")?<button id='adminBtn' onClick={()=>{setIsAdminBtn(!isAdminBtn)}}>Admin Dashboard{ isAdminBtn ?<KeyboardArrowDownIcon/>: <KeyboardArrowRightIcon/>}</button>: true }
                {isAdminBtn ?  <div id='adminMenu'>
                    <button className='btns' onClick={()=>navigate('/')}>
                        Home page
                    </button>
                    <button className='btns' onClick={()=>navigate('/Moviespage')}>
                        Movies page
                    </button>
                    <button className='btns'onClick={()=>navigate('/UpdateMovies')}>
                        update movies
                    </button>
                    <button className='btns'onClick={()=>navigate('/AdminPortal')}>
                        Admin portal 
                    </button>
                </div> : true}
               
                
                <h1>Movie Ticket Booking</h1>
                {(Status == "false") ?
                    <div id='buttons'>
                        <button onClick={() => navigate('/SignUp')}>SignUp</button>
                        <button onClick={() => navigate('/Login')}>Login</button>
                    </div> :
                    // <details>
                        // <summary style={{color: "white"}}>{Status}</summary>
                        // <button onClick={() => onLogoutClick()}>Logout</button>
                    // </details>}
                    <button id='accBtn' 
                    onClick={()=>setIsShown(!isShown)}><AccountCircleRoundedIcon/>{Status}</button>}
                    {isShown ? <button id='logoutBtn' onClick={() => onLogoutClick()}><div id='logoutIcons'>Logout<LogoutIcon/></div></button> : true}
            </header>
           
        </div>
        </>
    )
}

export default Header;