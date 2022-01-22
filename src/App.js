import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import Signup from './components/Signup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Feed from './components/Feed';

const App = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        checkbox: false,
    });

    return (
        <Container maxW="container.xl">
            <Routes>
                <Route
                    path="signup"
                    element={
                        <Signup
                            formValue={formValue}
                            setFormValue={setFormValue}
                        />
                    }
                />
                <Route path="/" element={<Navigate replace to="/signup" />} />
                <Route
                    path="login"
                    element={
                        <Login
                            formValue={formValue}
                            setFormValue={setFormValue}
                        />
                    }
                />
                <Route path="home" element={<Home />} />
                <Route path="forgot" element={<ForgotPassword />} />
                <Route path="feed" element={<Feed />} />
            </Routes>
        </Container>
    );
};

export default App;
