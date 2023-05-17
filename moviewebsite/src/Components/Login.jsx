import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";

export const Login = () => {
    const navigate = useNavigate();
    const [loginUn, setLoginUn] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const setAccUser = userDetailsStore(state => state.updateAccUser);
    const setSuccess = userDetailsStore(state => state.updateSuccess);
    // const setSuc = userDetailsStore(state => state.success);
    
    const onLoginClick = () => {
        let storedArr = JSON.parse(localStorage.getItem("CurrentUser"));
        // console.log(storedArr);
        let foundUser = storedArr.find((user)=>{
            if(user.Username==loginUn){
                if(user.Password==loginPw){
                    navigate('/');
                    setSuccess(true);
                    console.log("login success");

                    return user;
                }
            }
        });
        setAccUser(foundUser);
      
    }

    return(
        <>
        Username: <input onChange={(e) => setLoginUn(e.target.value)}/>
        Password: <input onChange={(e) => setLoginPw(e.target.value)}/>
        <button onClick={()=>onLoginClick()}>Submit</button>
        </>
    )
}

export default Login;