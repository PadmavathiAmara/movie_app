import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Favourites from './Components/Favourites';
// import { useEffect, useState } from 'react';
import {create} from 'zustand';

export const userDetailsStore = create((set)=>(
  {
    users: [],
    updateUsers: (Currentuser)=>set((state)=>({
      users: [...state.users,[Currentuser]]
    })),
    success: false,
    updateSuccess: (p)=>set((state)=>({
      success: p
    })),
    accUser:[],
    updateAccUser: (val)=>set(()=>({
      accUser:[val]
    }))
  }
))

const App = () => {
  
  // const [userName, setusername] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPwd, setConfirmPwd] = useState("");
  // const [mobileNo, setMobileNo] = useState("");
  // const [checkBox, setCheckBox] = useState();
  const navigate = useNavigate();

  // const validateUsername = () =>{
    // let usernames = localStorage.getItem(userName)
    // if(usernames != userName){
    //   if(userName.match("^[A-Za-z][A-Za-z0-9_@$#]{7,29}$")){
    //     console.log(userName);
    //     return true;
    //     // localStorage.setItem("UserName", JSON.stringify(userName));
    //   }else{
    //     alert("Invalid Username!");
    //   }
    // }else{
    //   alert("Username is already available!");
    // }
    
  // }

  // useEffect(()=>{
  //   console.log(checkBox);

  // },[checkBox]);

  // const validateEmailId = () => {
  //  if(emailId.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
  //   // localStorage.setItem("EmailId", JSON.stringify(emailId));
  //   return true;
  //  }
  //  else{
  //   alert("Invalid Email Id!");
  //  }
  // }

  // const validatePassword = () => {
  //   if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)){
  //     // localStorage.setItem("Password", JSON.stringify(password));
  //     return true;
  //   }
  //   else{
  //     alert("Invalid password!");
  //   }
  // }

  // const validateConfirmPassword = () => {
    // if(confirmPwd == password){
    //   return true;
    // }
    // else{
    //   alert("Password's does not match!");
    // }
  // }

  // const validateMobileNo = () => {
    // if(mobileNo.match(/^[0]?[6789]\d{9}$/)){
    //   // localStorage.setItem("MobileNo", JSON.stringify(mobileNo));
    //   return true;
    // }
    // else{
    //   alert("Invalid Mobile Number!")
    // }
  // }

  // const validateCheckBox = () => {
  //   if(checkBox){
  //     return true;
  //   }
  //   else{
  //     alert("Please select the checkbox!");
  //   }
  // }

  // const onSignUpClick = () =>{
  //   if(userName && emailId && password && confirmPwd && mobileNo && checkBox){
  //     navigate('/Login');
  //     localStorage.setItem()
  //   }
  // }


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Favourites' element={<Favourites/>}/>
      </Routes>
    </div>
  );
}

export default App;
