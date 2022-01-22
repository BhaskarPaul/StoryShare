import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Input,
    FormLabel,
    Textarea,
    Radio,
    RadioGroup,
    HStack,
    Button,
} from '@chakra-ui/react';
import '../App.css';

const EditUserStory = ({
    story,
    newStory,
    setNewStory,
    submitEditStory,
    editButtonLoading,
}) => {
    const [isAllField, setIsAllField] = useState(false);

    useEffect(() => {
        if (
            story.heading === newStory.heading &&
            story.content === newStory.content &&
            story.type === newStory.type
        )
            setIsAllField(false);
        else setIsAllField(true);
    }, [story, newStory]);

    return (
        <div>
            <FormControl isRequired>
                <FormLabel htmlFor="story-heading">Heading</FormLabel>
                <Input
                    id="story-heading"
                    type="text"
                    placeholder="Your story heading..."
                    value={newStory.heading}
                    onChange={e =>
                        setNewStory({ ...newStory, heading: e.target.value })
                    }
                />
                <FormLabel htmlFor="story-content">Content</FormLabel>
                <Textarea
                    placeholder="Your story content..."
                    value={newStory.content}
                    onChange={e =>
                        setNewStory({ ...newStory, content: e.target.value })
                    }
                />
                <FormLabel as="legend">Select your story privacy</FormLabel>
                <RadioGroup
                    defaultValue={newStory.type}
                    onChange={value =>
                        setNewStory({ ...newStory, type: value })
                    }
                >
                    <HStack spacing="24px">
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </HStack>
                </RadioGroup>
                {/* <FormHelperText>Default story type is Public</FormHelperText> */}
                <Button
                    isLoading={editButtonLoading}
                    disabled={!isAllField}
                    colorScheme="teal"
                    variant="solid"
                    onClick={submitEditStory}
                >
                    Edit story
                </Button>
            </FormControl>
        </div>
    );
};

export default EditUserStory;
