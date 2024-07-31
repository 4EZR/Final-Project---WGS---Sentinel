// src/layouts/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/header";

import bg from '@/assets/bg.svg'
import Sidebar from '@/components/sidebar';

const MainLayout = ({ children }) => (
  <div className='overflow-x-hidden bg-white'>
    <Header />
    {/* <Sidebar /> */}
    <div className="bg-gray-100 shadow-inner p-10 mt-20 bg-cover bg-center"
         style={{ backgroundImage: `url(${bg})` }}>
      {children}
    </div>
    <footer className='w-full p-3'>
      <p className='text-center text-sm'>2024 © 4EZR</p>
    </footer>
  </div>
);

export default MainLayout;
