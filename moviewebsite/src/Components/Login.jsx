import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import './Login.scss';

export const Login = () => {
    const navigate = useNavigate();
    const [loginUn, setLoginUn] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const setAccUser = userDetailsStore(state => state.updateAccUser);
    const setSuccess = userDetailsStore(state => state.updateSuccess);

    const onLoginClick = () => {
    
        let adminArr = JSON.parse(localStorage.getItem("Admin"));
        if(adminArr.Username == loginUn && adminArr.Password == loginPw){
            navigate('/AdminPortal');
            setSuccess("Padmavathi");
            localStorage.setItem("CurrentUser",JSON.stringify(adminArr));
        }

        else{
            let storedArr = JSON.parse(localStorage.getItem("UsersList"));
        let foundUser = storedArr.find((user) => {
            if (user.Username == loginUn) {
                if (user.Password == loginPw) {
                    navigate('/MoviesPage');
                    setSuccess(user.Username);
                    console.log("login success");
                    return user;
                }
                else{
                    alert("wrong pwd");
                }
            }
            else{
                alert("Wrong username");
            }
        });
        setAccUser(foundUser);
        localStorage.setItem("CurrentUser",JSON.stringify([foundUser]));
        }
        
    }

    return (
        <div className="Login">
            <main>
                <h1>Login</h1>
                <form>
                Username: <input onChange={(e) => setLoginUn(e.target.value)} />
            Password: <input type="password" onChange={(e) => setLoginPw(e.target.value)} />
            <button onClick={() => onLoginClick()}>Submit</button>

                </form>
            </main>
           
        </div>
    )
}

export default Login;