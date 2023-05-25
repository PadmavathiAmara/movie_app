import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import './MoviesPage.scss';
import Home from "./Home";
import Header from "./Header";
import { Box, Button, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { A } from "./assets/Seats";

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
    const [displayMv, setDisplayMv] = useState([]);
    const navigate = useNavigate();
    const setUpdateMovies = userDetailsStore(state => state.updateMovies);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    // const [changeSelected,setChangeSelected] = useState([])

    useEffect(() => {
        console.log(selectedSeats.length);
        console.log(selectedSeats);
    }, [selectedSeats])

    let listOfMovies = JSON.parse(localStorage.getItem("MoviesList"));

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

    const onSelectedSeats = (seatNo) => {
        console.log(seatNo);
        seatNo.isSelected= !seatNo.isSelected;
        console.log(seatNo);
        if (selectedSeats.length < 4) {
            if (seatNo.isSelected == true) {
            console.log(seatNo);
                setSelectedSeats([...selectedSeats, seatNo])
            } else {
            console.log(seatNo);
                let seatFilter = selectedSeats.filter((s) => {
                    if (s.isSelected != false) {
                        return s;
                    }
                })
                setSelectedSeats(seatFilter);
            }
        }
        else{
            seatNo.isSelected= !seatNo.isSelected;
        console.log(seatNo);
            let seatFil = selectedSeats.filter((s) => {
            seatNo.isSelected= !seatNo.isSelected;
            console.log(seatNo);
                if (s.isSelected != false) {
                    return s;
                }
            })
        console.log(seatFil);
        // let filterd = seatFil.filter((f)=>{
        //     if(f.seatValue == seatNo.seatValue){
        //         seatNo.isSelected = false;
        //         return seatNo;
        //     }
        // })
        // console.log(filterd);
        // setSelectedSeats(filterd);
        setSelectedSeats(seatFil);

        }
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
                                        <div className="movie" >
                                            {/* <h2>{movie.Genre}</h2> */}
                                            {/* {(movie.Languages) ?
                                        <>{movie.Languages.map((lang) => <div>{lang}</div>)}</> : true} */}
                                            {/* <h2>{movie.Hero}</h2> */}
                                            {/* <h2>{movie.heroine}</h2> */}
                                            {/* <h2>{movie.Duration}</h2> */}
                                            <section>
                                                {<img src={movie.Url} />}
                                                <h2>{movie.Title}</h2>
                                                <button onClick={() => { handleOpen(); setDisplayMv(movie); }}>Book Now</button>

                                            </section>
                                            {getCurrentUserData.Username == "Padmavathi" ?
                                                <div>
                                                    <button onClick={() => {
                                                        navigate('/UpdateMovies');
                                                        setUpdateMovies(movie);
                                                    }}><EditIcon /></button>
                                                    <button onClick={() => {
                                                        onDeleteClick(movie);
                                                        navigate('/MoviesPage');
                                                    }}><DeleteIcon /></button></div> : true}
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
                                        {A.map((a) => {
                                            return (
                                                <button onClick={() => { onSelectedSeats(a) }}>{a.seatValue}</button>
                                            )
                                        })}



                                        {/* <button onClick={()=>{onSelectedSeats("A2")}}>A2</button>
    <button onClick={()=>{onSelectedSeats("A3")}}>A3</button>
    <button onClick={()=>{onSelectedSeats("A4")}}>A4</button>
    <button onClick={()=>{onSelectedSeats("A5")}}>A5</button>
    <button onClick={()=>{onSelectedSeats("A6")}}>A6</button>
    <button onClick={()=>{onSelectedSeats("A7")}}>A7</button>
    <button onClick={()=>{onSelectedSeats("A8")}}>A8</button>
    <button onClick={()=>{onSelectedSeats("A9")}}>A9</button>
    <button onClick={()=>{onSelectedSeats("A10")}}>A10</button> */}
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
                                {/* {displayMv.map((movie) => { */}
                                {/* return <> */}
                                {/* {movie.isDeleted == false ? */}
                                <div id="movie">
                                    {<div id="mvImg"><img src={displayMv.Url} /></div>}
                                    <div id="movieInfo">
                                        <h2>{displayMv.Genre}</h2>
                                        {(displayMv.Languages) ?
                                            <>{displayMv.Languages.map((lang) => <div>{lang}</div>)}</> : true}
                                        <h2>{displayMv.Hero}</h2>
                                        <h2>{displayMv.heroine}</h2>
                                        <h2>{displayMv.Duration}</h2>
                                    </div>

                                </div>
                                {/* : true} */}
                                {/* </> */}
                                {/* })} */}

                                <div id="tickets">
                                    <div id="ticketsSec">
                                        <span>Movie: <span>{displayMv.Title}</span></span>
                                        <span>Time: <select>
                                            <option value="Select show time">Select show time!</option>
                                            <option value="Morning Show(10:00 AM to 12:30 PM)">Morning Show(10:00 AM to 12:30 PM)</option>
                                            <option value="Matinee Show(1:00 PM to 3:30 PM)">Matinee Show(1:00 PM to 3:30 PM)</option>
                                            <option value="First Show(4:00 PM to 6:30 PM)">First Show(4:00 PM to 6:30 PM)</option>
                                            <option value="Second Show(7:00 PM to 9:30 PM)">Second Show(7:00 PM to 9:30 PM)</option>

                                        </select></span>
                                        <span>Tickets: <span>
                                            {/* {selectedSeats.length} */}
                                        </span></span>
                                        <span>Total: <span></span></span>
                                        {/* <span>Seats: <div id="showSeats">
                                                {selectedSeats.map((seat)=>{
                                                    return(
                                                        <button>{seat}</button>

                                                    )
                                                })}
                                               </div>
                                    </span> */}
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
