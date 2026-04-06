import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Job from './Job';
import api from '@/lib/axios';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { motion } from 'framer-motion';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await api.get(`${JOB_API_ENDPOINT}/savedjobs`);
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSavedJobs();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-5 text-[#6A38C2]'>Saved Jobs ({savedJobs.length})</h1>
                {
                    loading ? (
                        <div className='flex items-center justify-center h-40'>
                            <span className='animate-pulse text-gray-500'>Loading your saved jobs...</span>
                        </div>
                    ) : (
                        savedJobs.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-40 text-gray-400'>
                                <p>You haven't saved any jobs yet.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    savedJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default SavedJobs;
