import { useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

export const AdminPortal = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState({
        isDeleted: false,
    })

    const [idToAccess, setIdToAccess] = useState("");
    const [flagVal, setFlagVal] = useState("");
    // const [updateFlagVal, setUpdateFlagVal] = useState("");
    const [fetchedMovie, setFetchedMovie] = useState("");

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
// console.log(movies)

     const onFetch = () => {
        let getAllMovies = JSON.parse(localStorage.getItem("MoviesList"));
        console.log(getAllMovies)
        let foundMv =  getAllMovies.filter((mov)=>{
            console.log(mov)
            console.log(mov.Id)
            if(mov.Id == idToAccess){
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
        fetchedMovie[0].isDeleted = flagVal;
        console.log(fetchedMovie[0].isDeleted)
     }

     const onSetUpdatedFlagMovie = () => {
        let acessAllMovies = JSON.parse(localStorage.getItem("MoviesList"));
        let leftOverMv =  acessAllMovies.filter((mov)=>{
            console.log(mov)
            console.log(mov.Id)
            if(mov.Id !== idToAccess){
                console.log("in if")
                return mov;
            }
        });
        localStorage.removeItem("MoviesList");
        localStorage.setItem("updatedMvList",JSON.stringify(leftOverMv));
        let upd = JSON.parse(localStorage.getItem("updatedMvList"));
        upd.push(fetchedMovie);
        localStorage.setItem("MoviesList",JSON.stringify(upd));
     }


    return(
        <>
        <Home/>

        <div className='Admin'>

        <div id='movieAdding'>
         {/* <div id='movie'> */}
         <h2>Add Movie</h2>
          <span>
          Movie Id: <input type="text" value={movies.Id} name='Id' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
            </span>  
         <span>
         Movie Title: <input type="text" value={movies.Title} name='Title' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
         </span>
           <span>
           Movie Genre: <input type="text" name='Genre' 
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}/>
           </span>
           <span>
           Movie languages: <input type="text" name='Languages'
            onChange={(e)=>setMovies({...movies, [e.target.name]: [e.target.value]})}
            />
           </span>
           <span>
           Hero: <input type="text" name='Hero'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
           </span>
            <span>
            Heroine: <input type="text" name='Heroine'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            </span>
            <span>
            Movie Duration: <input type="time" name='Duration'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            </span>
            <span>
            Movie Url: <input type="url" name='Url'
            onChange={(e)=>setMovies({...movies, [e.target.name]: e.target.value})}
            />
            </span>

            <div>
            Available dates: 

            <br/> 
            <span id='dateinput'>
            From: <input className='dateinput' type="date" name='date_from'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            /> 
            </span>

            <br/>
            <span id='dateinput'>
            To: <input className='dateinput' type="date" name='date_to'
            onChange={(e)=>setMovies({...movies, [[e.target.name]]: e.target.value})}
            />
            </span>
            
            </div>
            
        <button id='btn' onClick={()=>onAddMovieClick()}>Add movie</button>

        {/* </div> */}
        {/* <div>
            <button onClick={()=>navigate('/MoviesPage')}>Go to moviespage</button>
        </div> */}
        </div>  
        <div className='movieUpdate'>
            <h2>Update Movie</h2>
            {/* <div className='dataDiv'> */}
            <span>
            Id to access movie:<input onChange={(e)=>setIdToAccess(e.target.value)}/> 
        <button onClick={()=>onFetch()}>Fetch</button>
            </span>
            
<span>
Update status:<input onChange={(e)=>setFlagVal(e.target.value)} />
<button onClick={()=>onSetFlagValueClick()}>setFlagValue</button>

</span>
        {/* {fetchedMovie ? <input type='text' name='isDeleted' value={fetchedMovie[0][0].isDeleted} onChange={(e)=>setUpdateFlagVal(e.target.value)}/> : "no fetched movies" } */}
        <button onClick={()=>onSetUpdatedFlagMovie()}>SetUpdatedFlagMovie</button>
            {/* </div> */}
       

        </div>
        </div>
        </>
    )
}

export default AdminPortal;