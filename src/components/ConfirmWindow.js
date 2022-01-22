import { Heading, Stack, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import '../App.css';

const ConfirmWindow = ({ cancelDeleteProcess, deleteStory, isLoading }) => {
    return (
        <div>
            <Stack>
                <Heading className="confirm-window-heading">
                    Are you sure to delete this story?
                </Heading>
                <div>
                    <HStack>
                        <Button
                            onClick={cancelDeleteProcess}
                            colorScheme={'green'}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={deleteStory}
                            colorScheme={'red'}
                            isLoading={isLoading}
                        >
                            Delete Story
                        </Button>
                    </HStack>
                </div>
            </Stack>
        </div>
    );
};

export default ConfirmWindow;
