// import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { userDetailsStore } from '../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate(); 
    const [un, setUn] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [phnNo, setPhnNo] = useState("");
    const [gender, setGender] = useState("");
    const [checkBox, setCheckBox] = useState(false);
      let available = false;

    const onSignUpClick = (e) => {
      e.preventDefault();
      if(un !== "" && email !== "" && pw !== "" && phnNo !== "" && gender !== "" && checkBox !== false && confirmPw !== ""){
        const currentUser = {
            Username: un,
            EmailId: email,
            Password: pw,
            MobileNo: phnNo,
            Gender: gender,
        };
        setUserArr(currentUser);
        navigate('/Login');
        appendObject(currentUser);
      }
    }

    const appendObject = (newUser) => {
      const storedArr = JSON.parse(localStorage.getItem("CurrentUser")) || [];
        storedArr.push(newUser);
        localStorage.setItem('CurrentUser',JSON.stringify(storedArr));
    }

    const userarr = userDetailsStore(state => state.users)
    const setUserArr = userDetailsStore(state => state.updateUsers)

    const validateUsername = () => {
      if(un.match("^[A-Za-z][A-Za-z]{4,29}$")){
        let getOldData = JSON.parse(localStorage.getItem("CurrentUser"));
      getOldData.find((user)=>{
        if(user.Username == un){
          console.log("User available");
          available = true;
          console.log(available);
        }
        
      })
        console.log(un);
        return true;
      }
      // else{
      //   alert("Invalid Username!");
      // }
    }

    const validateEmailId = () => {
        if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
              return true;
             }
            //  else{
            //   alert("Invalid Email Id!");
            //  }
    }

    const validatePassword = () => {
          if(pw.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/)){
      return true;
    }
    // else{
    //   alert("Invalid password!");
    // }
    }

    const validateConfirmPassword = () => {
        if(confirmPw == pw){
            return true;
          }
          // else{
          //   alert("Password's does not match!");
          // }
    }

    const validateMobileNo = () => {
        if(phnNo.match(/^[0]?[6789]\d{9}$/)){
            return true;
          }
          // else{
          //   alert("Invalid Mobile Number!")
          // }
    }

    const onGenderSelect = (e) => {
        if(e.target.checked){
            setGender(e.target.value);
        }
        // else{
        //     alert("Please select your gender!");
        // }
    }

    
 

    

    useEffect(()=>{
        console.log(un);
        console.log(email);
        console.log(pw);
        console.log(confirmPw);
        console.log(phnNo);
        console.log(userarr);
        console.log(gender);
        console.log(checkBox);
    },[un,pw,email,confirmPw,phnNo,userarr,gender,checkBox])

    return (
        <div >
            <form className="signUpComponent" onSubmit={onSignUpClick}>
                Username: <input onChange={(e) => setUn(e.target.value)} onBlur={() => validateUsername()} required />
                {/* {available && <span>User available</span>} */}
                Email Id: <input onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmailId()} required />
                Password: <input onChange={(e) => setPw(e.target.value)} onBlur={() => validatePassword()} required />
                Confirm Password: <input onChange={(e) => setConfirmPw(e.target.value)} onBlur={() => validateConfirmPassword()} required />
                Mobile: <input onChange={(e) => setPhnNo(e.target.value)} onBlur={() => validateMobileNo()} required />
                Gender: <input type="radio" name="gender" value="male" checked={gender == 'male'} onChange={(e)=>onGenderSelect(e)} required/> Male
                        <input type="radio" name="gender" value="female" checked={gender == 'female'} onChange={(e)=>onGenderSelect(e)} required/> Female
                <input type='checkbox' onChange={(e)=>setCheckBox(e.target.checked)} required/> I agree to the terms and conditions!
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default SignUp;