import React, { useState } from 'react';
import { BASE_URL } from '../Auth/BaseUrl';
import { useNavigate } from 'react-router-dom';

const OTPCom = () => {
    const [user, setUser] = useState(() => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState("");


    const url = `${BASE_URL}/auth/activation/`


    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: otp, email: user.email }),
        });
        
        
        if (response.ok || response.statusCode === 201) {
            setMessage("Verification successful!");
            const data = await response.json();
            console.log(data);
            setIsLoading(false)
            navigate('/login')
        } else {
            setMessage("Verification failed. Please try again.");
            setIsLoading(false)
        }
    };





    // const handleResendOtp = async () => {
    //     const response = await fetch('/api/resend-otp', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ userId: user.id }),
    //     });

    //     const data = await response.json();

    //     if (data.success) {
    //         setMessage("OTP has been resent to your email.");
    //     } else {
    //         setMessage("Failed to resend OTP. Please try again.");
    //     }
    // };



    return (
        <div className="relative flex h-screen pt-[5rem] flex-col justify-center overflow-hidden bg-neutral-200 py-12">
            <div className="relative bg-white px-6 py-14 mx-auto lg:w-full w-11/12 max-w-lg rounded-xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p className='text-2xl'>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {user.email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-8">
                                <div className="flex flex-row items-center gap-2 justify-between mx-auto w-full max-w-xs">
                            
                                    <input
                                        className="input input-bordered w-full text-sm py-6 rounded-md"
                                        type="number"
                                        name="otp"
                                        maxLength="4"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder='Enter OTP Code...'
                                        required
                                    />
                                    
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-full outline-none py-3 bg-black border-none text-white text-sm shadow-sm">
                                            {isLoading === true ? <span class="loader"></span> : 'Verify Account'}
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive code?</p>
                                        <button type="button"  className="flex flex-row items-center text-blue-600">
                                            Resend
                                        </button>
                                    </div>
                                </div>

                                {message && <div className="text-center text-red-500">{message}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPCom;
