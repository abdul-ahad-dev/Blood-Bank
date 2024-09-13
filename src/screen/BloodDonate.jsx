import { db, auth } from '../database/firebase.config'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function BloodDonate() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
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
                const userData = { name, email, phone, city, gender, uid }
                await setDoc(doc(db, "blood-doner", uid), userData)

                Swal.fire({
                    title: 'success',
                    text: 'Successfully create account',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                navigate('/home')
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
                        Donate Blood Today
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300 ">

                        <a href="#" title="" onClick={() => navigate('/home')}
                            className="font-semibold text-white transition-all duration-200 hover:underline" >
                            Home
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
                                <label htmlFor=""
                                    className="text-base font-medium text-white" >
                                    Phone number:
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setPhone(e.target.value)}
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-white px-3 py-2 text-sm placeholder:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="0330-1234567"
                                        required=""
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="countries"
                                    className="text-base font-medium text-white" >
                                    Select a Blood Group
                                </label>
                                <div className="mt-2">

                                    <select
                                        onChange={e => setCity(e.target.value)}
                                        id="countries"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option disabled selected>Choose a Blood Group</option>
                                        <option value="O-negative">O negative</option>
                                        <option value="O-positive">O positive</option>
                                        <option value="A-negative">A negative</option>
                                        <option value="A-positive">A positive</option>
                                        <option value="A-negative">B negative</option>
                                        <option value="B-positive">B positive</option>
                                        <option value="AB-negative">AB negative</option>
                                        <option value="AB-positiv">AB positive</option>
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label className="text-base font-medium text-white">
                                    Identification
                                </label>

                                <div className="mt-2">
                                    <ul className="items-center w-full text-sm font-medium text-black bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-200">
                                            <div className="flex items-center ps-3">
                                                <input
                                                    id="horizontal-list-radio-license"
                                                    type="radio"
                                                    value="male"
                                                    name="list-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    onChange={e => setGender(e.target.value)}
                                                />
                                                <label
                                                    htmlFor="horizontal-list-radio-license"
                                                    className="w-full py-3 ms-2 text-sm font-medium text-black dark:text-gray-300"
                                                >
                                                    Male{" "}
                                                </label>
                                            </div>
                                        </li>
                                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input
                                                    id="horizontal-list-radio-id"
                                                    type="radio"
                                                    value="female"
                                                    name="list-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    onChange={e => setGender(e.target.value)}
                                                />
                                                <label
                                                    htmlFor="horizontal-list-radio-id"
                                                    className="w-full py-3 ms-2 text-sm font-medium text-black dark:text-gray-300"
                                                >
                                                    Female
                                                </label>
                                            </div>
                                        </li>

                                    </ul>
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