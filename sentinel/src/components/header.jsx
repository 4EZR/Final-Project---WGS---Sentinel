import React from 'react';
import { Button } from '@/components/ui/button';
import { ComboboxDemo } from '@/components/ui/combobox';
import logo from '@/assets/penabur-icon.svg'; // Importing the image

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 px-5 bg-white text-gray-800   fixed top-0 w-full backdrop-blur-lg z-20">
            <div className='flex items-center gap-3'>
                <img src={logo} alt="Logo" className="h-8" /> {/* Using the imported image */}
                <p className="text-base font-medium capitalize leading-4 pl-3 border-gray-800 border-l-[2px]">
                    Biro <br />
                    <span className='font-bold uppercase'>Kerohanian</span>
                </p>
            </div>
            <div className='flex gap-5'>
             
                <Button>Back To SAS</Button>
            </div>
        </header>
    );
};

export default Header;
