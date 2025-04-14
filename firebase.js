import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    initializeAuth,
    getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const app = initializeApp({
    // chaves
});

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export {
    auth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
};