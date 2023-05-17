import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";

export const Login = () => {
    const navigate = useNavigate();
    const [loginUn, setLoginUn] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const setAccUser = userDetailsStore(state => state.updateAccUser);
    const setSuccess = userDetailsStore(state => state.updateSuccess);

    const onLoginClick = () => {
    
        let adminArr = JSON.parse(localStorage.getItem("Admin"));
        if(adminArr.Username == loginUn && adminArr.Password == loginPw){
            navigate('/');
            setSuccess("Padmavathi");
        }

        else{
            let storedArr = JSON.parse(localStorage.getItem("CurrentUser"));
        let foundUser = storedArr.find((user) => {
            if (user.Username == loginUn) {
                if (user.Password == loginPw) {
                    navigate('/');
                    setSuccess(user.Username);
                    console.log("login success");
                    return user;
                }
            }
        });
        setAccUser(foundUser);
        }
        
    }

    return (
        <main>
            Username: <input onChange={(e) => setLoginUn(e.target.value)} />
            Password: <input type="password" onChange={(e) => setLoginPw(e.target.value)} />
            <button onClick={() => onLoginClick()}>Submit</button>
        </main>
    )
}

export default Login;