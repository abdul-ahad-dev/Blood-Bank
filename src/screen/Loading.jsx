import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Loading() {
    const navigate = useNavigate()

    useEffect(() => {
        checkUser()
    })

    const checkUser = async () => {
        const userUID = await localStorage.getItem('userId')

        if (userUID !== null) navigate('/home')
        else navigate('/login')
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 aspect-square flex justify-between">
                <div className="w-5 h-full bg-black animate-bounce delay-75"></div>
                <div className="w-5 h-full bg-black animate-bounce delay-[0.2s]"></div>
                <div className="w-5 h-full bg-black animate-bounce delay-[0.35s]"></div>
            </div>
        </div>
    )
}