import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../firebase"
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
    if (user){
        return(
            <div className="max-w-xl mx-auto py-5">
                <h1 className="flex gap-x-4 items-center">Oturum Acildi {user.email}
                <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Cikis yap</button>
                </h1>
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