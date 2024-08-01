import React, { useEffect, useRef, useState } from 'react'
import UserNavbar from './UserNavbar'
import UserSideBar from './UserSideBar'
import prof1 from '../Images/Creve1.png'
import { IoSend } from 'react-icons/io5'
import { TbMessageCircleOff } from 'react-icons/tb'
import { BiArrowBack } from "react-icons/bi";
import Picker from '@emoji-mart/react'
import data  from '@emoji-mart/data'
import { jwtDecode } from 'jwt-decode';
import Pusher from "pusher-js";
import prof from '../Images/Avatars.png'
import { BASE_URL } from '../Auth/BaseUrl'
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import MyLoader from '../allLoadingState/MyLoader'

const UserChat = () => {
    
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = authUser?.access ? jwtDecode(authUser.access) : null;


    const [users, setUsers] = useState([]);
    const [isLoadinga, setIsLoadinga] = useState(false);

    const url5 =`${BASE_URL}/chat/`
    const fetchMessages = async () => {
        setIsLoadinga(true);
        try {
        const response = await fetch(url5, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${authUser.access}`,
            },
        })
        if (!response.ok) {
            setIsLoadinga(false);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data)

        } catch (error) {
            console.log(error);
        } finally {
        setIsLoadinga(false);
        }
    }
    useEffect(() => {
        fetchMessages();
    }, []);


  return (
    <div className=''>
        <UserChatDashboard users={users} userToken={userToken} authUser={authUser} isLoadinga={isLoadinga}/>
    </div>
  )
}

export default UserChat





export const UserChatDashboard = ({users, userToken, authUser, isLoadinga}) => {
    const [selectedChat, setSelectedChat] = useState('');
    const [messageSide, setMessageSide] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [messages1, setMessages1] = useState([]);
    const [message, setMessage] = useState('');

    const handleClick = (chat) => {
        setSelectedChat(chat);
        setMessageSide(false);
        console.log('This is selected chat', chat);
        setMessages1(chat?.messages || []);
        // document.getElementById('my_modal_4').showModal()
    };

    useEffect(() => {
        if (!selectedChat) return;
        Pusher.logToConsole = true;

        const pusher = new Pusher('ffd0f41c2f813018fb0d', {
            cluster: 'mt1'
        });
        const channel = pusher.subscribe(selectedChat.room_name);
        channel.bind('message', function (data) {
              setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [selectedChat]);


    const [chatLoading, setChatLoading] = useState(false)
    const submit = async (e) => {
        e.preventDefault();
        setChatLoading(true);
        if (message.trim() === '') return;
        try {
            const response = await fetch(`${BASE_URL}/chat/messages/${selectedChat.room_name}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.access}`,
                },
                body: JSON.stringify({
                    'body':message
                })
            });

            if (!response.ok) {
                setChatLoading(false);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // setMessages((prevMessages) => [...prevMessages, data]);
            console.log('This is messages', messages);
            setChatLoading(false);
            setMessage('');
        } catch (error) {
            setChatLoading(false);
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const [showPicker, setShowPicker] = useState(false);
    const addEmoji = (e) => {
        let emoji = e.native;
        setMessage((prevText) => prevText + emoji);
    };


    const navigate = useNavigate()
    const goBack = () =>{
      navigate(-1);
    }




    return (

        <div>
            <div className='bg-white flex items-center fixed w-full lg:p-10 lg:py-5 px-5 py-3 z-50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                
                <button onClick={goBack} className='color rounded-full py-2 px-5 text-white text-xs'>Back</button>

                <div className='flex items-center gap-3 ml-auto'>
                    <p><FaRegCircleUser /></p>
                    <h2 className='text-xs '>{userToken?.name}</h2>
                </div>
            </div>

            <div className='lg:flex relative w-full'>
                <div className={`${messageSide === true ? 'lg:block block' : 'lg:block hidden'} block  lg:z-10 z-30 bg-neutral-100 border-r border-neutral-300 h-[100vh] fixed pt-24 lg:w-[15rem] w-[100%]`}>
                    <div className=''>
                        <h2 className='pl-5 pb-4'>Messages</h2>


                        {isLoadinga === true ? <><MyLoader /></> : <>
                            {users.length === 0 ? 
                            <div className='pt-[5rem]'>
                                <p className='flex m-auto justify-center text-3xl opacity-35'><TbMessageCircleOff /></p>
                                <h2 className='text-center text-sm'>No Chat Yet</h2>
                            </div>   : 
                                <>
                                    {users.map((user)=>(
                                        
                                        <div className=''>

                                            {user?.reciever?.user?.email !== userToken?.email ?
                                            <div onClick={() => handleClick(user)} className={`flex gap-3 border-y border-y-neutral-200 p-5 items-center  cursor-pointer hover:bg-neutral-200 hover:transition-all hover:ease-linear`}>
                                                <div className='bg-neutral-200 w-8 h-8 flex overflow-hidden items-center rounded-full'>
                                                    <img src={user?.reciever?.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                                                </div>
                                                <div className=''>
                                                    <h2 className='text-sm'>{user?.reciever?.user?.fullname}</h2>
                                                    {/* <p className='text-xs'>You: {user?.messages[0]?.body.slice(0, 5)} . .</p> */}
                                                </div>
                                            </div> : 


                                            <div onClick={() => handleClick(user)} className={`flex gap-3 border-y border-y-neutral-200 p-5 items-center  cursor-pointer hover:bg-neutral-200 hover:transition-all hover:ease-linear`}>
                                                <div className='bg-neutral-200 w-8 h-8 flex overflow-hidden items-center rounded-full'>
                                                    <img src={user?.sender?.profile_pics} alt="" className='w-8 h-8 object-cover'/>
                                                </div>
                                                <div className=''>
                                                    <h2 className='text-sm'>{user?.sender?.user?.fullname}</h2>
                                                    {/* <p className='text-xs'>You: {user?.messages[0]?.body.slice(0, 5)} . .</p> */}
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    ))}
                                </>
                            }
                        </>}
                    </div>
                </div>

                <div className='w-full '>


                    <div className='lg:hidden z-20 flex items-center fixed bg-neutral-200 w-full mt-[3.8rem] py-2 lg:pr-10 px-5'>
                        <p className='text-xl font-bold bg-white p-2 rounded-full flex w-fit' onClick={()=>setMessageSide(true)}><BiArrowBack /></p>
                        <p className='text-xs ml-auto italic'>ENCRYPTED CHAT</p>
                    </div>

                    {messages1?.length === 0 ? 
                        <div className='flex pl-[20rem] h-screen m-auto justify-center items-center'>
                            <div className='text-center'>
                                <p className='flex m-auto justify-center text-4xl opacity-35'><TbMessageCircleOff /></p>
                                <p className='text-xs'>No Message</p>
                            </div>
                        </div>  :
                        <div ref={chatContainerRef} className='w-full lg:py-20 py-28 lg:pb-5 pb-5 lg:h-[90vh] h-[90vh] overflow-y-scroll'>

                                <div className='2xl:pl-[20rem] xl:pl-[20rem] lg:pl-[20rem] lg:pr-10 px-5 lg:pt-0 p-10'>
                                    {messages1.slice().reverse().map((msg, index) => (
                                        
                                        <div className='flex flex-col gap-3 w-full' key={index}>

                                            {msg?.sender?.email === userToken.email ? (

                                                <div class="chat chat-end my-2">
                                                    <div className='flex items-center gap-3'>
                                                        <div class="chat-bubble mycolor4  text-white max-w-xs break-words">
                                                            <p className='text-[10px] opacity-70 text-left'>You</p>
                                                            <p className='lg:text-sm text-xs'>{msg?.body}</p>
                                                        </div>
                                                        {/* <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg?.sender?.fullname?.slice(0, 1)}</p> */}
                                                    </div>
                                                </div> 
                                            ) : (

                                                <div className="chat chat-start my-2">
                                                    <div className='flex items-center gap-3'>
                                                    {/* <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg?.sender?.fullname?.slice(0, 1)}</p> */}
                                                    <div className="chat-bubble bg-neutral-100  text-black max-w-xs break-words">
                                                        <p className='text-[10px] opacity-70 text-left'>{msg?.sender?.fullname}</p>
                                                        <p className='lg:text-sm text-xs'>{msg?.body}</p>
                                                    </div>
                                                </div>
                                            </div>                    
                                            )}
                                        </div>
                                    ))}


                                    {messages?.map((msg, index) => (
                                        
                                        <div className='flex flex-col gap-3 w-full' key={index}>

                                            {msg?.message?.sender === userToken.email ? (

                                                <div class="chat chat-end my-2">
                                                    <div className='flex items-center gap-3'>
                                                        <div class="chat-bubble mycolor4  text-white max-w-xs break-words">
                                                            <p className='text-[10px] opacity-70 text-left'>You</p>
                                                            <p className='lg:text-sm text-xs'>{msg?.message?.body}</p>
                                                        </div>
                                                        {/* <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg?.message?.fullname?.slice(0, 1)}</p> */}
                                                    </div>
                                                </div> 
                                            ) : (

                                                <div className="chat chat-start my-2">
                                                    <div className='flex items-center gap-3'>
                                                    {/* <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg?.message?.fullname?.slice(0, 1)}</p> */}
                                                    <div className="chat-bubble bg-neutral-100  text-black max-w-xs break-words">
                                                        <p className='text-[10px] opacity-70 text-left'>{msg?.message?.fullname}</p>
                                                        <p className='lg:text-sm text-xs'>{msg?.message?.body}</p>
                                                    </div>
                                                </div>
                                            </div>                    
                                            )}
                                        </div>
                                    ))}
                                </div>
                        </div>
                    }


                    <div className='fixed justify-center right-0  2xl:w-[90%] xl:w-[84%] lg:w-[80%] w-full 2xl:px-[10rem] xl:px-[3rem] lg:px-[3rem] bottom-0 py-5 pt-5 border-t bg-white border-neutral-200   px-5'>

                        <form onSubmit={submit} className='flex relative items-center gap-3 w-full'>

                        <div className='relative w-full flex'>
                            <input type="text" 
                                placeholder="Enter Message" 
                                className="input text-xs input-bordered 
                                w-full resize-none lg:max-h-[6rem] min-h-[2rem] 
                                max-h-[6rem] overflow-auto py-3 lg:pr-20 pr-10 rounded-lg" 
                                autoComplete="on" 
                                required
                                value={message}
                                disabled={chatLoading === true}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <div onClick={() => setShowPicker((val) => !val)} className='absolute right-3 lg:ml-5 ml-16 lg:bottom-1 bottom-2 top-3 lg:p-3 p-3  bg-white flex justify-center items-center  rounded-full cursor-pointer' >
                            <img
                                className="emoji-icon lg:w-6 w-6"
                                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                            />
                            </div>
                        </div>


                        {showPicker && (
                            <span className='absolute bottom-[80px] right-0'>
                                <Picker data={data} onEmojiSelect={addEmoji} className=""/>
                            </span>
                        )}

                            <button disabled={message.trim() === ''} type='submit'  className="border-none mycolor4 text-white text-base flex gap-3 items-center p-3 rounded-full justify-center ">
                                {chatLoading === false ?  <IoSend /> : <span className="loading loading-spinner loading-sm"></span>}
                            </button>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    )
}
