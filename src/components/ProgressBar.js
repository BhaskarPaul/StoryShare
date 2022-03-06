import React, { useEffect } from 'react';
import { Progress } from '@chakra-ui/react';
import useStorage from '../hooks/useStorage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../server';

const ProgressBar = ({ file, setFile, story, setStory }) => {
    const { progress, url, error } = useStorage(file);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (url) {
            setFile(null);
            setStory({ ...story, url: url });
        }

        console.log(error);
    }, [url, setFile, error]);

    return (
        <div>
            <Progress
                style={{ borderRadius: '5px', marginTop: '10px' }}
                value={progress}
            />
        </div>
    );
};

export default ProgressBar;
