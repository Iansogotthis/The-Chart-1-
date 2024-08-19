// firebase.js
document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
        apiKey: "AIzaSyA0yb7NcFYj648foilzdpUVWUyoOqr0VOw",
        authDomain: "seismic-fx-422005-e9.firebaseapp.com",
        projectId: "seismic-fx-422005-e9",
        storageBucket: "seismic-fx-422005-e9.appspot.com",
        messagingSenderId: "466306927010",
        appId: "1:466306927010:web:b229583110098687ba0afb"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Attach functions to the global window object
    firebase.initializeApp(firebaseConfig);


    const signInWithGoogle = async() => {
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            // Redirect to the profile page
            window.location.href = '/profile.html';
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    window.signInWithGoogle = signInWithGoogle;

    window.signOutUser = async function() {
        try {
            await auth.signOut();
            document.getElementById('login').style.display = 'inline';
            document.getElementById('logout').style.display = 'none';
        } catch (error) {
            console.error("Error signing out", error);
        }
    };
});