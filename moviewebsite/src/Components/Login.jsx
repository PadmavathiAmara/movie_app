import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetailsStore } from "../App";
import Person2Icon from '@mui/icons-material/Person2';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HttpsIcon from '@mui/icons-material/Https';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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
            navigate('/');
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
        localStorage.setItem("CurrentUser",JSON.stringify(foundUser));
        }
        
    }

    return (
        <div className="Login">
            <main>
                {/* <h1>Login</h1> */}
                <form>
        <h1>Login</h1>
                    <span>
                        <i>Welcome Back,</i>
                    </span>
                    <span>
                    <Person2Icon/><input onChange={(e) => setLoginUn(e.target.value)} placeholder="Enter your username!" />

                    </span>
                    <span>
                    <HttpsIcon/><input type="password" onChange={(e) => setLoginPw(e.target.value)} placeholder="Enter your login password!"/>

                    </span>
                    <div>
                    <button id="btn" onClick={() => onLoginClick()}>Login<PersonAddAlt1Icon id='icon'/></button>

                    </div>
                    <div id='routeLink'>
                        Not a User ? <button onClick={()=>navigate('/SignUp')} id='linkBtn'>Go and signup!<ArrowRightIcon/></button>
                    </div>

                </form>
            </main>
           
        </div>
    )
}

export default Login;