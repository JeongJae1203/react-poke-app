// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCXjQjZ9KoRgiGAHUsrMyri9xEEwm3DC0A",
	authDomain: "react-poke-app-57fc9.firebaseapp.com",
	projectId: "react-poke-app-57fc9",
	storageBucket: "react-poke-app-57fc9.firebasestorage.app",
	messagingSenderId: "144649010209",
	appId: "1:144649010209:web:cc64524e260a28070cb760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;