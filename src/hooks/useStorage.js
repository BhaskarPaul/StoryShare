import { useState, useEffect } from 'react';
import { app } from '../firebase.config';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import Compressor from 'compressorjs';

const useStorage = nonCompressedFile => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // const compressImage = () => {
    //     new Compressor(normalFile, {
    //         quality: 0.8,
    //         success: result => setFile(result),
    //     });
    // };

    useEffect(() => {
        new Compressor(nonCompressedFile, {
            quality: 0.8,
            success: file => {
                const storage = getStorage(app);
                const storageRef = ref(storage, 'images/' + file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        let percentage =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        setProgress(percentage);
                    },
                    error => {
                        setError(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            downloadUrl => setUrl(downloadUrl)
                        );
                    }
                );
            },
        });
    }, [nonCompressedFile]);

    return { progress, error, url };
};

export default useStorage;
