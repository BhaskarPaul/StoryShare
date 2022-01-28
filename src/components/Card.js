import React, { useState, useContext, useEffect } from 'react';
import {
    HStack,
    Badge,
    Stack,
    VStack,
    Heading,
    Button,
    Divider,
    Image,
    useMediaQuery,
} from '@chakra-ui/react';
import '../App.css';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import {
    query,
    collection,
    where,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { db, stringDate } from '../server';
import AlertMessage from './AlertMessage';
import { RootContext } from '../context';
import Modal from 'react-modal';
import EditUserStory from './EditUserStory';
import ConfirmWindow from './ConfirmWindow';

Modal.setAppElement('#root');

const Card = ({ story, type }) => {
    const state = useContext(RootContext);
    const [like, setLike] = useState({ count: 0, state: 'Like' });
    const [alert, setAlert] = useState({ visible: false, message: '' });
    const [buttonLoading, setButtonLoading] = useState({
        edit: false,
        delete: false,
    });
    const [newStory, setNewStory] = useState({
        heading: story.heading,
        content: story.content,
        type: story.type,
    });

    useEffect(() => {
        setLike({ ...like, count: story.likes });
    }, []);

    const handleLike = async () => {
        if (like.state === 'Like') {
            setLike({ state: 'Dislike', count: like.count + 1 });
            const updateStoryId = await fetchStoryDocumentId(story.storyId);
            await updateDoc(doc(db, 'stories', updateStoryId), {
                likes: story.likes + 1,
            });
        }
        if (like.state === 'Dislike')
            setLike({ state: 'Like', count: like.count - 1 });
        const updateStoryId = await fetchStoryDocumentId(story.storyId);
        await updateDoc(doc(db, 'stories', updateStoryId), {
            likes: story.likes - 1,
        });
    };

    // fetch firestore document ID
    const fetchStoryDocumentId = async id => {
        try {
            const docs = await getDocs(
                query(collection(db, 'stories'), where('storyId', '==', id))
            );
            const deleteStoryId = docs.docs[0].id;
            return deleteStoryId;
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    // to delete story
    const handleDeleteStory = () => {
        setModalType('delete');
        setModalIsOpen(true);
    };

    const deleteStory = async () => {
        setButtonLoading({ ...buttonLoading, delete: true });
        try {
            const deleteStoryId = await fetchStoryDocumentId(story.storyId);
            await deleteDoc(doc(db, 'stories', deleteStoryId));
            const filterStories = state.rootStories.filter(
                item => item.storyId !== story.storyId
            );
            state.setRootStories([...filterStories]);
            setModalIsOpen(false);
            setButtonLoading({ ...buttonLoading, delete: false });
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
    };

    // cancel delete a story
    const cancelDeleteProcess = () => {
        setModalIsOpen(false);
    };

    // to edit story
    const handleEditStory = () => {
        setModalType('edit');
        setModalIsOpen(true);
    };

    const submitEditStory = async () => {
        setButtonLoading({ ...buttonLoading, edit: true });
        try {
            const editStoryId = await fetchStoryDocumentId(story.storyId);
            const object = newStory;
            object.createdAt = stringDate('u');
            object.timestamp = Date.now();
            await updateDoc(doc(db, 'stories', editStoryId), object);
            // update local
            const filterStories = state.rootStories.map(item => {
                if (story.storyId === item.storyId) {
                    item = { ...item, ...object };
                    return item;
                }
                return item;
            });

            state.setRootStories([...filterStories]);
            setButtonLoading({ ...buttonLoading, edit: false });
            setModalIsOpen(false);
        } catch (error) {
            setAlert({ visible: true, message: error.message });
            console.log(error);
        }
        // console.log(newStory);
    };

    // for responsive
    const [isResponsive] = useMediaQuery('(min-width: 1000px)');

    // modal states
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
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

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {modalType === 'edit' && (
                    <EditUserStory
                        story={story}
                        newStory={newStory}
                        setNewStory={setNewStory}
                        submitEditStory={submitEditStory}
                        editButtonLoading={buttonLoading.edit}
                    />
                )}
                {modalType === 'delete' && (
                    <ConfirmWindow
                        cancelDeleteProcess={cancelDeleteProcess}
                        deleteStory={deleteStory}
                        isLoading={buttonLoading.delete}
                    />
                )}
            </Modal>
            {alert.visible && (
                <AlertMessage
                    message={alert.message}
                    handleClose={() =>
                        setAlert({ visible: false, message: '' })
                    }
                />
            )}
            <VStack
                style={{
                    marginBottom: '30px',
                    overflow: 'hidden',
                    width: '100%',
                }}
                className="story-card"
                spacing={5}
                direction={'column'}
            >
                <Stack direction={'column'} spacing={5}>
                    <Stack direction={'column'} spacing={2}>
                        <HStack spacing={5} justify={'space-between'}>
                            <HStack>
                                <Heading className="story-heading" size={'lg'}>
                                    {story.heading}
                                </Heading>
                                {story.type === 'private' ? (
                                    <Badge
                                        colorScheme="red"
                                        style={{ borderRadius: '5px' }}
                                    >
                                        private
                                    </Badge>
                                ) : (
                                    <Badge
                                        colorScheme="green"
                                        style={{ borderRadius: '5px' }}
                                    >
                                        public
                                    </Badge>
                                )}
                            </HStack>
                            {type === 'all' && (
                                <div>
                                    <p>
                                        <small>by </small>
                                        {story.creatorName}
                                    </p>
                                </div>
                            )}
                        </HStack>
                        <small style={{ color: 'gray', fontSize: '15px' }}>
                            {story.createdAt}
                        </small>
                    </Stack>
                    <Divider />
                    <Image
                        className="story-img"
                        src={story.url}
                        alt="cover image"
                    />
                    <Divider />
                    <p style={{ textAlign: 'left' }}>{story.content}</p>
                    {type === 'user' && (
                        <div>
                            <HStack spacing={5}>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() =>
                                        handleEditStory(story.storyId)
                                    }
                                >
                                    Edit Story
                                </Button>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() =>
                                        handleDeleteStory(story.storyId)
                                    }
                                >
                                    Delete Story
                                </Button>
                            </HStack>
                        </div>
                    )}
                    {type === 'all' && (
                        <div>
                            <Divider />
                            <HStack style={{ marginTop: '10px' }}>
                                <p>{like.count}</p>
                                <Button
                                    onClick={handleLike}
                                    colorScheme={
                                        like.state === 'Like' ? 'blue' : 'red'
                                    }
                                >
                                    <HStack>
                                        {like.state === 'Like' ? (
                                            <AiFillLike color="white" />
                                        ) : (
                                            <AiFillDislike color="white" />
                                        )}
                                        <p>{like.state}</p>
                                    </HStack>
                                </Button>
                            </HStack>
                        </div>
                    )}
                </Stack>
            </VStack>
        </div>
    );
};

export default Card;
