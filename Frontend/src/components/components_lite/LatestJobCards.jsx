import { Badge } from '../ui/badge'
import React from 'react'

const LatestJobCards = () => {
  return (
    <div className='m-5/2 border border-gray-200 shadow-xl rounded-md p-6 bg-white transition hover:shadow-lg cursor-pointer' >
        <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'> 12 Positions</Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>Part Time</Badge>
            <Badge className='text-[#7209B7] font-bold' variant='ghost'>12LPA</Badge>
        </div>

        </div>
    </div>
  )
}

export default LatestJobCards