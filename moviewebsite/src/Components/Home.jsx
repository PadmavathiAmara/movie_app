import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { userDetailsStore } from '../App';
import { useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeBody from './HomeBody';
import MoviesPage from './MoviesPage';

export const Home = () => {
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

    const onLoading = () => {
        const adminData = {
            Username: "Padmavathi",
            Password: "padmavathi@12",
        }
        localStorage.setItem("Admin", JSON.stringify(adminData));
    }
    const onRefresh = () => {
        // 
        // if(getcurrentUserData){
        //     
        // }
        // let getcurrentUserData = JSON.parse(localStorage.getItem("CurrentUser"));
        // if(getcurrentUserData.Username === "Padmavathi"){
        //     if(Status == "false" || Status == 'Padmavathi'){
        //         return true;
        //     }
        // }else{
        //     if(Status == "false"){
        //         localStorage.removeItem("CurrentUser");
        //         }
        // }
        if(Status == "false"){
            let getcurrentUserData = localStorage.getItem("CurrentUser");
            console.log(getcurrentUserData)
            if(getcurrentUserData){
                let getData = JSON.parse(localStorage.getItem("CurrentUser"));
        if(getData.Username === "Padmavathi"){
            setStatus("Padmavathi")
        }else{
                localStorage.removeItem("CurrentUser");
        }
            }
        }
    }

    useEffect(() => {
        onLoading();
        onRefresh();
    }, [])

    return (
        <div className="homeComponent">
            <header>
                {/* navigate('/AdminPortal'); */}
                {(Status == "Padmavathi")?<button id='adminBtn' onClick={()=>{setIsAdminBtn(true)}}>Admin Dashboard</button>: true }
                {isAdminBtn ? <button>Move to Admin portal</button> : true}
                
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
                    <button id='accBtn' onClick={()=>setIsShown(true)}><AccountCircleRoundedIcon/>{Status}</button>}
                    {isShown ? <button id='logoutBtn' onClick={() => onLogoutClick()}>Logout</button> : true}
            </header>
            {/* <main >
                <article>
                    <h1>Welcome!</h1>
                    <h2>Book your tickets for movies...</h2>
                </article>

            </main> */}
            {/* <HomeBody/> */}
        </div>
    )
}

export default Home;