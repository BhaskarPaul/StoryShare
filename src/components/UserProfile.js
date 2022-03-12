import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../server';
import {
    getDocs,
    query,
    collection,
    where,
    updateDoc,
    doc,
} from 'firebase/firestore';
import Navbar from './Navbar';
import {
    VStack,
    Avatar,
    Stack,
    HStack,
    Button,
    Divider,
    useMediaQuery,
    Badge,
    FormLabel,
    Input,
    Tooltip,
} from '@chakra-ui/react';
import '../App.css';
import { signOut } from 'firebase/auth';
import Modal from 'react-modal';
import AlertMessage from './AlertMessage';
import ProgressBar from './ProgressBar';

Modal.setAppElement('#root');

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [user, loading, error] = useAuthState(auth);
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');
    const [stats, setStats] = useState({
        upload: 0,
        likes: 0,
        views: 0,
    });

    useEffect(() => {
        if (!user) navigate('/login', { replace: true });
    }, [user]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserStats = async () => {
        const docs = await getDocs(
            query(collection(db, 'stories'), where('_id', '==', user?.uid))
        );
        let allStories = [];
        docs.forEach(doc => allStories.push(doc.data()));
        let totalLikes = allStories.reduce(
            (prev, curr) => prev + curr.likes,
            0
        );
        setStats({ ...stats, likes: totalLikes, upload: allStories.length });
    };

    useEffect(() => {
        fetchUserStats();
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

    // user profile
    const [file, setFile] = useState(null);

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

    // modal states
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => setModalIsOpen(false);

    // modal style
    const customStyles = {
        content: {
            width: isResponsive ? '600px' : 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };

    const handleModal = () => setModalIsOpen(true);

    // alert
    const [alert, setAlert] = useState({ visible: false, message: '' });
    const [story, setStory] = useState({ url: '' });

    const updateRespectiveUserDatabase = async () => {
        try {
            const userDocumentId = await userDatabaseId();
            await updateDoc(doc(db, 'users', userDocumentId), {
                profileUrl: story.url,
            });
            // console.log(userDocumentId);
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    const userDatabaseId = async () => {
        try {
            const docs = await getDocs(
                query(collection(db, 'users'), where('_id', '==', userData._id))
            );
            // console.log(docs.docs[0].id);
            const deleteStoryId = docs.docs[0].id;
            // console.log(deleteStoryId);
            return deleteStoryId;
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    useEffect(() => {
        if (story.url) {
            setModalIsOpen(false);
            updateRespectiveUserDatabase();
        }
    }, [story]);

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {alert.visible && (
                    <AlertMessage
                        message={alert.message}
                        handleClose={() =>
                            setAlert({ visible: false, message: '' })
                        }
                    />
                )}
                <FormLabel htmlFor="image">Upload profile image</FormLabel>
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
            </Modal>
            <Navbar userData={userData} />
            <div>
                <VStack>
                    <Avatar
                        size="2xl"
                        name={userData.name}
                        src={story.url || userData.profileUrl}
                    />{' '}
                    <Badge
                        className="update-badge"
                        fontSize={'1em'}
                        colorScheme={'teal'}
                        onClick={handleModal}
                    >
                        Update Profile Picture
                    </Badge>
                </VStack>
                <Stack
                    justifyContent={'center'}
                    className="user-box"
                    width={isResponsive ? '400px' : 'auto'}
                >
                    <HStack justifyContent={'space-between'}>
                        <p>Name</p>
                        <p className="bold">{userData.name}</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <p>Email</p>
                        <p className="bold">{userData.email}</p>
                    </HStack>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                        <Button colorScheme={'blue'} disabled>
                            Edit Profile
                        </Button>
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
                        <p className="bold">{stats.upload}</p>
                    </HStack>
                    <Divider />
                    <Tooltip label="this feature will not work now ... still under development">
                        <HStack
                            justifyContent={'space-between'}
                            className="disable"
                        >
                            <p>Total like(s)</p>
                            <p className="bold">0</p>
                        </HStack>
                    </Tooltip>
                    <Divider />
                    <Tooltip label="this feature will not work now ... still under development">
                        <HStack
                            className="disable"
                            justifyContent={'space-between'}
                        >
                            <p>Total view(s)</p>
                            <p className="bold">0</p>
                        </HStack>
                    </Tooltip>
                </Stack>
            </div>
        </div>
    );
};

export default UserProfile;
