import React, { useState, Suspense, lazy } from 'react';
import { Container } from '@chakra-ui/react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PageLoading from './components/PageLoading';

// lazy import
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const Home = lazy(() => import('./components/Home'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const Feed = lazy(() => import('./components/Feed'));
const UserProfile = lazy(() => import('./components/UserProfile'));

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
        <div>
            <Container maxW="container.xl">
                <Routes>
                    <Route
                        path="signup"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <Signup
                                    formValue={formValue}
                                    setFormValue={setFormValue}
                                />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate replace to="/signup" />}
                    />
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <Login
                                    formValue={formValue}
                                    setFormValue={setFormValue}
                                />
                            </Suspense>
                        }
                    />
                    <Route
                        path="home"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path="forgot"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <ForgotPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="feed"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <Feed />
                            </Suspense>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <Suspense fallback={<PageLoading />}>
                                <UserProfile />
                            </Suspense>
                        }
                    ></Route>
                </Routes>
            </Container>
        </div>
    );
};

export default App;
