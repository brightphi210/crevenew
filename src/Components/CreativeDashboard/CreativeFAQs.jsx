import React, { useEffect, useState } from 'react'
import CreativeSideBarCom from './CreativeSideBarCom'
import CreativeNavBarCom from './CreativeNavBarCom'
import { FaPlus } from "react-icons/fa6";
import { IoNotificationsOff } from "react-icons/io5";
import { BASE_URL } from '../Auth/BaseUrl';

const CreativeFAQs = () => {

    const [show, setShow] = useState(false)
  
    const handleShow = () => {
      setShow(!show)
    }
  
  
  return (
    <div className='flex flex-row w-full bg-neutral-100 2xl:h-[100vh] xl:h-full lg:h-full h-screen'>
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
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const handleQuestionChange = (e) => setQuestion(e.target.value);
    const handleAnswerChange = (e) => setAnswer(e.target.value);
    

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
          setIsLoading(false);


        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }

    };




    useEffect(() => {
        fetchFAQs();
    }, []);


  return (
    <div className='2xl:p-20 2xl:pt-28 2xl:pl-[18rem] lg:pl-[18rem] p-5 pt-20'>

      <div className='bg-white  h-[75vh] rounded-lg p-10 overflow-y-scroll relative'>
      {success === false && (
        <div
          role="alert"
          data-aos="fade-up"
          data-aos-duration="800"
          className="alert rounded-lg bg-green-100 border border-green-600 absolute  text-green-600 h-[3rem] right-0 left-0 top-[20px] flex justify-center m-auto text-xs lg:w-fit w-full"
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
            <h2 className='lg:block hidden'>Frequently Asked Questions</h2>
            <h2 className='block lg:hidden text-sm font-bold'>FAQs</h2>
            <button className="btn btn-active btn-neutral ml-auto flex items-center gap-2 text-xs p-2 py-2 max-h-[2rem] min-h-[2rem]" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add <FaPlus /></button>
        </div>



        {faqs.length === 0 ? (

            <div className='flex justify-center items-center h-[30rem]'>
                <div className='text-center text-neutral-300 '>
                    <p>No Data</p>
                    <p className='text-6xl'><IoNotificationsOff /></p>
                </div>
            </div>
        ) : (

            <div>
                
                {faqs.map((faq, index) =>(
                    <div className="collapse bg-neutral-100 collapse-arrow rounded-md  mb-5" key={index}>
                        <input type="checkbox" />

                        <div className="collapse-title text-base font-medium bg-neutral-50">{faq.question}</div>
                        <div className="collapse-content">
                            <p className='w-1/2 text-justify text-sm pt-5'>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

        )}

      </div>


        <dialog id="my_modal_3" className="modal" >
        <div className="modal-box rounded-lg">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById('my_modal_3').close()}>✕</button>

            <h3 className="font-bold text-lg pb-3">Add FAQ</h3>
            <p>Please and frequently ask Questions below</p>
            <form action="" className='flex flex-col gap-3 pt-5' onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Add FAQ Question" 
                    required 
                    value={question}
                    className="input input-bordered w-full rounded-md text-sm" 
                    onChange={handleQuestionChange}

                />
                <textarea 
                    className="textarea textarea-bordered min-h-[8rem] max-h-[8rem]" 
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

