import React, { useEffect } from 'react';
import '../App.css';
import {
    Heading,
    HStack,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
} from '@chakra-ui/react';
import { BarLoader } from 'react-spinners';
import { signOut } from 'firebase/auth';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../server';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = ({ userData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, loading, error] = useAuthState(auth);

    // useEffect(() => {
    //     if (!user) {
    //         if (location.pathname === '/home') navigate('/login');
    //         if (loading.pathname === '/feed') navigate('/login');
    //     }
    // }, [user]);

    if (loading) return <BarLoader />;

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <HStack justify={'space-between'}>
                <Heading className="navbar-heading">StoryShare</Heading>
                <div>
                    <HStack spacing={10}>
                        <Link
                            to={'/home'}
                            className={
                                (location.pathname === '/home' &&
                                    'navbar-active') +
                                ' ' +
                                'navbar-link'
                            }
                        >
                            Your Stories
                        </Link>
                        <Link
                            to={'/feed'}
                            className={
                                (location.pathname === '/feed' &&
                                    'navbar-active') +
                                ' ' +
                                'navbar-link'
                            }
                        >
                            Feed
                        </Link>
                        <Popover>
                            <PopoverTrigger>
                                <HStack spacing={5} className="navbar-user">
                                    <p>{userData.name}</p>
                                    <Avatar src="https://image.shutterstock.com/image-vector/young-man-face-cartoon-260nw-1224888760.jpg" />
                                </HStack>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent className="navbar-user-portal">
                                    <PopoverArrow />
                                    <PopoverHeader>Your Profile</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <HStack>
                                            <p>{userData.email}</p>
                                            <Button
                                                colorScheme="orange"
                                                onClick={handleSignOut}
                                            >
                                                Sign Out
                                            </Button>
                                        </HStack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    </HStack>
                </div>
            </HStack>
        </div>
    );
};

export default Navbar;
