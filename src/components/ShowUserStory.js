import React, { useState, useEffect, useContext } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../server';
import '../App.css';
import { Select, useMediaQuery } from '@chakra-ui/react';
import { RootContext } from '../context';
import Card from './Card';

const ShowUserStory = () => {
    const navigate = useNavigate();
    const state = useContext(RootContext);
    const [user, loading, error] = useAuthState(auth);
    const [selectOptionValue, setSelectOptionValue] = useState('all');
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');

    const fetchUserStory = async () => {
        const docs = await getDocs(
            query(collection(db, 'stories'), where('_id', '==', user.uid))
        );
        let allStories = [];
        docs.forEach(doc => allStories.push(doc.data()));
        allStories.sort((a, b) => b.timestamp - a.timestamp);
        state.setRootStories([...allStories]);
    };

    useEffect(() => {
        if (!user) navigate('/login', { replace: true });
    }, [user]);

    useEffect(() => {
        fetchUserStory();
    }, []);

    return (
        <div>
            <Select
                placeholder="Filter Stories (All)"
                onChange={e => setSelectOptionValue(e.target.value)}
                style={{
                    marginBottom: '30px',
                    marginTop: !isResponsive && '30px',
                }}
            >
                <option value="public">Public</option>
                <option value="private">Private</option>
            </Select>
            {state.rootStories.length === 0 && (
                <div>No stories to show ... </div>
            )}
            {state.rootStories
                .filter(story => {
                    if (
                        selectOptionValue === 'public' ||
                        selectOptionValue === 'private'
                    )
                        return story.type === selectOptionValue;
                    return story;
                })
                .map((story, key) => (
                    <Card key={key} story={story} type={'user'} />
                ))}
        </div>
    );
};

export default ShowUserStory;
