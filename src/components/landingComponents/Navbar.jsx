import React from 'react'
import CustomButton from '../common/CustomButton'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'



const Navbar = () => {
    return (
        <header className='flex justify-between items-center px-20 py-4 sticky top-0 z-100 bg-sky-300'>

            {/*left navbar*/}
            <div className='flex items-center gap-4 text-3xl font-bold'>


                <img src="/logo.png" alt="WanderWise Logo" className='w-12 h-12 rounded-full' />
                <Typewriter
                    options={{
                        strings: ['WanderWise', 'WanderWise', 'WanderWise'],
                        autoStart: true,
                        loop: true,
                    }}
                />





                {  /*<h2>WanderWise</h2>*/}
            </div>





            {/*right navbar*/}
            <div className='flex items-center gap-10'>


                <nav className='flex items-center gap-6
            [&>a]:text-lg
            [&>a]:hover:text-purple-600
            [&>a]:font-medium
            
           '>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#famous">Famous</a>
                    <a href="#contact">Contact</a>

                </nav>

                <div className="auth-buttons">
                    <Link to="/login1"> <CustomButton texty="SignIn" />
                    
                    
                    </Link>


                </div>


            </div>
        </header>
    )
}

export default Navbar