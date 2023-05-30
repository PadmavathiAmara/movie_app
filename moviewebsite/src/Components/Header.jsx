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
        navigate('/');
    }

    let getcurrentUserData = JSON.parse(localStorage.getItem("CurrentUser"));
    return(
        <>
        <div className="homeComponent">
            <header>
                {/* navigate('/AdminPortal'); */}
                {((Status == "Padmavathi") && getcurrentUserData) ?<button id='adminBtn' onClick={()=>{setIsAdminBtn(!isAdminBtn)}}>Admin Dashboard{ isAdminBtn ?<KeyboardArrowDownIcon/>: <KeyboardArrowRightIcon/>}</button>: true }
                {isAdminBtn ?  <div id='adminMenu'>
                    <button className='btns' onClick={()=>navigate('/')}>
                        Home
                    </button>
                    <button className='btns' onClick={()=>navigate('/AdminPortal')}>
                        Admin Portal 
                    </button>
                    <button className='btns'onClick={()=>navigate('/UpdateMovies')}>
                        Update Movies
                    </button>
                    <button className='btns'onClick={()=>navigate('/Moviespage')}>
                        Movies Page
                    </button>
                    <button className='btns'onClick={()=>navigate('/UsersInfo')}>
                         Users Info
                    </button>
                </div> : true}
               
                
                <h1>Movie Ticket Booking</h1>
                {!getcurrentUserData ?
                    <div id='buttons'>
                        <button onClick={() => navigate('/SignUp')}>SignUp</button>
                        <button onClick={() => navigate('/Login')}>Login</button>
                    </div> :
                    // <details>
                        // <summary style={{color: "white"}}>{Status}</summary>
                        // <button onClick={() => onLogoutClick()}>Logout</button>
                    // </details>}
                    <button id='accBtn' 
                    onClick={()=>setIsShown(!isShown)}><AccountCircleRoundedIcon/>{getcurrentUserData.Username}</button>}
                    {isShown ? <button id='logoutBtn' onClick={() => onLogoutClick()}><div id='logoutIcons'>Logout<LogoutIcon/></div></button> : true}
            </header>
           
        </div>
        </>
    )
}

export default Header;