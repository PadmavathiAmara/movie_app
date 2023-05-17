import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { userDetailsStore } from '../App';
import { useEffect } from 'react';

export const Home = () => {
    const navigate = useNavigate();
    const Status = userDetailsStore(state => state.success);
    const setStatus = userDetailsStore(state => state.updateSuccess);

    const onLogoutClick = () => {
        setStatus("false");
    }

    const onLoading = () => {
        const adminData = {
            Username: "Padmavathi",
            Password: "padmavathi@12",
        }
        localStorage.setItem("Admin", JSON.stringify(adminData));
    }

    useEffect(() => {
        onLoading();
    }, [])

    return (
        <div className="homeComponent">
            <header>
                
                {(Status == "Padmavathi")?<button onClick={()=>navigate('/AdminPortal')}>Admin</button>: true }
                <h1>Movie Ticket Booking</h1>
                {(Status == "false") ?
                    <div id='buttons'>
                        <button onClick={() => navigate('/SignUp')}>SignUp</button>
                        <button onClick={() => navigate('/Login')}>Login</button>
                    </div> :
                    <details>
                        <summary style={{color: "white"}}>{Status}</summary>
                        <button onClick={() => onLogoutClick()}>Logout</button>
                    </details>}
            </header>
            <main >
                <article>
                    <h1>Welcome!</h1>
                    <h2>Book your tickets for movies...</h2>
                </article>

            </main>
        </div>
    )
}

export default Home;