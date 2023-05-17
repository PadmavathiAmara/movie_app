import { useNavigate } from 'react-router-dom';
import bgimg from './assets/bg.jpg';
import './Home.scss';
import { userDetailsStore } from '../App';

export const Home = () => {
    const navigate = useNavigate();
    const accountUser = userDetailsStore(state => state.accUser);
    const Success = userDetailsStore(state => state.success);
 
    return(
        <div className="homeComponent">
            <header>
                <h1 id='title'>Night Owl</h1>
                <input type='search' placeholder='Search for your movies...' id='searchbar'/>
                
                <div id='buttons'>
                    {{Success}?"hello":"bye"}
                <button onClick={()=>navigate('/SignUp')}>SignUp</button> 
                <button onClick={()=>navigate('/Login')}>Login</button>
                </div>
                
            </header>
            <main className='homeMain'>
                <h1>Welcome!</h1>
                <h2>Book your tickets for movies...</h2>
            </main>
        </div>
    )
}

export default Home;