export let data=[];

for(let i=1;i<=65;i++){
    let test;
    if(i>=1 && i<=10){
        test={seatValue: "G"+i,
        isSelected: false,
        isBooked: false,
        isDisabled: false,
        price: 200
    }
    
    }
     if(i>=11 && i<=20){
     test={seatValue: "F"+(i-10),
     isSelected: false,
     isBooked: false,
        isDisabled: false,
        price: 200 
     }   

    } if(i>=21 && i<=30){
        test={seatValue: "E"+(i-20),
        isSelected: false,
        isBooked: false,
        price: 150 
        }
    }
    if(i >=31 && i<=40){
        test={seatValue: "D"+(i-30),
        isSelected: false,
        isBooked: false,
        price: 150 
        }

    }
    if(i >=41 && i<=50){
        test={seatValue: "C"+(i-40),
        isSelected: false,
        isBooked: false,
        price: 100 
        }
    }
    if(i >=51 && i<=60){
        test={seatValue: "B"+(i-50),
        isSelected: false,
        isBooked: false,
        price: 100 
        }
    }
    if(i >=61 && i<=65){
        test={seatValue: "A"+(i-60),
        isSelected: false,
        isBooked: false,
        price: 100 
        }
    }


    data.push(test)
}

console.log(data);
console.log(data[0]);



{/* <div className="firstSec">
                                        {
                                            data.map((s, i) => {
                                                if (i < 10) {
                                                    return (
                                                        <>
                                                            {!s.isDisabled ? <button className={`seatDef ${s.isSelected && 'selected-seat'}`}
                                                                onClick={() => {
                                                                    onSelectedSeats(s);
                                                                }} >{s.seatValue}</button> 
                                                                : <button disabled style={{ backgroundColor: "red" }}
                                                                    onClick={() => {
                                                                        onSelectedSeats(s);
                                                                    }} >{s.seatValue}</button>}
                                                        </>
                                                    )
                                                    // className={`${selectedSeats.includes(s) ? "selected-seat" :"" }`}
                                                }
                                            })
                                        }
                                    </div> */}