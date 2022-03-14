import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    VStack,
    Button,
    Heading,
    InputGroup,
    InputRightElement,
    useMediaQuery,
} from '@chakra-ui/react';
import BarLoader from 'react-spinners/BarLoader';
import AlertMessage from './AlertMessage';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerUserWithEmailAndPassword } from '../server';
import '../App.css';

const Signup = ({ formValue, setFormValue }) => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [isAllField, setIsAllField] = useState(false);
    const [alert, setAlert] = useState({ message: '', visible: false });
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');

    useEffect(() => {
        if (
            formValue.firstName !== '' &&
            formValue.lastName !== '' &&
            formValue.email !== '' &&
            formValue.password !== '' &&
            formValue.checkbox === true
        )
            setIsAllField(true);
        else setIsAllField(false);
    }, [formValue]);

    useEffect(() => {
        if (user) navigate('/home', { replace: true });
    }, [loading, user]);

    const handleSignupForm = () => {
        const error = registerUserWithEmailAndPassword(formValue);
        // user.displayName = formValue.firstName + ' ' + formValue.lastName;
        error.then(errorMessage =>
            setAlert({ visible: true, message: errorMessage })
        );
        setFormValue({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            checkbox: false,
        });
    };

    if (loading) return <BarLoader />;

    return (
        <div
            className="user-information"
            style={{ width: isResponsive ? '600px' : 'auto' }}
        >
            {alert.visible && (
                <AlertMessage
                    message={alert.message}
                    handleClose={() =>
                        setAlert({ visible: false, message: '' })
                    }
                />
            )}
            <Heading
                className="signup-heading"
                style={{
                    marginBottom: '30px',
                    marginTop: alert.visible && '30px',
                }}
            >
                Sign Up
            </Heading>
            <FormControl isRequired>
                <VStack spacing={4} align="stretch">
                    <div>
                        <FormLabel htmlFor="first-name">First name</FormLabel>
                        <Input
                            id="first-name"
                            placeholder="First name"
                            type={'text'}
                            value={formValue.firstName}
                            onChange={e =>
                                setFormValue({
                                    ...formValue,
                                    firstName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <FormLabel htmlFor="last-name">Last name</FormLabel>
                        <Input
                            id="last-name"
                            placeholder="last name"
                            type={'text'}
                            value={formValue.lastName}
                            onChange={e =>
                                setFormValue({
                                    ...formValue,
                                    lastName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={'email'}
                                placeholder="Email"
                                value={formValue.email}
                                onChange={e =>
                                    setFormValue({
                                        ...formValue,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    colorScheme={'blue'}
                                    disabled
                                    // onClick={verifyEmailId}
                                >
                                    Verify
                                </Button>
                            </InputRightElement>
                        </InputGroup>
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
                            password
                        />
                    </div>
                    <div>
                        <FormLabel htmlFor="checkbox">Terms</FormLabel>
                        <Checkbox
                            id="checkbox"
                            value={formValue.checkbox}
                            onChange={e =>
                                setFormValue({
                                    ...formValue,
                                    checkbox: e.target.checked,
                                })
                            }
                        >
                            I am accepting all term and condition
                        </Checkbox>
                    </div>
                    <div>
                        <Button
                            disabled={!isAllField}
                            colorScheme="blue"
                            onClick={handleSignupForm}
                        >
                            Register
                        </Button>
                    </div>
                    <div>
                        Have already an account?{' '}
                        <Link
                            to={'/login'}
                            style={{
                                color: 'blue',
                                textDecoration: 'underline',
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </VStack>
            </FormControl>
        </div>
    );
};

export default Signup;
