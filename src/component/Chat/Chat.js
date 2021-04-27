import React, {useContext, useState, useRef, useEffect} from "react"
import {Context} from "../../index"
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import firebase from "firebase"
import Loader from "../Loader/Loader"
import "./Chat.css"
import "emoji-mart/css/emoji-mart.css"
import {Picker} from "emoji-mart"

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [newMessage, setNewMessage] = useState('')
    const [isHiddenEmoji, setIsHiddenEmoji] = useState(true)

    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )
    const messagesEndRef = useRef();
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    });

    if (loading) {
        return <Loader/>
    }

    const addEmoji = e => {
        let emoji = e.native;
        setNewMessage(newMessage + emoji)
    };

    const addMessages = async (e) => {
        e.preventDefault()
        if (newMessage) {
            firestore.collection("messages").add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setNewMessage("")
            setIsHiddenEmoji(true)
        }
    }
    if (user) {
        return (
            <div className="main">
                <div onClick={() => setIsHiddenEmoji(true)} className="shadow-lg chat-wrapper">
                    <div className="pt-3 message-wrapper">
                        {messages.map((message) =>
                            <div ref={messagesEndRef} key={message.createdAt}
                                 className={user.uid === message.uid ? 'your-message' : 'interlocutor-message'}>
                                <div
                                    className={user.uid === message.uid ? "shadow p-2 mt-2 bg-white rounded message" : "shadow p-2 m-2 rounded custom-message"}>
                                    <div className="fs-6 text-secondary">
                                        {message.displayName}
                                    </div>
                                    <div className="fs-6">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <form className="custom mt-4">
                    <div className="pr-2">
                        <input type="text"
                               size='60'
                               className="form-control mr-2"
                               placeholder="Введите текст сообщения"
                               onChange={(e) => setNewMessage(e.target.value)}
                               value={newMessage}/>
                    </div>
                    <div className="emoji-box">
                        <img onClick={() => setIsHiddenEmoji(!isHiddenEmoji)} className="emoji-btn"
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNAmJdZrS3hZDrOE1jCLwA2Mp-bRnQc1gKww&usqp=CAU"
                             alt="no"/>
                        {isHiddenEmoji
                            ? null
                            : <>
                                <div className="emoji-bg" onClick={() => setIsHiddenEmoji(true)}> </div>
                                <div className="emoji-panel"><Picker onSelect={addEmoji}/></div>
                              </>
                        }
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={addMessages}>Отправить</button>
                </form>
                <div className="text-white m-2">
                    <div><b>Данные о пользователе </b></div>
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Имя:</b> {user.displayName} </div>
                </div>

            </div>
        )
    }

}
export default Chat;
