import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Stack,
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
    useMediaQuery,
} from '@chakra-ui/react';
import { BarLoader } from 'react-spinners';
import { signOut } from 'firebase/auth';
import { useLocation, useNavigate, NavLink, Link } from 'react-router-dom';
import { auth } from '../server';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';

const Navbar = ({ userData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, loading, error] = useAuthState(auth);
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');
    const [showNavbarModalInMobile, setShowNavbarModalInMobile] =
        useState(false);

    // useEffect(() => {
    //     // if (!user) {
    //     //     if (location.pathname === '/home') navigate('/login');
    //     //     if (loading.pathname === '/feed') navigate('/login');
    //     // }
    //     console.log(location.pathname);
    // }, [user]);

    if (loading) return <BarLoader />;

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login', { replace: true });
    };

    const handleResponsiveMenuBar = {
        openMenu: () => setShowNavbarModalInMobile(true),
        closeMenu: () => setShowNavbarModalInMobile(false),
    };

    return (
        <div className="navbar">
            <HStack justify={'space-between'}>
                <NavLink to={'/home'}>
                    {' '}
                    <Heading className="navbar-heading">StoryShare</Heading>
                </NavLink>
                {isResponsive ? (
                    <div>
                        <HStack spacing={10}>
                            <NavLink
                                to={'/home'}
                                className={
                                    (location.pathname === '/home' &&
                                        'navbar-active') +
                                    ' ' +
                                    'navbar-link'
                                }
                            >
                                Your Stories
                            </NavLink>
                            <NavLink
                                to={'/feed'}
                                className={
                                    (location.pathname === '/feed' &&
                                        'navbar-active') +
                                    ' ' +
                                    'navbar-link'
                                }
                            >
                                Feed
                            </NavLink>
                            <Popover>
                                <PopoverTrigger>
                                    <HStack spacing={5} className="navbar-user">
                                        <p>{userData.name}</p>
                                        <Avatar src={userData.profileUrl} />
                                    </HStack>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent className="navbar-user-portal">
                                        <PopoverArrow />
                                        <PopoverHeader>
                                            {userData.email}
                                        </PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Stack>
                                                <Button>
                                                    <Link to={'/profile'}>
                                                        Edit Profile
                                                    </Link>
                                                </Button>
                                                <Button
                                                    colorScheme="orange"
                                                    onClick={handleSignOut}
                                                >
                                                    Sign Out
                                                </Button>
                                            </Stack>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        </HStack>
                    </div>
                ) : (
                    <div>
                        {showNavbarModalInMobile ? (
                            <AiFillCloseCircle
                                onClick={handleResponsiveMenuBar.closeMenu}
                            />
                        ) : (
                            <AiOutlineMenu
                                onClick={handleResponsiveMenuBar.openMenu}
                            />
                        )}
                    </div>
                )}
            </HStack>
            {showNavbarModalInMobile && (
                <div className="responsive-navbar">
                    <Stack spacing={5}>
                        <NavLink
                            to={'/home'}
                            className={
                                (location.pathname === '/home' &&
                                    'navbar-active') +
                                ' ' +
                                'navbar-link'
                            }
                        >
                            Your Stories
                        </NavLink>
                        <NavLink
                            to={'/feed'}
                            className={
                                (location.pathname === '/feed' &&
                                    'navbar-active') +
                                ' ' +
                                'navbar-link'
                            }
                        >
                            Feed
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={
                                (location.pathname === '/profile' &&
                                    'navbar-active') +
                                ' ' +
                                'navbar-link'
                            }
                        >
                            Your Profile
                        </NavLink>
                        {/* <Popover>
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
                        </Popover> */}
                        <Button colorScheme="orange" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </Stack>
                </div>
            )}
        </div>
    );
};

export default Navbar;
