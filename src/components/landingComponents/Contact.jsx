import React from 'react'
import CustomButton from '../common/CustomButton'
import { useState } from 'react'
const Contact = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log('Subscribed with email:', email);
    }

    return (
        <section id='contact' className='bg-purple-500 text-white h-90 space-y-8'>
            <div className=" px-80 py-20 ">
                <h2 className='text-4xl font-bold text-center mb-4' >Contact Us</h2>
                <p className='text-center text-xl '>Have questions or need assistance? Reach out to us anytime!</p>
                <div className='flex items-center gap-4 mt-10'>
                    <input type="email" className='px-10 py-2 border border-gray-600 rounded-2xl
                    w-full bg-white text-blue-900' placeholder="Your Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <CustomButton text="Subscribe" onClick={handleSubmit} />
                </div>
            </div>
        </section>
    )
}

export default Contact