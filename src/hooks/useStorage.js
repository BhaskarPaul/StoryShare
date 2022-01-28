import { useState, useEffect } from 'react';
import { app } from '../firebase.config';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

const useStorage = file => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                let percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            },
            error => {
                setError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl =>
                    setUrl(downloadUrl)
                );
            }
        );
    }, [file]);

    return { progress, error, url };
};

export default useStorage;
