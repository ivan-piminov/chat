import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import {LOGIN_ROUTE} from "../utils/const"
import {Context} from "../../index"
import {useAuthState} from "react-firebase-hooks/auth"
import './Navbar.css'
import Time from "../Time/Time"

const Navbar = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg">
            <div className="container-fluid">
                {user
                    ? (<>
                            <Time/>
                            <button type="button" className="btn btn-outline-primary"
                                    onClick={() => auth.signOut()}>Выйти
                            </button>
                        </>
                    )
                    : (
                        <NavLink to={LOGIN_ROUTE}>
                            <Time/>
                        </NavLink>
                    )
                }
            </div>
        </nav>
    )
}
export default Navbar;
