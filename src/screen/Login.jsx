import { auth } from '../database/firebase.config'
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    function handleLogin(e) {
        setIsLoading(true)
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                const user = response.user;
                localStorage.setItem("userId", response.user.uid)
                console.log(user);
                Swal.fire({
                    title: 'success',
                    text: 'Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                Swal.fire({
                    title: 'Something Went Wrong',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                setIsLoading(false)
            });
    }

    return (
        <section>
            <div className="w-screen h-screen bg-red-700 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-red-950 p-5 rounded-xl shadow-md shadow-gray-900">
                    <h2 className="text-center text-2xl font-bold leading-tight text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-200 ">
                        Don&apos;t have an account?{" "}
                        <a href='#' onClick={() => navigate('/signup')}
                            className="font-semibold text-white transition-all duration-200 hover:underline" >
                            Create a free account
                        </a>
                    </p>
                    <form action="#" method="POST" className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-200">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-200">
                                        Password
                                    </label>
                                    <a href="#" title="" className="text-sm font-semibold text-white hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                {isLoading ?
                                    <div className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black" disabled>
                                        <img src="https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/0/4/a047bb6e4236686095168948698596f6ceb059e8.gif" className="w-8 h-8 object-cover scale-125 text-white bg-white" alt="" />
                                    </div>
                                    :

                                    <button type="button"
                                        onClick={handleLogin}
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