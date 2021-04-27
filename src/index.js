import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: "AIzaSyBQ2txFJpvRUf0C7uDKeQyUVvlJ5c-jA6I",
    authDomain: "chat-5dc04.firebaseapp.com",
    projectId: "chat-5dc04",
    storageBucket: "chat-5dc04.appspot.com",
    messagingSenderId: "375116104170",
    appId: "1:375116104170:web:da87a9652efce73cdbb293",
    measurementId: "G-GDCBFTR9S9"
});
const auth = firebase.auth()
const firestore = firebase.firestore()

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
