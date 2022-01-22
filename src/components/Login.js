import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Button,
    Heading,
    HStack,
} from '@chakra-ui/react';
import AlertMessage from './AlertMessage';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../server';
import { BarLoader } from 'react-spinners';
import '../App.css';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ formValue, setFormValue }) => {
    const navigate = useNavigate();
    const [isAllField, setIsAllField] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [alert, setAlert] = useState({ message: '', visible: false });

    useEffect(() => {
        if (formValue.email !== '' && formValue.password !== '')
            setIsAllField(true);
        else setIsAllField(false);
    }, [formValue]);

    useEffect(() => {
        if (user) return navigate('/home', { replace: true });
    }, [user]);

    if (loading) <BarLoader />;

    const handleLoginForm = async () => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formValue.email,
                formValue.password
            );
            // console.log(response.user.uid);
            // const snapshot = await getDoc(doc(db, 'users', response.user.uid));
            // // user.displayName = snapshot.data().name;
            // // console.log(user);
            // console.log(snapshot.data());
            setFormValue({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                checkbox: false,
            });
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    return (
        <>
            {alert.visible && (
                <AlertMessage
                    message={alert.message}
                    handleClose={() =>
                        setAlert({ visible: false, message: '' })
                    }
                />
            )}
            <Heading
                className="login-heading"
                style={{
                    marginBottom: '30px',
                    marginTop: alert.visible && '30px',
                }}
            >
                Login form
            </Heading>
            <FormControl isRequired>
                <VStack spacing={4} align="stretch">
                    <div>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            placeholder="Email"
                            type={'email'}
                            value={formValue.email}
                            onChange={e =>
                                setFormValue({
                                    ...formValue,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            placeholder="Password"
                            type={'password'}
                            value={formValue.password}
                            onChange={e =>
                                setFormValue({
                                    ...formValue,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Button
                            disabled={!isAllField && true}
                            colorScheme="blue"
                            onClick={handleLoginForm}
                        >
                            Login
                        </Button>
                    </div>
                    <HStack justify={'space-between'}>
                        <div>
                            Have not signed up? Create an account{' '}
                            <Link
                                to={'/signup'}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                Signup
                            </Link>
                        </div>
                        <div>
                            <Link
                                to={'/forgot'}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                Forgot Password
                            </Link>
                        </div>
                    </HStack>
                </VStack>
            </FormControl>
        </>
    );
};

export default Login;
