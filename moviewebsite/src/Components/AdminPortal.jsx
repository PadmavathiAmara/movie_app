import { useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import Header from './Header';

export const AdminPortal = () => {


    const [movies, setMovies] = useState({
        isDeleted: false,
    })

  
    // const [updateFlagVal, setUpdateFlagVal] = useState("");

    const onAddMovieClick = () => {
        let getOldMovies = JSON.parse(localStorage.getItem("MoviesList"));
        if (!getOldMovies) {
            localStorage.setItem("MoviesList", JSON.stringify([movies]));
        }
        else {
            let storedMoviearr = JSON.parse(localStorage.getItem("MoviesList"));
            storedMoviearr.push(movies);
            localStorage.setItem("MoviesList", JSON.stringify(storedMoviearr));
        }
    }
    // console.log(movies)

    


    return (
        <>
        <Header/>
            

            <div className='Admin'>

                <div id='movieAdding'>
                    {/* <div id='movie'> */}
                    <h2>Add Movie</h2>
                    <div id='infoDiv'>
                    <span>
                        Movie Id: <input type="text" value={movies.Id} name='Id'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })} />
                    </span>
                    <span>
                        Movie Title: <input type="text" value={movies.Title} name='Title'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })} />
                    </span>
                    <span>
                        Movie Genre: <input type="text" name='Genre'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })} />
                    </span>
                    <span>
                        Movie languages: <input type="text" name='Languages'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: [e.target.value] })}
                        />
                    </span>
                    <span>
                        Hero: <input type="text" name='Hero'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })}
                        />
                    </span>
                    <span>
                        Heroine: <input type="text" name='Heroine'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })}
                        />
                    </span>
                    <span>
                        Movie Duration: <input type="time" name='Duration'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })}
                        />
                    </span>
                    <span>
                        Movie Url: <input type="url" name='Url'
                            onChange={(e) => setMovies({ ...movies, [e.target.name]: e.target.value })}
                        />
                    </span>
                    
                    
                        {/* <div id="text" >Available dates:</div> */}
                        <div id='dates'>

                        <p>Available dates:</p>
                        <div>
                        <span id='dateinput'>
                            From: <input className='dateinput' type="date" name='date_from'
                                onChange={(e) => setMovies({ ...movies, [[e.target.name]]: e.target.value })}
                            />
                        </span>

                        <br />
                        <span id='dateinput'>
                            To: <input className='dateinput' type="date" name='date_to'
                                onChange={(e) => setMovies({ ...movies, [[e.target.name]]: e.target.value })}
                            />
                        </span>
                        </div>
                    </div>
</div>
                    <button id='btn' onClick={() => onAddMovieClick()}>Add movie</button>

                    {/* </div> */}
                    {/* <div>
            <button onClick={()=>navigate('/MoviesPage')}>Go to moviespage</button>
        </div> */}
                </div>
                
            </div>
        </>
    )
}

export default AdminPortal;