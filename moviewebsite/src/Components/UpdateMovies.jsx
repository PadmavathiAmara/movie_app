import { useEffect, useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';
import { userDetailsStore } from '../App';
import Header from './Header';

export const UpdateMovies = () => {

    const navigate = useNavigate();
    const [idToAccess, setIdToAccess] = useState("");
    const [flagVal, setFlagVal] = useState();
    const [fetchedMovie, setFetchedMovie] = useState();

    const showMovies = userDetailsStore(state => state.movies);
    let moviesArr = [];
    moviesArr = [showMovies];
    console.log(moviesArr);

    const [updateMovies, setUpdateMovies] = useState({
        isDeleted: false,
        Id: '',
        Title: '',
        Genre: '',
        Languages: [],
        Hero: '',
        Heroine: '',
        Duration: '',
        Url: '',
        date_from: '',
        date_to: '',
    });

    useEffect(() => {
        onLoadSetMovies();
    }, [])

    const onLoadSetMovies = () => {
        console.log(moviesArr);
       if(moviesArr[0].length == 1){
        moviesArr.map((mv) => {
            console.log("in map");
            return  setUpdateMovies({
                  isDeleted: false,
                  Id: mv.mov.Id,
                  Title: mv.mov.Title,
                  Genre: mv.mov.Genre,
                  // Languages:[],
                  Hero: mv.mov.Hero,
                  Heroine: mv.mov.Heroine,
                  Duration: mv.mov.Duration,
                  Url: mv.mov.Url,
                  date_from: mv.mov.date_from,
                  date_to: mv.mov.date_to,
              });
          })
       }        
    }

    const onUpdateMovieClick = () => {
        let accessMovieArr = JSON.parse(localStorage.getItem("MoviesList"));
        console.log(accessMovieArr);
        let leftOverMv = accessMovieArr.filter((m) =>
            m.Id !== updateMovies.Id
        )
        // console.log(leftOverMv);
        localStorage.removeItem("MoviesList");
        localStorage.setItem("updatedMvList", JSON.stringify(leftOverMv))
        let upd = JSON.parse(localStorage.getItem("updatedMvList"))
        upd.push(updateMovies)
        localStorage.setItem("MoviesList", JSON.stringify(upd))
        
    }

    const onFetch = () => {
        let getAllMovies = JSON.parse(localStorage.getItem("MoviesList"));
        console.log(getAllMovies)
        let foundMv = getAllMovies.filter((mov) => {
            console.log(mov)
            console.log(mov.Id)
            if (mov.Id == idToAccess) {
                console.log("in if")
                return mov;
            }
        })
        console.log(foundMv);
        setFetchedMovie(foundMv);
    }

    console.log(fetchedMovie)
    //  console.log(fetchedMovie[0].isDeleted)

    const onSetFlagValueClick = () => {
        console.log(flagVal)
        fetchedMovie[0].isDeleted = flagVal;
        console.log(fetchedMovie[0].isDeleted)
    }

    const onSetUpdatedFlagMovie = () => {
        let acessAllMovies = JSON.parse(localStorage.getItem("MoviesList"));
        let leftOverMv = acessAllMovies.filter((mov) => {
            console.log(mov)
            console.log(mov.Id)
            if (mov.Id !== idToAccess) {
                console.log("in if")
                return mov;
            }
        });
        localStorage.removeItem("MoviesList");
        localStorage.setItem("updatedMvList", JSON.stringify(leftOverMv));
        let upd = JSON.parse(localStorage.getItem("updatedMvList"));
        upd.push(fetchedMovie[0]);
        localStorage.setItem("MoviesList", JSON.stringify(upd));
    }

    return (
        <>
        <Header/>
        {updateMovies ?
        <div id='movieUpdating'>
        <div id='movie'>
            
        <h2>Update Movie</h2>
        <div id='infoDiv'>
            <span>
            Movie Id: <input type="text" value={updateMovies.Id} name='Id'
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
            </span>
            <span>
            Movie Title: <input type="text"
                value={updateMovies.Title}
                name='Title'
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
                </span>
                <span>
            Movie Genre: <input type="text" name='Genre'
                value={updateMovies.Genre}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
                </span>
                <span>
            Movie languages: <input type="text" name='Languages'
                value={updateMovies.Languages}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: [e.target.value] })}
            />
            </span>
            <span>
            Hero: <input type="text" name='Hero'
                value={updateMovies.Hero}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
            />
            </span>
            <span>
            Heroine: <input type="text" name='Heroine'
                value={updateMovies.Heroine}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
            />
            </span>
            <span>
            Movie Duration: <input type="time" name='Duration'
                value={updateMovies.Duration}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
            />
            </span>
            <span>
            Movie Url: <input type="url" name='Url'
                value={updateMovies.Url}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
            />
            </span>
            <div id='dates'>
            <p>Available dates:</p>
            <div>
            <span className='dateinput'>
            From: <input type="date" name='date_from' value={updateMovies.date_from}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [[e.target.name]]: e.target.value })}
            />
            </span>
            <br/>
            <span className='dateinput'>
            To: <input type="date" name='date_to' value={updateMovies.date_to}
                onChange={(e) => setUpdateMovies({ ...updateMovies, [[e.target.name]]: e.target.value })}
            />
            </span>
            </div>
            </div>
        </div>
        <button id='btn' onClick={() => onUpdateMovieClick()}>Update movie</button>
        </div>

        <div>
            <button onClick={() => navigate('/MoviesPage')}>Go to moviespage</button>
        </div>
    </div> : "No updates available!" }
        
        <div className='delStatusUpdate'>
        <h2>Update Movie</h2>
        {/* <div className='dataDiv'> */}
        <span>
            Id to access movie:<input onChange={(e) => setIdToAccess(e.target.value)} />
            <button onClick={() => onFetch()}>Fetch</button>
        </span>

        <span>
            Update status:
            {/* <input type='text' name='flag' onChange={(e) => setFlagVal(e.target.checked)}  />  */}
            {/* <input type='checkbox' name='flag' onChange={(e) => setFlagVal(e.target.checked)} checked/> False */}
            <button onClick={()=>setFlagVal(Boolean(" "))}>True</button>
            <button onClick={()=>setFlagVal(Boolean(""))}>False</button>
            <button onClick={() => onSetFlagValueClick()}>setFlagValue</button>

        </span>
        {/* {fetchedMovie ? <input type='text' name='isDeleted' value={fetchedMovie[0][0].isDeleted} onChange={(e)=>setUpdateFlagVal(e.target.value)}/> : "no fetched movies" } */}
        <button onClick={() => onSetUpdatedFlagMovie()}>SetUpdatedFlagMovie</button>
        {/* </div> */}


    </div>
    </>
    )
}

export default UpdateMovies;