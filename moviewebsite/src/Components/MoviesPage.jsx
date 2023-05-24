import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import './MoviesPage.scss';
import Home from "./Home";
import Header from "./Header";
import { Box, Button, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const MoviesPage = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const setUpdateMovies = userDetailsStore(state => state.updateMovies);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let listOfMovies = JSON.parse(localStorage.getItem("MoviesList"));
    console.log(listOfMovies);

    let getCurrentUserData = JSON.parse(localStorage.getItem("CurrentUser"))

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
            <Header />
            <div className="moviesPage">
        <div id='heading'><h2>Endless Entertainment!</h2></div>

                <div className="moviesDiv">

                    {!listOfMovies ? "Loading" :
                        <>
                            {listOfMovies.map((movie) => {
                                return <>{
                                    movie.isDeleted == false ?
                                        <div className="movie">
                                            {/* <h2>{movie.Genre}</h2> */}
                                            {/* {(movie.Languages) ?
                                        <>{movie.Languages.map((lang) => <div>{lang}</div>)}</> : true} */}
                                            {/* <h2>{movie.Hero}</h2> */}
                                            {/* <h2>{movie.heroine}</h2> */}
                                            {/* <h2>{movie.Duration}</h2> */}
                                            <section>
                                                {<img src={movie.Url} />}
                                                <h2>{movie.Title}</h2>
                                        <button onClick={handleOpen}>Book Now</button>

                                            </section>
                                            {getCurrentUserData.Username == "Padmavathi" ? 
                                            <div>
                                            <button onClick={() => {
                                                navigate('/UpdateMovies');
                                                setUpdateMovies(movie);
                                            }}><EditIcon/></button>
                                            <button onClick={() => {onDeleteClick(movie);
                                    navigate('/MoviesPage');
                                   }}><DeleteIcon/></button></div> : true}
                                        </div> : true}
                                </>
                            })}
                        </>
                    }
                </div>
            </div>
            <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

<div id="mainDiv">
            <div id="theatre">
<div id="screen">screen</div>
<div id="seats">
<div className="firstSec">
    <button>A1</button>
    <button>A2</button>
    <button>A3</button>
    <button>A4</button>
    <button>A5</button>
    <button>A6</button>
    <button>A7</button>
    <button>A8</button>
    <button>A9</button>
    <button>A10</button>
</div>
<div className="firstSec">
    <button>B1</button>
    <button>B2</button>
    <button>B3</button>
    <button>B4</button>
    <button>B5</button>
    <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button>
</div>
</div>
<div id="topSeats">
    <div className="firstSec">
    <button>B1</button>
    <button>B2</button>
    <button>B3</button>
    <button>B4</button>
    <button>B5</button>
    <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button>
    </div>
    <div className="firstSec">
    <button>B1</button>
    <button>B2</button>
    <button>B3</button>
    <button>B4</button>
    <button>B5</button>
    <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button>
    </div>
    <div className="firstSec">
    <button>B1</button>
    <button>B2</button>
    <button>B3</button>
    <button>B4</button>
    <button>B5</button>
    <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button>
    </div>
    <div className="firstSec">
    <button>B1</button>
    <button>B2</button>
    <button>B3</button>
    <button>B4</button>
    <button>B5</button>
    <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button>
    </div>
    <div className="firstSec">
    <button className="seat">B1</button>
    <button className="seat">B2</button>
    <button className="seat">B3</button>
    <button className="seat">B4</button>
    <button className="seat">B5</button>
    {/* <button>B6</button>
    <button>B7</button>
    <button>B8</button>
    <button>B9</button>
    <button>B10</button> */}
    </div>

</div>



            </div>
            <div id='leftpart'>
            {listOfMovies.map((movie) => {
                                return <>
                                {movie.isDeleted == false ?
                                        <div id="movie">
                                            <h2>{movie.Genre}</h2>
                                            {(movie.Languages) ?
                                        <>{movie.Languages.map((lang) => <div>{lang}</div>)}</> : true}
                                            <h2>{movie.Hero}</h2>
                                            <h2>{movie.heroine}</h2>
                                            <h2>{movie.Duration}</h2>
                                                {<img src={movie.Url} />}
                                                <h2>{movie.Title}</h2>
                                        </div> : true}
                                </>
                            })}

                            <div id="tickets">
                                <div id="ticketsSec">
                                <span>Movie: <span>bfvh</span></span>
                                <span>Time: <span>fvnfnvkjfv</span></span>
                                <span>Tickets: <span>fvbjdf</span></span>
                                <span>Total: <span>dfge</span></span>
                                <span>Seats: <div></div></span>
                                </div>
                                
                                <button id='book'>Book Now!</button>

                            <div id="clrBtns">
                               <span className="btns">
                                <div id="available"></div>Available
                                </span> 
                                <span className="btns">
                                <div id="sold"></div>Sold
                                </span>
                                <span className="btns">
                                <div id="selected"></div>Selected
                                </span>
                            </div>
                            </div>
            </div>
            </div>
        </Box>
      </Modal>
    </div>


        </>
    )
}
export default MoviesPage;
