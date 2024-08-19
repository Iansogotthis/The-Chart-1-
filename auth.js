// auth.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in with Google:", user);
        return user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
};

const signOutUser = async() => {
    try {
        await auth.signOut();
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const fetchUserInfo = async() => {
    // Retrieve user information here (e.g., from Firebase)
    try {
        const user = await auth.currentUser;
        return user;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }

}
module.exports = { signInWithGoogle, signOutUser, fetchUserInfo };