import React from 'react'

const HelpCom = () => {
  return (
    <div className='2xl:pt-40 pt-32 lg:px-[10rem]  2xl:px-[20rem] xl:px-[10rem] px-5'>
        <h2 className='text-center lg:text-4xl text-3xl font-bold text-black'>Frequently asked questions</h2>
        <p className='text-center lg:text-lg text-sm text-black py-5'>Below are Frequently asked questions </p>

        <div className='bg-white lg:p-10 p-3 px-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl lg:my-10 mt-0 mb-10'>
            <div className="collapse collapse-arrow bg-white rounded-none border-b border-b-neutral-200 mt-5">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-base font-medium">What is Creve ?</div>
                    <div className="collapse-content">
                    <p className='text-sm text-justify'>Creve 🥳, is an inclusive online gig ecosystem designed to empower talents of all kinds to connect with clients and thrive.                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-white rounded-none border-b border-b-neutral-200 mt-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base font-medium">Is Creve free ?</div>
                    <div className="collapse-content">
                    <p className='text-sm text-justify'>
                        Creve is a free platform designed to empower creative professionals by connecting 
                        them with opportunities and resources to enhance their careers. It offers a user-friendly 
                        interface where artists, designers, cobblers, and other creatives can showcase their portfolios, 
                        skills, and get hired.
                    </p>
                </div>
            </div>


            <div className="collapse collapse-arrow bg-white rounded-none border-b border-b-neutral-200 mt-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base font-medium">What Makes creve unique ?</div>
                    <div className="collapse-content">
                    <p className='text-sm text-justify'>
                        Creve is a unique platform that combines the best of online and offline gig marketplaces. 
                        Our mission is to create a seamless and inclusive environment where talents can connect with clients, 
                        find creative opportunities, and build their careers. We believe in fostering a sense of community 
                        and collaboration among creative professionals.
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-white rounded-none border-b border-b-neutral-200 mt-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base font-medium">How can i hire a creative ?</div>
                    <div className="collapse-content">
                    <p className='text-sm text-justify'>
                        Browse the creative you are looking for, view his/her profile, send a request or chat, and wait for 
                        feedback or call creative and get your job done
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-white rounded-none border-b border-b-neutral-200 mt-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base font-medium">Can I drop review for creatives ?</div>
                    <div className="collapse-content">
                    <p className='text-sm text-justify'>
                        Yes you can drop a review for a creative, under their profile section u can leave a review for them..
                    </p>
                </div>
            </div>
        </div>

        <h2 className='text-center lg:text-4xl text-3xl font-bold text-black pt-20'>Quick guide</h2>
        <p className='text-center  lg:text-lg text-sm text-black py-5'>Follow these steps to get your service done </p>
        <ul className="steps steps-vertical lg:text-lg text-sm text-left">
            <li className="step step-accent text-left mb-5">Register or signin</li>
            <li className="step step-accent text-left mb-5">On your dashboard, search for the service you need, E.g Hair Dressing, Cobbling, Web Developer etc.</li>
            <li className="step step-accent text-left mb-5">Select a service provider(Creative) and send a request to the creative, or chat with him/her</li>
            <li className="step step-accent text-left mb-5">Wait for creative to accepts your request and reply, either by the chat or by call</li>
            <li className="step step-neutral text-left mb-5">Creative attends to your job, and your service is completed</li>
        </ul>
    </div>
  )
}

export default HelpCom
