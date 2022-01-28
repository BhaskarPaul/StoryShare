import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../server';
import { useNavigate } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import Card from './Card';

const Feed = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [allPublicStory, setAllPublicStory] = useState([]);
    const [userData, setUserData] = useState({});
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');

    const fetchAllPublicStory = async () => {
        const docs = await getDocs(
            query(collection(db, 'stories'), where('type', '==', 'public'))
        );
        let allStories = [];
        docs.forEach(doc => allStories.push(doc.data()));
        // allStories.sort((a, b) => b.timestamp - a.timestamp);
        setAllPublicStory([...allStories]);
    };

    useEffect(() => {
        if (!user) navigate('/login');
        fetchAllPublicStory();
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

    return (
        <div>
            <Navbar userData={userData} />
            <Grid templateColumns={isResponsive && 'repeat(2, 1fr)'} gap={5}>
                {allPublicStory
                    .filter(story => story._id !== user.uid)
                    .map((story, key) => (
                        <GridItem key={key} colSpan={isResponsive && 1}>
                            <Card story={story} type={'all'} />
                        </GridItem>
                    ))}
            </Grid>
        </div>
    );
};

export default Feed;
