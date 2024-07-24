import React, { useEffect, useRef, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'

import prof from '../Images/Avatars.png'
import prof1 from '../Images/Creve1.png'
import { IoSend } from 'react-icons/io5'
import { TbMessageCircleOff } from 'react-icons/tb'
import { BiArrowBack } from "react-icons/bi";
import Picker from '@emoji-mart/react'
import data  from '@emoji-mart/data'

const CreativeChat = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
      setShow(!show)
    }


  return (
    <div className=''>
      <div className=''>
        <CreativeSideBarCom show={show} />
      </div>
      <div className=''>
        <CreativeNavBarCom show={show} handleShow={handleShow}/>
        <CreativeChatDashboard />
      </div>
    </div>
  )
}

export default CreativeChat




// ====================== INNNER DASHBOARD ==============================
export const CreativeChatDashboard = () => {

    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([]);


    const users = [
        {
            id: 1,
            name: 'Obi',
            image: prof,
            messages : [
                {
                    sender: 1,
                    text: 'How is Mumsi'
                },

                {
                    sender: 2,
                    text: 'I am doing well, thank you! How about you?'
                },
                {
                    sender: 1,
                    text: 'How is Mumsi'
                },

                {
                    sender: 2,
                    text: 'I am doing well, thank you! How about you?'
                },

                {
                    sender: 1,
                    text: 'Hello there, how are you?'
                },
                
        
                {
                    sender: 1,
                    text: 'Same here, I am enjoying the new design. Do you have any recommendations?'
                },
                
            ]
        },


        {
            id: 2,
            name: 'Emeka',
            image: prof1,
            messages : [
                {
                    sender: 1,
                    text: 'Hello there, how are you?'
                },
                
                {
                    sender: 2,
                    text: 'I am doing well, thank you! How about you?'
                },
            ]
        },
    ]



    const [selectedChat, setSelectedChat] = useState(null);
    const [messageSide, setMessageSide] = useState(true);

    const handleClick = (id) => {
        setSelectedChat(id);
        setMessageSide(false);
        // document.getElementById('my_modal_4').showModal()
    };

    console.log('This is my selected chat', selectedChat);





    const [isLoading, setIsLoading] = useState(false)
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

    return (
        <div className='lg:flex relative w-full'>
            <div className={`${messageSide === true ? 'lg:block block' : 'lg:block hidden'} block lg:ml-[14rem] lg:z-10 z-30 bg-neutral-100 border-r border-neutral-300 h-[100vh] fixed pt-24 lg:w-[15rem] w-[100%]`}>
                <div className=''>
                    <h2 className='pl-5 pb-4'>Messages</h2>

                    {users.map((user)=>(
                    <div className=''>
                        <div onClick={() => handleClick(user)} className={`flex gap-3 border-y border-y-neutral-200 p-5 items-center  cursor-pointer hover:bg-neutral-200 hover:transition-all hover:ease-linear`}>
                            <div className='bg-neutral-200 w-8 h-8 flex overflow-hidden items-center rounded-full'>
                                <img src={user?.image} alt="" className='w-8 h-8 object-cover'/>
                            </div>
                            <div className=''>
                                <h2 className='text-sm'>{user?.name}</h2>
                                {user?.messages[0]?.sender === 1 && (
                                    <p className='text-xs'>You: {user?.messages[0]?.text.slice(0, 20)} . .</p>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className='w-full '>


                <div className='lg:hidden z-20 flex items-center fixed bg-neutral-200 w-full mt-[3.8rem] py-2 lg:pr-10 px-5'>
                    <p className='text-xl font-bold bg-white p-2 rounded-full flex w-fit' onClick={()=>setMessageSide(true)}><BiArrowBack /></p>
                    <p className='text-xs ml-auto italic'>ENCRYPTED CHAT</p>
                </div>

                {selectedChat === null ? 
                    <div className='flex pl-[20rem] h-screen m-auto justify-center items-center'>
                        <div className='text-center'>
                            <p className='flex m-auto justify-center text-4xl opacity-35'><TbMessageCircleOff /></p>
                            <p className='text-xs'>No Message</p>
                        </div>
                    </div>  :
                    // ''
                    <div className='  w-full lg:py-20 py-28 lg:pb-5 pb-5 lg:h-[90vh] h-[90vh] overflow-y-scroll'>

                
                        <div className='2xl:pl-[35rem] xl:pl-[30rem] lg:pl-[30rem] lg:pr-10 px-5 lg:pt-0 p-10'>
                            {selectedChat?.messages?.reverse()?.map((msg, index) => (
                                
                                <div className='flex flex-col gap-3 w-full' key={index}>

                                {msg.sender === 1 ? (

                                    <div class="chat chat-end my-2">
                                        <div className='flex items-center gap-3'>
                                            <div class="chat-bubble bg-blue-700  text-white max-w-xs break-words">
                                                <p className='text-[10px] opacity-70 text-left'>{msg.sender}</p>
                                                <p className='lg:text-sm text-xs'>{msg.text}</p>
                                            </div>
                                            <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.sender}</p>
                                        </div>
                                    </div> 
                                ) : (

                                    <div className="chat chat-start my-2">
                                        <div className='flex items-center gap-3'>
                                        <p className='bg-blue-800 text-white p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.sender}</p>
                                        <div className="chat-bubble bg-neutral-100  text-black max-w-xs break-words">
                                            <p className='text-[10px] opacity-70 text-left'>{msg.sender}</p>
                                            <p className='lg:text-sm text-xs'>{msg.text}</p>
                                        </div>
                                    </div>
                                </div>                    
                                )}
                            </div>
                            ))}
                        </div>
                    </div>
                }


                <div className='fixed justify-center right-0  2xl:w-[77%] xl:w-[64%] lg:w-[58%] w-full 2xl:px-[10rem] xl:px-[3rem] lg:px-[3rem] bottom-0 py-5 pt-5 border-t bg-white border-neutral-200   px-5'>

                    <form className='flex relative items-center gap-3 w-full'>

                    <div className='relative w-full flex'>
                        <textarea type="text" 
                            placeholder="Enter Message" 
                            className="input text-xs input-bordered w-full resize-none lg:max-h-[6rem] min-h-[2rem] max-h-[6rem] overflow-auto py-3 lg:pr-20 pr-10 rounded-lg" 
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

                        <button type='submit'  className="border-none bg-blue-700 text-white text-base flex gap-3 items-center p-3 rounded-full justify-center ">
                            {isLoading === false ?  <IoSend /> : <span className="loading loading-spinner loading-sm"></span>}
                        </button>
                    </form>
                </div> 
            </div>
        </div>
    )
}
