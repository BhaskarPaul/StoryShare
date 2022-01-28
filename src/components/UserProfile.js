import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../server';
import { getDocs, query, collection, where } from 'firebase/firestore';
import Navbar from './Navbar';
import {
    VStack,
    Avatar,
    Heading,
    Stack,
    HStack,
    Button,
    Divider,
    useMediaQuery,
} from '@chakra-ui/react';
import '../App.css';
import { signOut } from 'firebase/auth';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [user, loading, error] = useAuthState(auth);
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');

    useEffect(() => {
        if (!user) navigate('/login', { replace: true });
    }, [user]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const docs = await getDocs(
                query(collection(db, 'users'), where('_id', '==', user?.uid))
            );
            const data = await docs.docs[0].data();
            setUserData(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login', { replace: true });
    };

    return (
        <div>
            <Navbar userData={userData} />
            <div>
                <VStack>
                    <Avatar
                        size="2xl"
                        name={userData.name}
                        // src="https://bit.ly/sage-adebayo"
                    />{' '}
                    <Heading className="heading">{userData.name}</Heading>
                </VStack>
                <Stack
                    justifyContent={'center'}
                    className="user-box"
                    width={isResponsive ? '400px' : 'auto'}
                >
                    <HStack justifyContent={'space-between'}>
                        <p>Name</p>
                        <p>{userData.name}</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <p>Email</p>
                        <p>{userData.email}</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <Button colorScheme={'blue'}>Edit Profile</Button>
                        <Button colorScheme={'orange'} onClick={handleSignOut}>
                            Log out
                        </Button>
                    </HStack>
                </Stack>
                <Stack
                    justifyContent={'center'}
                    className="user-box"
                    width={isResponsive ? '400px' : 'auto'}
                >
                    <HStack justifyContent={'space-between'}>
                        <p>Total Story(s) Uploaded</p>
                        <p className="bold">0</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <p>Total like(s)</p>
                        <p className="bold">0</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <p>Total view(s)</p>
                        <p className="bold">0</p>
                    </HStack>
                </Stack>
            </div>
        </div>
    );
};

export default UserProfile;
