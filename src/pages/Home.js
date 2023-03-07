import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import UpdateProfile from "../components/UpadateProfile"
import { logout, auth, emailVerification } from "../firebase"
import { logout as logoutHandle } from "../store/auth";
import logo from "../assets/img/logo.png"


export default function Home(){

    const {user} = useSelector(state=>state.auth)

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate("/", {
            replace: true
        })
    }

    const handleVerification = async () => {
        await emailVerification()
    }

    if (user){
        return(
            <div className="max-w-xl mx-auto py-5 mt-10">
                <h1 className="flex gap-x-4 items-center"> {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} className="w-10 h-10 rounded-full" />} Oturum Acildi {user.displayName}
                <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Cikis yap</button>
                {!user.emailVerified &&
                <button onClick={handleVerification} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Email Onayla</button>}
                </h1>

                <UpdateProfile />
            </div>
        )
    }
    return(
        <div className="flex flex-col items-center">
            <div>
            <img src={logo} className="mt-60 rounded-full w-54" />
            </div>
            <div className="flex justify-center max-w-xl mt-20 gap-4">

            <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/register">Kayit ol</Link>
            </div>
            <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/login">Giris yap</Link>
            </div>
            </div>
        </div>
    )
}