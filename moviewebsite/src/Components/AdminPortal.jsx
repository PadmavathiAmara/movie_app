import { useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';
import { userDetailsStore } from '../App';

export const AdminPortal = () => {

    const navigate = useNavigate();
    const showMovies = userDetailsStore(state => state.movies);

    const [movies, setMovies] = useState({})

     const onAddMovieClick = () => {
        let getOldMovies = JSON.parse(localStorage.getItem("MoviesList"));
        if(!getOldMovies){
            localStorage.setItem("MoviesList",JSON.stringify([movies]));
        }
        else{
            let storedMoviearr = JSON.parse(localStorage.getItem("MoviesList"));
            storedMoviearr.push(movies);
        localStorage.setItem("MoviesList",JSON.stringify(storedMoviearr));
        }
     }
console.log(movies)

    return(
        <div id='movieAdding'>
         <div id='movie'>
            Movie Title: <input type="text" value={movies.Title} name='Title' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            Movie Genre: <input type="text" name='Genre' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            Movie languages: <input type="text" name='Languages'
            onChange={(e)=>setMovies({...movies, [e.target.name]: [e.target.value]})}
            />
            Hero: <input type="text" name='Hero'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            Heroine: <input type="text" name='Heroine'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            Movie Duration: <input type="time" name='Duration'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            Movie Url: <input type="url" name='Url'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            Available dates: 
            <br/>
            From: <input type="date" name='date.from'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            />
            To: <input type="date" name='date.to'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            />
        </div>
        <article onClick={()=>onAddMovieClick()}>Add movie</article>
        <div>
            <button onClick={()=>navigate('/MoviesPage')}>Go to moviespage</button>
        </div>
        </div>  
        
    )
}

export default AdminPortal;