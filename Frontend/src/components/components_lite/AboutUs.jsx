import React from 'react';
import {
  BriefcaseIcon,
  UsersIcon,
  BoltIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-16 lg:px-24 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-blue-700">Job Hive</span>
          </h1>
          <p className="font-semibold text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Building connections. Empowering careers. Redefining the job search experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission Box */}
          <div className="md:col-span-2 bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition  border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <GlobeAltIcon className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-semibold text-blue-800">Our Mission</h2>
            </div>
            <hr />
            <p className="mt-1 font-semibold text-gray-700 leading-relaxed text-[17px]">
              At Job Hive, our mission is to simplify the hiring journey by bringing job seekers and
              employers together through intelligent, transparent, and accessible solutions.
              We empower talent and accelerate opportunity for all by fostering meaningful careers.
            </p>
          </div>

          {/* Illustration Box */}
          <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg flex justify-center items-center border border-gray-300">
            <img
              src="https://illustrations.popsy.co/amber/shaking-hands.svg"
              alt="Shaking Hands Illustration"
              className="w-full max-w-xs"
            />
          </div>

          {/* Vision Box */}
          <div className="bg-violet-50 rounded-2xl p-6 shadow-md hover:shadow-lg border border-gray-300">
            <div className="flex items-center gap-3 mb-3">
              <BoltIcon className="w-6 h-6 text-violet-600" />
              <h2 className="text-xl font-semibold text-violet-800">Our Vision</h2>
            </div>
            <hr />
            <p className="mt-1 font-semibold text-gray-700 text-[16px] leading-relaxed">
              To become a global leader in job innovation where every individual finds purpose-driven
              work and every organization discovers exceptional talent.
            </p>
          </div>

          {/* Values Box */}
          <div className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg border border-gray-300">
            <div className="flex items-center gap-3 mb-3">
              <UsersIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-800">Core Values</h2> 
            </div><hr />
            <ul className="mt-1 font-semibold list-disc list-inside text-gray-700 space-y-1 text-[16px]">
              <li>Integrity & Transparency</li>
              <li>Innovation & Agility</li>
              <li>Diversity & Inclusion</li>
              <li>User-Centric Approach</li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg flex flex-col justify-between border border-gray-300">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BriefcaseIcon className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold">Join the Hive</h2> 
              </div>
              <hr />
              <p className="mt-1 font-semibold text-sm md:text-base leading-relaxed mb-5">
                Whether you're a recruiter, a growing company, or a job seeker—Job Hive is your
                launchpad. Let’s build your future together.
              </p>
            </div>
            <button 
            onClick={()=>navigate("/")}
            className="self-start bg-white text-blue-700 font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
