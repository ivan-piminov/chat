import {BrowserRouter} from "react-router-dom"
import Navbar from "./component/Navbar/Navbar"
import AppRouter from "./component/AppRouter"
import {useContext} from "react"
import {Context} from "./index"
import {useAuthState} from "react-firebase-hooks/auth"
import Loader from "./component/Loader/Loader"

function App() {
    const {auth} = useContext(Context)
    const [user, loading, error] = useAuthState(auth)
    console.log(user)

    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
