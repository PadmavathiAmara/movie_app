import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { userDetailsStore } from '../App';
import { useEffect, useState } from 'react';
import HomeBody from './HomeBody';
import MoviesPage from './MoviesPage';
import Header from './Header';


export const Home = () => {
    

    const Status = userDetailsStore(state => state.success);
    const setStatus = userDetailsStore(state => state.updateSuccess);

    

    const onLoading = () => {
        const adminData = {
            Username: "Padmavathi",
            Password: "padmavathi@12",
        }
        localStorage.setItem("Admin", JSON.stringify(adminData));
    }
    const onRefresh = () => {
        // 
        // if(getcurrentUserData){
        //     
        // }
        // let getcurrentUserData = JSON.parse(localStorage.getItem("CurrentUser"));
        // if(getcurrentUserData.Username === "Padmavathi"){
        //     if(Status == "false" || Status == 'Padmavathi'){
        //         return true;
        //     }
        // }else{
        //     if(Status == "false"){
        //         localStorage.removeItem("CurrentUser");
        //         }
        // }
        if(Status == "false"){
            let getcurrentUserData = localStorage.getItem("CurrentUser");
            console.log(getcurrentUserData)
            if(getcurrentUserData){
                let getData = JSON.parse(localStorage.getItem("CurrentUser"));
        if(getData.Username === "Padmavathi"){
            setStatus("Padmavathi")
        }else{
                localStorage.removeItem("CurrentUser");
        }
            }
        }
    }

    useEffect(() => {
        onLoading();
        onRefresh();
    }, [])

    return (
        <>
        <Header/>
        <HomeBody/>
    </>
    )
}

export default Home;