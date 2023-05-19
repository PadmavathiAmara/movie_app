import { useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';

export const AdminPortal = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState({
        isDeleted: false,
    })

    const [idToAccess, setIdToAccess] = useState("");
    const [flagVal, setFlagVal] = useState("");

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
            Movie Id: <input type="text" value={movies.Id} name='Id' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
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
            From: <input type="date" name='date_from'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            />
            To: <input type="date" name='date_to'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            />
        </div>
        <article onClick={()=>onAddMovieClick()}>Add movie</article>
        <div>
            <button onClick={()=>navigate('/MoviesPage')}>Go to moviespage</button>
        </div>
        <input onChange={(e)=>setIdToAccess(e.target.value)}/>
        <input onChange={(e)=>setFlagVal(e.target.value)}/>
        </div>  
        
    )
}

export default AdminPortal;