import React from 'react'
import { specialityData, vendorData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Vendor_menu = () => {
    return (
         <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
          
             <h1 className='text-4xl font-medium'>Become a Partner</h1>
             <p className='sm:w-1/1 text-center text-me'>“Zero Risk. Zero Investment. Unlimited Earning Potential.-Step into a business partnership without spending a single rupee. With our program, you don’t need capital or prior experience—just your time and dedication, Start today.”</p>
              
             <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                 {vendorData.map((item, index) => (
                     <Link to={`/vendor/${item.benefit}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
                         <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
                         <p>{item.benefit}</p>
                     </Link>
                     
                     
                 ))}
                 
             </div>
             
             
         </div>
     )
 }