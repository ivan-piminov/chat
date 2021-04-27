import React, {useContext} from "react"
import {Context} from "../../index"
import firebase from "firebase"
import "./Login.css"

const Login = () => {

    const {auth} = useContext(Context)
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
    }

    return (
        <div className="custom-style">
            <span className="pb-3 text-white fs-2 text">Добро пожаловать!</span>
            <button onClick={login} type="button" className="btn btn-success"> Войти через Google</button>
        </div>
    )
}
export default Login
