import React from 'react'

const Howto = () => {
  return (
    <div className='2xl:pt-40 pt-20 lg:pb-10 pb-10  2xl:px-[20rem] xl:px-[10rem] lg:px-[5rem] px-0 h-full'>

        <div className='lg:pb-20 text-center'>
            <h2 className=' 2xl:text-5xl xl:text-4xl  lg:text-4xl text-3xl font-bold text-black py-5 pb-3'>How to use Creve</h2>
            <p className='text-sm px-5'>Below are tutorial guided on how to use creve</p>
        </div>


        <div className='h-full grid lg:grid-cols-1 gap-10 lg:pt-10 pt-10'>

            <div>
                <h2 className='lg:text-3xl text-lg pb-5 text-center px-5 pt-5'>How to hire a Talnet on creve</h2>
                <iframe className='w-full  2xl:h-[40rem] xl:h-[40rem] lg:h-[40rem] md:h-[30rem] h-[15rem] lg:rounded-xl col-span-1'
                    src="https://www.youtube.com/embed/h2QT6_zHnDk?si=rQmXVZk5yRguffa3">
                </iframe>
            </div>
        </div>
      
    </div>
  )
}

export default Howto
