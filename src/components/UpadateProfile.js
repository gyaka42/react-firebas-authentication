import { useState } from "react"
import { update, auth, resetPassword } from "../firebase"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/auth"

export default function UpdateProfile() {

    const dispath=useDispatch()
    const {user} = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || "")
    const [avatar, setAvatar] = useState(user.photoURL || "")
    const [password, setPassword] = useState("")

    const handleSubmit = async e =>{
        e.preventDefault()
        await update ({
            displayName,
            photoURL: avatar
        })
        dispath(login({
            displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          emailVerified: auth.currentUser.emailVerified,
          photoURL: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        }))
    }

    const handleResetSubmit = async e => {
        e.preventDefault()
        const result = await resetPassword(password)
        if (result) {
            setPassword("")
        }
        
    }


    return (
        <div className="grid gap-y-10">
            <form onSubmit={handleSubmit} className="grid gap-y-4">
            <h1 className="text-xl font-bold-mb-4">Profili Guncelle</h1>
                        <div>
                <label className="block text-sm font-medium text-gray-700">
                    Ad-soyad
                </label>
                <div className="mt-1">
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="John Doe" value={displayName} onChange={e => setDisplayName(e.target.value)} />                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fotograf
                </label>
                <div className="mt-1">
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="John Doe" value={avatar} onChange={e => setAvatar(e.target.value)} />                </div>
            </div>
            <div>
            <button className="disabled:opacity-20 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit"> Guncelle </button>
            </div>
        </form>
        <form onSubmit={handleResetSubmit} className="grid gap-y-4">
            <h1 className="text-xl font-bold-mb-4">Parolayi Guncelle</h1>
                        <div>
                <label className="block text-sm font-medium text-gray-700">
                    Parola
                </label>
                <div className="mt-1">
                    <input type="password" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Degistir" value={password} onChange={e => setPassword(e.target.value)} />                </div>
            </div>
            
            <div>
            <button disabled={!password} className="disabled:opacity-20 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit"> Sifreyi Guncelle </button>
            </div>
        </form>
        </div>
    )
}