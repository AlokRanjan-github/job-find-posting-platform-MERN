import { Badge } from '../ui/badge'
import React from 'react'

const LatestJobCards = ({job}) => {
  return (
    <div className='m-5/2 border border-gray-200 shadow-lg rounded-md p-6 bg-white transition hover:shadow-xl cursor-pointer' >
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'> {job?.position}</Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
            <Badge className='text-[#7209B7] font-bold' variant='ghost'>{job?.salary}</Badge>
        </div>

        </div>
    </div>
  )
}

export default LatestJobCards