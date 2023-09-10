import './SignUp.scss';
import { userDetailsStore } from '../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HttpsIcon from '@mui/icons-material/Https';
import CallIcon from '@mui/icons-material/Call';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const SignUp = () => {
  const navigate = useNavigate();
  const [un, setUn] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [gender, setGender] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const onSignUpClick = (e) => {
    e.preventDefault();
    if (un !== "" && email !== "" && pw !== "" && phnNo !== "" && gender !== "" && checkBox !== false && confirmPw !== "") {
      let getOldData = localStorage.getItem("UsersList");
      //localstorage is empty, add data
      if (!getOldData) {
        const User = {
          Username: un,
          EmailId: email,
          Password: pw,
          MobileNo: phnNo,
          Gender: gender,
        };
        setUserArr(User);
        navigate('/Login');
    localStorage.setItem('UsersList', JSON.stringify([User]));
      }
      else {
        //localstorage is not empty, check if username exists
        if (getOldData.includes(un)) {
          alert("username already exists");
        }
        else {
          //username doesnt exist, add data
          const User = {
            Username: un,
            EmailId: email,
            Password: pw,
            MobileNo: phnNo,
            Gender: gender,
          };
          setUserArr(User);
          navigate('/Login');
          const storedArr = JSON.parse(localStorage.getItem("UsersList")) || [];
    storedArr.push(User);
    localStorage.setItem('UsersList', JSON.stringify(storedArr));
        }
      }
    }
  }

  const userarr = userDetailsStore(state => state.users)
  const setUserArr = userDetailsStore(state => state.updateUsers)

  const validateUsername = () => {
    if (un.match("^[A-Za-z][A-Za-z]{4,29}$")) {
      console.log(un);
      return true;
      // return <h4>Qualified</h4>;
    }
    else{
      console.log("Invalid Username!");
      // return <h4>User exists</h4>;
    }
  }

  const validateEmailId = () => {
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return true;
    }
    //  else{
    //   alert("Invalid Email Id!");
    //  }
  }

  const validatePassword = () => {
    if (pw.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/)) {
      return true;
    }
    // else{
    //   alert("Invalid password!");
    // }
  }

  const validateConfirmPassword = () => {
    if (confirmPw == pw) {
      return true;
    }
    // else{
    //   alert("Password's does not match!");
    // }
  }

  const validateMobileNo = () => {
    if (phnNo.match(/^[0]?[6789]\d{9}$/)) {
      return true;
    }
    // else{
    //   alert("Invalid Mobile Number!")
    // }
  }

  const onGenderSelect = (e) => {
    if (e.target.checked) {
      setGender(e.target.value);
    }
    // else{
    //     alert("Please select your gender!");
    // }
  }






  useEffect(() => {
    console.log(un);
    console.log(email);
    console.log(pw);
    console.log(confirmPw);
    console.log(phnNo);
    console.log(userarr);
    console.log(gender);
    console.log(checkBox);
  }, [un, pw, email, confirmPw, phnNo, userarr, gender, checkBox])

  return (
    <div className='signup'>
      <main>
      <form onSubmit={onSignUpClick}>
      <h1>SignUp</h1>
        <span>
       <Person2Icon/><input onChange={(e) => setUn(e.target.value)} onBlur={() => validateUsername()} placeholder='Enter your fullname!' required />
        </span>
       {/* <Validate_Username/> */}
        <span>
        <EmailRoundedIcon/><input type='email' onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmailId()} placeholder='Enter your Email Id!' required />
        </span>
        <span>
        <HttpsIcon/><input type='password' onChange={(e) => setPw(e.target.value)} onBlur={() => validatePassword()} placeholder='Enter your password!' required />
        </span>
        <span>
        <HttpsIcon/><input type='password' onChange={(e) => setConfirmPw(e.target.value)} onBlur={() => validateConfirmPassword()} placeholder='Confirm password!' required />
        </span>
        <span>
        <CallIcon/><input onChange={(e) => setPhnNo(e.target.value)} onBlur={() => validateMobileNo()} placeholder='Enter your mobile number!' required />
        </span>
        <div id='gen'>
        <div className='genderDiv' >
        <input className='gender' type="radio" name="gender" value="female" checked={gender == 'female'} onChange={(e) => onGenderSelect(e)} required /><p>Female</p> 
        </div>
        <div className='genderDiv'>
        <input className='gender' type="radio" name="gender" value="male" checked={gender == 'male'} onChange={(e) => onGenderSelect(e)} required /><p>Male</p>
        </div>
        </div>
       <div className='check'>
       <input type='checkbox' id='check' onChange={(e) => setCheckBox(e.target.checked)} required /><p>I agree to the terms and conditions!</p> 
       </div>
       <div id='signupdiv'>
        <div id='btnDiv'>
        <button id='btn' type='submit' >SignUp<PersonAddAlt1Icon /></button>
        </div>
       </div >
       <div id='routeLink'>
       Already a User? <button id='linkBtn' onClick={()=>navigate('/Login')}>Go and login!<ArrowRightIcon /></button>
       </div>
      </form>
     
      </main>
      
    </div>
  )
}

export default SignUp;