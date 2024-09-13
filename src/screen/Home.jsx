import Navbar from "../components/NavBar";
import poster from "../assets/poster.avif"
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate()

    return (
        <>

            <Navbar />

            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <img
                        className="lg:w-2/6 md:w-3/6 w-11/12 mb-10 object-contain object-center rounded"
                        alt="hero"
                        src={poster}
                    />
                    <div className="text-center lg:w-2/3 w-full">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            Donate Blood Today
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Every two seconds, someone in the world needs a blood transfusion. Your donation could be the difference between life and death for a patient in need. Join us in making a vital impact—donate blood and become a hero to those who need it most.
                        </p>
                        <div className="flex justify-center">
                            <button onClick={() => navigate('/donateblood')} className="ml-4 inline-flex text-gray-200 bg-red-700 border-0 py-2 px-6 font-semibold rounded text-lg">
                                Donate Blood
                            </button>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}