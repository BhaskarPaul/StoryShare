import React, { useState, useEffect, useContext } from 'react';
import {
    FormControl,
    Input,
    FormHelperText,
    FormLabel,
    HStack,
    Radio,
    RadioGroup,
    Textarea,
    Button,
    useMediaQuery,
} from '@chakra-ui/react';
import '../App.css';
import { auth, db, stringDate } from '../server';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AlertMessage from './AlertMessage';
import { RootContext } from '../context';
import { v4 as uuidv4 } from 'uuid';
import ProgressBar from './ProgressBar';
import { AiFillFileAdd } from 'react-icons/ai';

const AddUserStory = ({ creatorName }) => {
    const navigate = useNavigate();
    const state = useContext(RootContext);
    const [story, setStory] = useState({
        heading: '',
        content: '',
        type: 'public',
        url: '',
    });
    const [isAllField, setIsAllField] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [alert, setAlert] = useState({ visible: false, message: '' });
    const [isloading, setIsloading] = useState(false);
    const [file, setFile] = useState(null);
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');
    const [showAddUserStory, setShowAddUserStory] = useState(false);

    useEffect(() => {
        if (story.heading !== '' && story.content !== '' && story.url !== '')
            setIsAllField(true);
        else setIsAllField(false);
    }, [story]);

    useEffect(() => {
        if (!user) navigate('/login', { replace: true });
        // console.log(user);
    }, [user]);

    useEffect(() => {
        if (isResponsive) setShowAddUserStory(true);
    }, [isResponsive]);

    const createStory = async () => {
        // console.log(user);
        setIsloading(true);
        try {
            const object = {
                _id: user.uid,
                storyId: uuidv4(),
                creatorName,
                ...story,
                likes: 0,
                views: 0,
                createdAt: stringDate('c'),
                timestamp: Date.now(),
            };
            await addDoc(collection(db, 'stories'), object);
            state.setRootStories([object, ...state.rootStories]);
            setStory({ heading: '', content: '', type: 'public' });
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    const uploadImage = file => {
        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        const { type } = file;
        if (file && types.includes(type)) {
            setFile(file);
        } else {
            setAlert({
                visible: true,
                message: 'Image file type should be jpeg or png',
            });
            setFile(null);
        }
    };

    const openAddStoryInResponsive = () =>
        setShowAddUserStory(!showAddUserStory);

    return (
        <>
            {!isResponsive && (
                <HStack
                    alignItems={'center'}
                    justifyContent={'center'}
                    className="responsive-add-story"
                    onClick={openAddStoryInResponsive}
                    style={{ marginBottom: showAddUserStory && '30px' }}
                >
                    <p>
                        {showAddUserStory
                            ? 'Click here to close'
                            : 'Click here to add story'}
                    </p>
                    {!showAddUserStory && (
                        <span>
                            <AiFillFileAdd />
                        </span>
                    )}
                </HStack>
            )}
            {showAddUserStory && (
                <div className="create-story">
                    {alert.visible && (
                        <AlertMessage
                            message={alert.message}
                            handleClose={() =>
                                setAlert({ visible: false, message: '' })
                            }
                        />
                    )}
                    <FormControl isRequired>
                        <FormLabel htmlFor="story-heading">Heading</FormLabel>
                        <Input
                            id="story-heading"
                            type="text"
                            placeholder="Your story heading..."
                            value={story.heading}
                            onChange={e =>
                                setStory({ ...story, heading: e.target.value })
                            }
                        />
                        <FormLabel htmlFor="story-content">Content</FormLabel>
                        <Textarea
                            placeholder="Your story content..."
                            value={story.content}
                            onChange={e =>
                                setStory({ ...story, content: e.target.value })
                            }
                        />
                        <FormLabel htmlFor="image">
                            Upload story image
                        </FormLabel>
                        <Input
                            id="image"
                            type="file"
                            placeholder="upload image here..."
                            onChange={e => uploadImage(e.target.files[0])}
                        />
                        {file && (
                            <ProgressBar
                                file={file}
                                setFile={setFile}
                                story={story}
                                setStory={setStory}
                            />
                        )}
                        <FormLabel as="legend">
                            Select your story privacy
                        </FormLabel>
                        <RadioGroup
                            defaultValue={story.type}
                            onChange={value =>
                                setStory({ ...story, type: value })
                            }
                        >
                            <HStack spacing="24px">
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </HStack>
                        </RadioGroup>
                        <FormHelperText>
                            Default story type is Public
                        </FormHelperText>
                        <Button
                            isLoading={isloading}
                            disabled={!isAllField}
                            colorScheme="teal"
                            variant="solid"
                            onClick={createStory}
                        >
                            Create story
                        </Button>
                    </FormControl>
                </div>
            )}
        </>
    );
};

export default AddUserStory;
