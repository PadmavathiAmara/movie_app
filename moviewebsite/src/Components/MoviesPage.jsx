import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";

export const MoviesPage = () => {

    const navigate = useNavigate();
    const setUpdateMovies = userDetailsStore(state => state.updateMovies);

    let listOfMovies = JSON.parse(localStorage.getItem("MoviesList")); 
    console.log(listOfMovies);

    return(
        <>
        {listOfMovies.map((movie)=>{
           return <div>{movie.Title}
           {<img src={movie.Url}/>}
           <button onClick={()=>{navigate('/AdminPortal');
                   setUpdateMovies(movie);
        }}> edit
            </button></div>
        })}
        </>
    )
}

export default MoviesPage;
