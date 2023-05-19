import { useEffect, useState } from 'react';
import './AdminPortal.scss';
import { useNavigate } from 'react-router-dom';
import { userDetailsStore } from '../App';

export const UpdateMovies = () => {

    const navigate = useNavigate();
    const showMovies = userDetailsStore(state => state.movies);
    let moviesArr = [];
    moviesArr = [showMovies];
    console.log(moviesArr);

    const [updateMovies, setUpdateMovies] = useState({
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
        moviesArr.map((mv) => {
            setUpdateMovies({
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

    return (
        <div id='movieAdding'>
            <div id='movie'>
                Movie Id: <input type="text" value={updateMovies.Id} name='Id'
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
                Movie Title: <input type="text"
                    value={updateMovies.Title}
                    name='Title'
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
                Movie Genre: <input type="text" name='Genre'
                    value={updateMovies.Genre}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })} />
                Movie languages: <input type="text" name='Languages'
                    value={updateMovies.Languages}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: [e.target.value] })}
                />
                Hero: <input type="text" name='Hero'
                    value={updateMovies.Hero}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
                />
                Heroine: <input type="text" name='Heroine'
                    value={updateMovies.Heroine}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
                />
                Movie Duration: <input type="time" name='Duration'
                    value={updateMovies.Duration}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
                />
                Movie Url: <input type="url" name='Url'
                    value={updateMovies.Url}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [e.target.name]: e.target.value })}
                />
                Available dates:
                <br />
                From: <input type="date" name='date_from'
                    value={updateMovies.date_from}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [[e.target.name]]: e.target.value })}
                />
                To: <input type="date" name='date_to'
                    value={updateMovies.date_to}
                    onChange={(e) => setUpdateMovies({ ...updateMovies, [[e.target.name]]: e.target.value })}
                />
            </div>
            <article onClick={() => onUpdateMovieClick()}>Update movie</article>
            <div>
                <button onClick={() => navigate('/MoviesPage')}>Go to moviespage</button>
            </div>
        </div>

    )
}

export default UpdateMovies;