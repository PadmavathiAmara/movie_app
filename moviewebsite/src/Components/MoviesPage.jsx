import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import './MoviesPage.scss';
import Header from "./Header";
import { Box, Modal } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { data } from "./assets/Seats";
import Swal from 'sweetalert2';

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
    const [openChild, setOpenChild] = useState(false);
    const [displayMv, setDisplayMv] = useState([]);
    const navigate = useNavigate();
    const setUpdateMovies = userDetailsStore(state => state.updateMovies);

    const [selectedSeats, setSelectedSeats] = useState([]);
    // const [changeSelected,setChangeSelected] = useState([])
    const [bookedTicketsArr, setBookedTicketsArr] = useState([]);
    const [isSelectedShow, setIsSelectedShow] = useState(true);
    const [showtype, setShowtype] = useState("Morning Show");
    const [finalTotal, setFinalTotal] = useState(0);
    const [finalarr, setFinalarr] = useState([]);
    let subTotal = 0;

    var color = 'gray';

    // const swal = new Swal();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenChild = () => setOpenChild(true);
    const handleCloseChild = () => setOpenChild(false);

    useEffect(() => {
        console.log(selectedSeats.length);
        console.log(selectedSeats);
        console.log(bookedTicketsArr);
        console.log(isSelectedShow);
        console.log(showtype);
    }, [selectedSeats, bookedTicketsArr, isSelectedShow, showtype])

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
        seatNo.isSelected = !seatNo.isSelected;
        console.log(seatNo);
        if (selectedSeats.length < 4) {
            if (seatNo.isSelected == true) {
                console.log(seatNo);
                color = 'green'
                console.log("green");
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
        else {
            seatNo.isSelected = !seatNo.isSelected;
            console.log(seatNo);
            // let seatFil = selectedSeats.filter((s) => {
            //     seatNo.isSelected = !seatNo.isSelected;
            //     console.log(seatNo);
            //     if (s.isSelected != false) {
            //         return s;
            //     }
            // })
            // console.log(seatFil);
            // // let filterd = seatFil.filter((f)=>{
            // //     if(f.seatValue == seatNo.seatValue){
            // //         seatNo.isSelected = false;
            // //         return seatNo;
            // //     }
            // // })
            // // console.log(filterd);
            // // setSelectedSeats(filterd);
            // setSelectedSeats(seatNo);
        }

        localStorage.setItem("SelectedSeats", JSON.stringify(selectedSeats));
        // if(selectedSeats.includes(seatNo)){
        //     console.log("green");
        //    return color ='green';
        // }
    }

    const bookingValidation = (bookedMv, finalSeat) => {

        if (finalSeat.length == 1) {
            finalSeat[0].isBooked = true;
            console.log(finalSeat);
        }
        else {
            finalSeat.map((seat) => {
                seat.isBooked = true;
                console.log(seat);
            })
        }

        if (isSelectedShow && selectedSeats.length > 0) {
            handleOpenChild();
            handleClose();
            // setFinalarr(finalSeat.concat(bookedMv)); 
            setBookedTicketsArr(finalSeat.concat(bookedMv, { showtype }));
            localStorage.setItem("BookedTickets", JSON.stringify(bookedTicketsArr));

        }
        else {
            console.log("please book tickets!")
        }
        // localStorage.setItem("BookedTickets", JSON.stringify(bookedTicketsArr));
        // if(bookedTicketsArr.includes(finalSeat)){
        //     console.log(finalSeat);
        //     finalSeat.seatValue.disabled = true;
        // }
    }

    const blocking = (blocked) => {
        console.log(blocked);
        {
            selectedSeats.map((seat, i) => {
                console.log("blocked");
                // if (i != (bookedTicketsArr.length - 1) && i != (bookedTicketsArr.length - 2)) {
                seat.isDisabled = true;
                // }
                console.log(blocked);

            })
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
                                                <div id="bookingBtn">
                                                    <button onClick={() => { handleOpen(); setDisplayMv(movie); }}>Book Now</button>
                                                </div>

                                            </section>
                                            {getCurrentUserData.Username == "Padmavathi" ?
                                                <div id="adminBtns">
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
                            {showtype == "Morning Show" ? <div id="theatre">
                                <div id="screen">screen</div>
                                <div id="seats">
                                    <div className="firstSec">
                                        {
                                            data.map((s, i) => {
                                                if (i < 10) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="firstSec">
                                        {
                                            data.map((s, i) => {
                                                if (i >= 10 && i < 20) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div id="topSeats">
                                    <div className="firstSec">
                                        {data.map((s, i) => {
                                            if (i >= 20 && i < 30) {
                                                return (
                                                    <>
                                                        {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                            if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            }
                                                        })}
                                                        {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                        {
                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button>
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                        }
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="firstSec">
                                        {data.map((s, i) => {
                                            if (i >= 30 && i < 40) {
                                                return (
                                                    <>
                                                        {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                            if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            }
                                                        })}
                                                        {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                        {
                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button>
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                        }
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="firstSec">
                                        {data.map((s, i) => {
                                            if (i >= 40 && i < 50) {
                                                return (
                                                    <>
                                                        {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                            if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            }
                                                        })}
                                                        {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                        {
                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button>
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                        }
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="firstSec">
                                        {data.map((s, i) => {
                                            if (i >= 50 && i < 60) {
                                                return (
                                                    <>
                                                        {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                            if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            }
                                                        })}
                                                        {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                        {
                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button>
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                        }
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="firstSec">
                                        {data.map((s, i) => {
                                            if (i >= 60 && i < 65) {
                                                return (
                                                    <>
                                                        {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                            if (i == bookedTicketsArr.length - 1 && showtype == "Morning Show") {
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            }
                                                        })}
                                                        {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                        {
                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button>
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                        }
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div> : 
                                showtype == "Matinee Show" ? <div id="theatre">
                                    <div id="screen">screen</div>
                                    <div id="seats">
                                        <div className="firstSec">
                                            {
                                                data.map((s, i) => {
                                                    if (i < 10) {
                                                        return (
                                                            <>
                                                                {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                    if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                        {
                                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                                    onClick={() => {
                                                                                        onSelectedSeats(s);
                                                                                    }} >{s.seatValue}</button>
                                                                        }
                                                                    }
                                                                })}
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className="firstSec">
                                            {
                                                data.map((s, i) => {
                                                    if (i >= 10 && i < 20) {
                                                        return (
                                                            <>
                                                                {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                    if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                        {
                                                                            !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                                    onClick={() => {
                                                                                        onSelectedSeats(s);
                                                                                    }} >{s.seatValue}</button>
                                                                        }
                                                                    }
                                                                })}
                                                                {
                                                                    !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                                        : <button disabled style={{ backgroundColor: "red" }}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                }
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div id="topSeats">
                                        <div className="firstSec">
                                            {data.map((s, i) => {
                                                if (i >= 20 && i < 30) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div className="firstSec">
                                            {data.map((s, i) => {
                                                if (i >= 30 && i < 40) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div className="firstSec">
                                            {data.map((s, i) => {
                                                if (i >= 40 && i < 50) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div className="firstSec">
                                            {data.map((s, i) => {
                                                if (i >= 50 && i < 60) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div className="firstSec">
                                            {data.map((s, i) => {
                                                if (i >= 60 && i < 65) {
                                                    return (
                                                        <>
                                                            {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                                                if (i == bookedTicketsArr.length - 1 && showtype == "Matinee Show") {
                                                                    {
                                                                        !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                            onClick={() => {
                                                                                onSelectedSeats(s);
                                                                            }} >{s.seatValue}</button>
                                                                            : <button disabled style={{ backgroundColor: "red" }}
                                                                                onClick={() => {
                                                                                    onSelectedSeats(s);
                                                                                }} >{s.seatValue}</button>
                                                                    }
                                                                }
                                                            })}
                                                            {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                                            {
                                                                !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>
                                                                    : <button disabled style={{ backgroundColor: "red" }}
                                                                        onClick={() => {
                                                                            onSelectedSeats(s);
                                                                        }} >{s.seatValue}</button>
                                                            }
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div> : true
                                //     showtype == "First Show" ? <div id="theatre">
                                //         <div id="screen">screen</div>
                                //         <div id="seats">
                                //             <div className="firstSec">
                                //                 {
                                //                     data.map((s, i) => {
                                //                         if (i < 10) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })
                                //                 }
                                //             </div>
                                //             <div className="firstSec">
                                //                 {
                                //                     data.map((s, i) => {
                                //                         if (i >= 10 && i < 20) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })
                                //                 }
                                //             </div>
                                //         </div>
                                //         <div id="topSeats">
                                //             <div className="firstSec">
                                //                 {data.map((s, i) => {
                                //                     if (i >= 20 && i < 30) {
                                //                         return (
                                //                             <>
                                //                                 {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                     if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     }
                                //                                 })}
                                //                                 {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                 {
                                //                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                         onClick={() => {
                                //                                             onSelectedSeats(s);
                                //                                         }} >{s.seatValue}</button>
                                //                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                 }
                                //                             </>
                                //                         )
                                //                     }
                                //                 })}
                                //             </div>
                                //             <div className="firstSec">
                                //                 {data.map((s, i) => {
                                //                     if (i >= 30 && i < 40) {
                                //                         return (
                                //                             <>
                                //                                 {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                     if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     }
                                //                                 })}
                                //                                 {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                 {
                                //                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                         onClick={() => {
                                //                                             onSelectedSeats(s);
                                //                                         }} >{s.seatValue}</button>
                                //                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                 }

                                //                             </>
                                //                         )
                                //                     }
                                //                 })}
                                //             </div>
                                //             <div className="firstSec">
                                //                 {data.map((s, i) => {
                                //                     if (i >= 40 && i < 50) {
                                //                         return (
                                //                             <>
                                //                                 {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                     if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     }
                                //                                 })}
                                //                                 {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                 {
                                //                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                         onClick={() => {
                                //                                             onSelectedSeats(s);
                                //                                         }} >{s.seatValue}</button>
                                //                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                 }
                                //                             </>
                                //                         )
                                //                     }
                                //                 })}
                                //             </div>
                                //             <div className="firstSec">
                                //                 {data.map((s, i) => {
                                //                     if (i >= 50 && i < 60) {
                                //                         return (
                                //                             <>
                                //                                 {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                     if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     }
                                //                                 })}
                                //                                 {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                 {
                                //                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                         onClick={() => {
                                //                                             onSelectedSeats(s);
                                //                                         }} >{s.seatValue}</button>
                                //                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                 }
                                //                             </>
                                //                         )
                                //                     }
                                //                 })}
                                //             </div>
                                //             <div className="firstSec">
                                //                 {data.map((s, i) => {
                                //                     if (i >= 60 && i < 65) {
                                //                         return (
                                //                             <>
                                //                                 {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                     if (i == bookedTicketsArr.length - 1 && showtype == "First Show") {
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     }
                                //                                 })}
                                //                                 {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                 {
                                //                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                         onClick={() => {
                                //                                             onSelectedSeats(s);
                                //                                         }} >{s.seatValue}</button>
                                //                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                 }
                                //                             </>
                                //                         )
                                //                     }
                                //                 })}
                                //             </div>
                                //         </div>
                                //     </div> :
                                //         <div id="theatre">
                                //             <div id="screen">screen</div>
                                //             <div id="seats">
                                //                 <div className="firstSec">
                                //                     {
                                //                         data.map((s, i) => {
                                //                             if (i < 10) {
                                //                                 return (
                                //                                     <>
                                //                                         {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                             if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                                 {
                                //                                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                                             onClick={() => {
                                //                                                                 onSelectedSeats(s);
                                //                                                             }} >{s.seatValue}</button>
                                //                                                 }
                                //                                             }
                                //                                         })}
                                //                                         {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }
                                //                                     </>
                                //                                 )
                                //                                 // className={`${selectedSeats.includes(s) ? "selected-seat" :"" }`}
                                //                             }
                                //                         })
                                //                     }
                                //                 </div>
                                //                 <div className="firstSec">
                                //                     {
                                //                         data.map((s, i) => {
                                //                             if (i >= 10 && i < 20) {
                                //                                 return (
                                //                                     <>
                                //                                         {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                             if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                                 {
                                //                                                     !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                                         : <button disabled style={{ backgroundColor: "red" }}
                                //                                                             onClick={() => {
                                //                                                                 onSelectedSeats(s);
                                //                                                             }} >{s.seatValue}</button>
                                //                                                 }
                                //                                             }
                                //                                         })}
                                //                                         {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                         {
                                //                                             !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                                 : <button disabled style={{ backgroundColor: "red" }}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                         }

                                //                                     </>
                                //                                 )
                                //                             }
                                //                         })
                                //                     }
                                //                 </div>
                                //             </div>
                                //             <div id="topSeats">
                                //                 <div className="firstSec">
                                //                     {data.map((s, i) => {
                                //                         if (i >= 20 && i < 30) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {/* <button onClick={() => { onSelectedSeats(s) }}>{s.seatValue}</button> */}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }

                                //                                 </>
                                //                             )
                                //                         }
                                //                     })}
                                //                 </div>
                                //                 <div className="firstSec">
                                //                     {data.map((s, i) => {
                                //                         if (i >= 30 && i < 40) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })}
                                //                 </div>
                                //                 <div className="firstSec">
                                //                     {data.map((s, i) => {
                                //                         if (i >= 40 && i < 50) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })}
                                //                 </div>
                                //                 <div className="firstSec">
                                //                     {data.map((s, i) => {
                                //                         if (i >= 50 && i < 60) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })}
                                //                 </div>
                                //                 <div className="firstSec">
                                //                     {data.map((s, i) => {
                                //                         if (i >= 60 && i < 65) {
                                //                             return (
                                //                                 <>
                                //                                     {bookedTicketsArr.map((m, i, bookedTicketsArr) => {
                                //                                         if (i == bookedTicketsArr.length - 1 && showtype == "Second Show") {
                                //                                             {
                                //                                                 !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                                     onClick={() => {
                                //                                                         onSelectedSeats(s);
                                //                                                     }} >{s.seatValue}</button>
                                //                                                     : <button disabled style={{ backgroundColor: "red" }}
                                //                                                         onClick={() => {
                                //                                                             onSelectedSeats(s);
                                //                                                         }} >{s.seatValue}</button>
                                //                                             }
                                //                                         }
                                //                                     })}
                                //                                     {
                                //                                         !s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                //                                             onClick={() => {
                                //                                                 onSelectedSeats(s);
                                //                                             }} >{s.seatValue}</button>
                                //                                             : <button disabled style={{ backgroundColor: "red" }}
                                //                                                 onClick={() => {
                                //                                                     onSelectedSeats(s);
                                //                                                 }} >{s.seatValue}</button>
                                //                                     }
                                //                                 </>
                                //                             )
                                //                         }
                                //                     })}
                                //                 </div>
                                //             </div>
                                //         </div>
                            }
                            {/* <div id="defaultDiv">select show time</div> */}
                            <div id='leftpart'>
                                <h2 id='heading'>Multiplex Theatre Screen</h2>
                                <div id="movie">
                                    {<div id="mvImg"><img src={displayMv.Url} /></div>}
                                    <div id="movieInfo">
                                        {(displayMv.Genre) ? <>{displayMv.Genre.map((genre) => <h2>{genre}</h2>)}</> : true}
                                        {/* <>{displayMv.Genre.map((genre) => <h2>{genre}</h2>)}</> */}
                                        {(displayMv.Languages) ?
                                            <>{displayMv.Languages.map((lang) => <div>{lang}</div>)}</> : true}
                                        <h2>{displayMv.Hero}</h2>
                                        <h2>{displayMv.heroine}</h2>
                                        <h2>{displayMv.Duration}</h2>
                                    </div>
                                </div>
                                <div id="tickets">
                                    <div id="ticketsSec">
                                        <span className="eachSec"><div className="key">Movie:</div><div className="value">{displayMv.Title}</div></span>
                                        <span className="eachSec"><div className="key">Time:</div>
                                            <select className="value" onChange={(e) => setShowtype(e.target.value)}>
                                                {/* <option>Please select show time!</option> */}
                                                <option value="Morning Show" >Morning Show(10:00 AM to 12:30 PM)</option>
                                                <option value="Matinee Show" >Matinee Show(1:00 PM to 3:30 PM)</option>
                                                <option value="First Show">First Show(4:00 PM to 6:30 PM)</option>
                                                <option value="Second Show" >Second Show(7:00 PM to 9:30 PM)</option>
                                            </select></span>
                                        {/* <span>Tickets: <span>
                                            {selectedSeats.length}
                                        </span></span> */}
                                        <span className="eachSec"><div className="key">Seats:</div> <div id="showSeats" className="value">
                                            {selectedSeats ?
                                                selectedSeats.length == 1 ?
                                                    <span>{selectedSeats[0].seatValue},</span> :
                                                    selectedSeats.map((seat) => {
                                                        return (
                                                            <>
                                                                {
                                                                    !seat.isDisabled ?
                                                                        <span>{seat.seatValue},</span>
                                                                        : true
                                                                }
                                                            </>
                                                        )
                                                    })
                                                : true}
                                        </div>
                                        </span>
                                    </div>

                                    <button id='book' onClick={() => {
                                        // onBooked(displayMv, selectedSeats); 
                                        bookingValidation(displayMv, selectedSeats, showtype);
                                        blocking(selectedSeats);
                                    }}>Book Now!</button>

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
            <Modal
                open={openChild}
                onClose={handleCloseChild}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {console.log(bookedTicketsArr)}
                    {bookedTicketsArr.map((mv, i, bookedTicketsArr) => {
                        if (i == bookedTicketsArr.length - 1) {
                            console.log(mv);
                            return <div id='successStmnt'>Your booking is successful for {mv.Title} <TaskAltIcon id='tick' /></div>
                        }
                    })}
                    <div id="seatsDisplay">Allocated seats are:{bookedTicketsArr.map((seat, i, bookedTicketsArr) => {
                        console.log(seat);
                        if (i != bookedTicketsArr.length - 1) {
                            return <div>{seat.seatValue}</div>
                        }
                    })}</div>
                    <div id="payment">
                        <div id="amountDiv">
                            <div id="amountDisplay">
                                {bookedTicketsArr.map((seat, i, bookedTicketsArr) => {
                                    console.log(bookedTicketsArr.length - 2);
                                    if (i != (bookedTicketsArr.length - 1) && i != (bookedTicketsArr.length - 2)) {
                                        subTotal = subTotal + seat.price;
                                    }
                                })}
                                <div className="Total">
                                    <div>SubTotal:</div>  <div>₹ {subTotal}</div>
                                </div>
                            </div>
                            <div className="Total">
                                <div>Convenience:</div>  <div>₹ {36}</div>
                            </div>

                        </div>
                        <hr />
                        <div className="Total" id='Total'>
                            <div>Total:</div>  <div>₹ {(subTotal + 36)}</div>
                            {/* <button onClick={()=>handleClick()}>Alert</button> */}
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default MoviesPage;
