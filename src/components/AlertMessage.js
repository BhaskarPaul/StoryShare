import React from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

const AlertMessage = ({ message, handleClose }) => {
    return (
        <div style={{ marginTop: '30px', borderRadius: '10px' }}>
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{message}</AlertTitle>
                {/* <AlertDescription>
                    Your Chakra experience may be degraded.
                </AlertDescription> */}
                <CloseButton
                    onClick={handleClose}
                    position="absolute"
                    right="8px"
                    top="8px"
                />
            </Alert>
        </div>
    );
};

export default AlertMessage;
