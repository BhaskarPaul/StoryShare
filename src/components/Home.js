import React, { useState, useEffect } from 'react';
import '../App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddUserStory from './AddUserStory';
import ShowUserStory from './ShowUserStory';
import Navbar from './Navbar';
import { BarLoader } from 'react-spinners';
import { auth, db } from '../server';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Home = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: '', visible: false });
    const [userData, setUserData] = useState({});
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!user) navigate('/login');
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
            // user.displayName = userData.name;
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <BarLoader />;

    return (
        <div style={{ overflow: 'hidden' }}>
            {alert.visible && (
                <AlertMessage
                    message={alert.message}
                    handleClose={() =>
                        setAlert({ visible: false, message: '' })
                    }
                />
            )}
            <Navbar userData={userData} />
            <div className="story-body">
                <Grid templateColumns={'repeat(5, 1fr)'} gap={5}>
                    <GridItem colSpan={3}>
                        <ShowUserStory />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <AddUserStory creatorName={userData.name} />
                    </GridItem>
                </Grid>
            </div>
        </div>
    );
};

export default Home;
