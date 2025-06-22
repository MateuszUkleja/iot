import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Devices from './pages/Devices';
import ClaimDevice from './pages/ClaimDevice';
import Register from './pages/Register';
import Logout from './pages/Logout';
import { AuthContext } from './AuthContext';

const App: React.FC = () => {
    const { loggedIn } = useContext(AuthContext);

    return (
        <div>
            <nav>
                {loggedIn && <Link to="/devices">Devices</Link>}
                {loggedIn && (
                    <>
                        {' | '}
                        <Link to="/claim">Claim Device</Link>
                    </>
                )}
                {!loggedIn && <Link to="/register">Register</Link>}
                {loggedIn && (
                    <>
                        {' | '}
                        <Link to="/logout">Logout</Link>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/devices"
                    element={loggedIn ? <Devices /> : <Navigate to="/login" />}
                />
                <Route
                    path="/claim"
                    element={loggedIn ? <ClaimDevice /> : <Navigate to="/login" />}
                />
                <Route
                    path="/register"
                    element={!loggedIn ? <Register /> : <Navigate to="/devices" />}
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Navigate to="/devices" />} />
            </Routes>
        </div>
    );
};

export default App;