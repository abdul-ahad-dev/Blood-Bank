import { db } from '../database/firebase.config'
import { onSnapshot, getDocs, query, addDoc, collection, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back from '../assets/back.png'
import user from '../assets/user.png'
import moment from 'moment';

export default function Chat() {

    const naviagte = useNavigate()
    const { state } = useLocation()
    const [message, setMessage] = useState([])
    const [chatList, setChatList] = useState([])


    useEffect(() => {
        const q = query(collection(db, "chat"), where(state.uid, "==", true), where(state.myUid, "==", true));
        const unsubscribe = onSnapshot(q, (docSnap) => {
            const list = [];
            docSnap.forEach((doc) => {
                list.push(doc.data());
            });
            const sortList = list.sort((a, b) => a.createdAt - b.createdAt);
            setChatList(list);
            console.log(list);

        });

        return () => unsubscribe();
    }, [])


    const sendMessage = async () => {
        if (!message) return;

        let myUid = await localStorage.getItem("userId")

        addDoc(collection(db, "chat"), {
            message: message,
            [state.myUid]: true,
            [state.uid]: true,
            senderUid: myUid,
            createdAt: Date.now(),
        })
        setMessage('')
    }

    return (
        <>
            <div className="bg-blue-300 flex gap-3 items-center px-6 py-3">
                <img src={back} className="h-8 w-8 rounded-xl active:scale-110" onClick={() => naviagte('/chatlist')} alt="Back" />
                <img src={user} className="h-12 w-12 ml-4 rounded-full" alt="User" />
                <h1 className="text-2xl font-bold">Abdul Ahad</h1>
            </div>

            <div className="flex flex-col h-[80vh] w-full mx-auto rounded-b-2xl bg-gray-50 shadow-lg">
                <div className="flex-1 overflow-auto p-4 space-y-3">
                    {chatList.map((item, index) => (
                        <div key={index} className={`flex ${item.senderUid == state.myUid ? 'justify-start' : 'justify-end'}`}>
                            <div className={`w-max rounded-3xl shadow-lg px-7 py-3 ${item.senderUid == state.myUid ? 'bg-gray-100' : 'bg-blue-100'}`}>
                                <h1 className="font-semibold text-xl">{item.message}</h1>
                                <h1 className="font-light text-sm text-gray-700">{moment(item.createdAt).startOf('second').fromNow()}</h1>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div
                    className="bg-white px-4 py-3 rounded-b-2xl flex items-center gap-2 relative">
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-2xl py-2 px-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button onClick={sendMessage} className="absolute right-5 py-2 px-5 rounded-2xl bg-red-600 text-white">
                        Send
                    </button>
                </div>
            </div>
        </>
    )
}