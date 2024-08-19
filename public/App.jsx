
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Home from './Home.js';
    import Profile from './Profile.js';
    import Login from './Login.js';
    import { auth } from '../firebase';
    import { useAuthState } from 'react-firebase-hooks/auth';

    const App = () => {
        const [user] = useAuthState(auth);
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element= {<Login />} />
                </Routes>
            </Router>
        );
    };      




const firebaseConfig = {
  apiKey: 'AIzaSyA0yb7NcFYj648foilzdpUVWUyoOqr0VOw',
  authDomain: 'seismic-fx-422005-e9.firebaseapp.com',
  projectId: 'seismic-fx-422005-e9',
  storageBucket: 'seismic-fx-422005-e9.appspot.com',
  messagingSenderId: '466306927010',
  appId: '1:466306927010:web:b229583110098687ba0afb'
}


export default App;