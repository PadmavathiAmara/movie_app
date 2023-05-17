import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AdminPortal from './Components/AdminPortal';
import Favourites from './Components/Favourites';
// import { useEffect, useState } from 'react';
import { create } from 'zustand';

export const userDetailsStore = create((set) => (
  {
    users: [],
    updateUsers: (Currentuser) => set((state) => ({
      users: [...state.users, [Currentuser]]
    })),

    success: "false",
    updateSuccess: (p) => set(() => ({
      success: p
    })),

    accUser: [],
    updateAccUser: (val) => set(() => ({
      accUser: [val]
    })),

    adminStatus: "false",
    updateAdminStatus: (p) => set(()=>({
      adminStatus: p
    }))
  }
))

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/AdminPortal' element={<AdminPortal/>} />
        <Route path='/Favourites' element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
