import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import './MoviesPage.scss';
import Home from "./Home";
import Header from "./Header";

export const MoviesPage = () => {

    const navigate = useNavigate();
    const setUpdateMovies = userDetailsStore(state => state.updateMovies);

    let listOfMovies = JSON.parse(localStorage.getItem("MoviesList"));
    console.log(listOfMovies);

    const onDeleteClick = (movie) => {
        let leftOverMv = listOfMovies.filter((m) => m.Id !== movie.Id);
        let delMv = listOfMovies.filter((m) => m.Id == movie.Id);

        // localStorage.removeItem("MoviesList");
        // localStorage.setItem("MoviesList",JSON.stringify(delMv));
        // console.log(delMv);
        //    console.log( delMv[0].isDeleted);
        localStorage.removeItem("MoviesList");
        localStorage.setItem("updateDelMvs", JSON.stringify(leftOverMv));
        delMv[0].isDeleted = true;
        //    console.log( delMv[0].isDeleted);
        let toUpdateFlag = JSON.parse(localStorage.getItem("updateDelMvs"));
        toUpdateFlag.push(delMv);
        localStorage.setItem("MoviesList", JSON.stringify(toUpdateFlag));

    }

    return (
        <>
        <Header/>
        <div className="moviesPage">
<div className="moviesDiv">


            {!listOfMovies ? "Loading" :
                <>
                    {listOfMovies.map((movie) => {
                        return <>{
                             movie.isDeleted == false  ?
                                <div className="movie">
                                    {/* <h2>{movie.Genre}</h2> */}
                                    {/* {(movie.Languages) ?
                                        <>{movie.Languages.map((lang) => <div>{lang}</div>)}</> : true} */}
                                    {/* <h2>{movie.Hero}</h2> */}
                                    {/* <h2>{movie.heroine}</h2> */}
                                    {/* <h2>{movie.Duration}</h2> */}
                                    <section>
                                    {<img src={movie.Url}/>}
                                    <h2>{movie.Title}</h2>
                                    </section>
                                    
            <button onClick={() => {navigate('/UpdateMovies');
                                    setUpdateMovies(movie);
                                    }}> edit </button>
            {/* <button onClick={() => {onDeleteClick(movie);
                                    navigate('/MoviesPage');
                                   }}>Delete</button> */}
                                </div> : true
                        }
                        </>
                    })}
                </>
            }
            </div>
        </div>
       
        </>
    )
}
export default MoviesPage;
