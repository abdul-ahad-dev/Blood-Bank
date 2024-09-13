import { db, auth } from '../database/firebase.config'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Signup() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    function handleSignup(e) {
        e.preventDefault();
        setIsLoading(true)
        console.log("clicked")

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const uid = response.user.uid;
                localStorage.setItem("userId", uid)
                const userData = { name, email, uid }
                await setDoc(doc(db, "blood-users", uid), userData)

                Swal.fire({
                    title: 'success',
                    text: 'Successfully create account',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                navigate('/login')
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
                console.error("Error Code:", error.code);
                console.error("Error Message:", error.message);
                console.error("Error Details:", error);
                Swal.fire({
                    title: 'Something Went Wrong',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            });

    }


    return (
        <section>
            <div className="w-screen h-screen bg-red-900 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-x-hidden">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-red-950 p-5  rounded-xl shadow-md shadow-gray-900">
                    <h2 className="text-center text-2xl font-bold leading-tight text-white">
                        Sign Up to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300 ">
                        have an account?{" "}
                        <a href="#" title="" onClick={() => navigate('/login')}
                            className="font-semibold text-white transition-all duration-200 hover:underline" >
                            Login
                        </a>
                    </p>
                    <form className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-white">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input type="email" placeholder="Name" onChange={e => setName(e.target.value)} required
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    ></input>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className="text-base font-medium text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input type="email" placeholder="abc@gmail" onChange={e => setEmail(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    ></input>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="" className="text-base font-medium text-white">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                    ></input>
                                </div>
                            </div>


                            <div>
                                {isLoading ?
                                    <div className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 leading-7 text-black font-bold" disabled>
                                        <img src="https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/0/4/a047bb6e4236686095168948698596f6ceb059e8.gif" className="w-8 h-8 object-cover scale-125 text-white bg-white" alt="" />
                                    </div>
                                    :

                                    <button type="button"
                                        onClick={handleSignup}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black" >
                                        Get started
                                    </button>
                                }
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}