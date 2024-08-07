import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { FaPlus } from "react-icons/fa6";
import { IoNotificationsOff } from "react-icons/io5";
import { BASE_URL } from '../Auth/BaseUrl';
import NoData from '../allLoadingState/NoData';
import MyLoader from '../allLoadingState/MyLoader';

const CreativeFAQs = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }
  
  
  return (
    <div className='flex flex-row w-full 2xl:h-[100vh] xl:h-full lg:h-full h-screen'>
    <div className=''>
      <CreativeSideBarCom show={show} />
    </div>
    <div className='w-full'>
      <CreativeNavBarCom show={show} handleShow={handleShow}/>
      <CreativeFAQsDashboard />
    </div>
  </div>
  )
}

export default CreativeFAQs




export const CreativeFAQsDashboard = () => {

    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const [addFaqs, setAddFaqs] = useState(false) 
    const [success, setSuccess] = useState(false)

    const [faqs, setFaqs] = useState([])

    const newFAQs = [...faqs].reverse()
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const handleQuestionChange = (e) => setQuestion(e.target.value);
    const handleAnswerChange = (e) => setAnswer(e.target.value);
    

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const newFAQ = { question, answer };
    
        try {
          const response = await fetch(`${BASE_URL}/questions/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${authUser.access}`,
            },
            body: JSON.stringify(newFAQ),
          });   
    
          if (response.ok || response.status === 200 || response.status === 2001) {
            const createdFAQ = await response.json();
            setFaqs([...faqs, createdFAQ]);
            setQuestion('');
            setAnswer('');
            setSuccess(true);
            console.log('Created FAQs', createdFAQ);
            setIsLoading(false);
            document.getElementById('my_modal_3').close()
            
          } else {
            console.error('Error creating FAQ');
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setIsLoading(false);
        }
      };


      const fetchFAQs = async () => {
        setIsLoading2(true);
        try {
          const response = await fetch(`${BASE_URL}/questions/`, {
            headers: {
              'Authorization' : `Bearer ${authUser.access}`,
            },
          });


          if (!response.ok) {
            setIsLoading(false);
            throw new Error('Network response was not ok');
          }
          const faqData = await response.json();
          setFaqs(faqData);
          setIsLoading2(false);


        } catch (error) {
            console.error('Error:', error);
            setIsLoading2(false);
        }

    };

    useEffect(() => {
        fetchFAQs();
    }, []);


    useEffect(() => {
      if(success){
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
      }
    }, [success]);


  return (
    <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>

      <div className='bg-white  h-[75vh] rounded-lg lg:p-10 p-3 overflow-y-scroll relative'>
      {success === true && (
        <div
          role="alert"
          data-aos="fade-up"
          data-aos-duration="800"
          className="alert rounded-lg bg-green-100 border border-green-600 absolute  text-green-600 h-[3rem] right-0 left-0 top-0 flex justify-center m-auto text-xs lg:w-fit w-[80%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>FAQ Created Succesfully</span>
        </div>

      )}
        
        <div className='flex items-center mb-5'>
            <h2 className='lg:block hidden text-xl font-bold'>Frequently Asked Questions</h2>
            <h2 className='block lg:hidden text-sm font-bold'>FAQs</h2>
            <button className="btn btn-active btn-neutral ml-auto flex items-center gap-2 text-xs p-2 py-2 px-5 rounded-full max-h-[2.3rem] min-h-[2.3rem]" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add <FaPlus /></button>
        </div>


        {isLoading2 === true ? <MyLoader /> : 
        <>
          {faqs.length === 0 ? (

            <NoData />
          ) : (

            <div>
                {newFAQs.map((faq, index) =>(
                    <div className="collapse bg-neutral-100 collapse-arrow rounded-md  mb-5" key={index}>
                        <input type="checkbox" />

                        <div className="collapse-title lg:text-base text-base font-medium bg-neutral-10">{faq.question}</div>
                        <div className="collapse-content bg-neutral-50">
                            <p className='lg:w-1/2 w-full text-justify text-sm pt-5'>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </>}

      </div>


        <dialog id="my_modal_3" className="modal" >
        <div className="modal-box rounded-lg">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById('my_modal_3').close()}>✕</button>

            <h3 className="font-bold text-lg pb-3">Add FAQ</h3>
            <p className='text-xs'>Please and frequently ask Questions below</p>
            <form action="" className='flex flex-col gap-3 pt-5' onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Add FAQ Question" 
                    required 
                    value={question}
                    className="input input-bordered w-full rounded-md text-xs" 
                    onChange={handleQuestionChange}

                />
                <textarea 
                    className="textarea textarea-bordered text-xs min-h-[8rem] max-h-[8rem]" 
                    required 
                    value={answer}
                    placeholder="Add FAQ Answer"
                    onChange={handleAnswerChange}
                ></textarea>
                <button type='submit' className="btn text-xs mt-5 color hover:bg-neutral-800 border-none text-white">{isLoading === false ? 'Add' : <span className="loading loading-spinner loading-md"></span>}</button>
            </form>
        </div>
        </dialog>
    </div>
  )
}

