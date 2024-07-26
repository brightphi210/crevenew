import React from 'react'
import noData from '../Images/nodata2.png'
const NoData = () => {
  return (
    <div>
        <div className='flex items-center w-fit justify-center m-auto h-[50vh] text-center'>
            <div className=''>
                <img src={noData} alt="" className='w-[12rem] flex m-auto opacity-70'/>
                <h2 className='text-2xl font-bold'>No data found</h2>
                <p className='text-sm'>Oops, No data here !!</p>
            </div>
        </div>
    </div>
  )
}

export default NoData
