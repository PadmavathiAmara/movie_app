import { useState } from 'react';
import './AdminPortal.scss';

export const AdminPortal = () => {

    const [movies, setMovies] = useState({
        Title:"",
        Genre:"",
        Languages:"",
        Hero:"",
        Heroine:"",
        Duration:"",
        Url:"",
        From:"",
        To:"",
        })
console.log(movies)

    return(
        <div id='movieAdding'>
         <div id='movie'>
            Movie Title: <input type="text" value={movies.Title} name='Title' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            Movie Genre: <input type="text" 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            Movie languages: <input type="text"
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            Hero: <input type="text"/>
            Heroine: <input type="text"/>
            Movie Duration: <input type="text"/>
            Movie Url: <input type="text"/>
            Available dates: 
            <br/>
            From: <input type="date"/>
            To: <input type="date"/>
        </div>
        <article>Add movie</article>
        </div>   
    )
}

export default AdminPortal;