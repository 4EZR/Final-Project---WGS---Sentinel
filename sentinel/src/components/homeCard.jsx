import React from 'react';
const Card = ({ img, title, details }) => {
    return (
        <div className='bg-white shadow-md rounded-3xl p-8 cursor-pointer group'>
            <div className='overflow-hidden rounded-3xl'>
                <img src={img} alt="" className='transform transition-transform duration-300 group-hover:scale-110' />
            </div>
            <p className='text-lg font-medium mt-4'>{title}</p>
            <p className='text-slate-400 text-sm mb-10 font-light'>{details}</p>
        </div>
    );
};

export default Card;
