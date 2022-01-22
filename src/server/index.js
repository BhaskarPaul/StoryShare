import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../firebase.config';

export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUserWithEmailAndPassword = async data => {
    try {
        const { firstName, lastName, email, password, checkbox } = data;
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = response.user;
        await addDoc(collection(db, 'users'), {
            _id: user.uid,
            name: firstName + ' ' + lastName,
            firstName,
            lastName,
            email,
            authType: 'e&p',
            termsAcceptation: checkbox,
        });
    } catch (error) {
        console.log('error', error.message);
        return error.message;
    }
};

export const stringDate = type => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const monthArray = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${type === 'c' ? 'created' : 'updated'} at ${day} ${
        monthArray[month]
    }, ${year}`;
};
