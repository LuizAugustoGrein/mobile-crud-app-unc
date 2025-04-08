import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
 
const app = initializeApp({
    // chave
});

const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
};