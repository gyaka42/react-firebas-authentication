import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import UpdateProfile from "../components/UpadateProfile"
import { logout, emailVerification } from "../firebase"
import { logout as logoutHandle } from "../store/auth"

export default function Home(){

    const {user} = useSelector(state=>state.auth)

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate("/login", {
            replace: true
        })
    }

    const handleVerification = async () => {
        await emailVerification()
    }

    if (user){
        return(
            <div className="max-w-xl mx-auto py-5">
                <h1 className="flex gap-x-4 items-center"> {user.photoURL && <img src={user.photoURL} className="w-10 h-10 rounded-full" />} Oturum Acildi {user.displayName}
                <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Cikis yap</button>
                {!user.emailVerified &&
                <button onClick={handleVerification} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Email Onayla</button>}
                </h1>

                <UpdateProfile />
            </div>
        )
    }
    return(
        <div>
            <Link to="/register">Kayit ol</Link>
            <Link to="/login">Giris yap</Link>
        </div>
    )
}