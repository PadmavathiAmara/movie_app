import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AdminPortal from './Components/AdminPortal';
import { create } from 'zustand';
import MoviesPage from './Components/MoviesPage';
import UpdateMovies from './Components/UpdateMovies';

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

    movies: {},
    updateMovies: (mov) => set(()=>({
     movies: {mov}
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
        <Route path='/AdminPortal' element={<AdminPortal />} />
        <Route path='/Moviespage' element={<MoviesPage />} />
        <Route path='/UpdateMovies' element={<UpdateMovies/>} />
      </Routes>
    </div>
  );
}

export default App;
