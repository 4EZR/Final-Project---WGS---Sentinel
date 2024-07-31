// src/pages/Home.jsx
import React from 'react';
import Card from '@/components/homeCard';
import img1 from '@/assets/home/gambar1.png';
import img2 from '@/assets/home/gambar2.png';
import img3 from '@/assets/home/gambar3.png';
import Verse from '@/components/bibleVerse';
const Home = () => (
    <div className='min-h-[76.9vh] 2xl:min-h-[81vh]'>

        <div class='rounded-2xl bg-[#B8CDF8] p-8 mb-10 shadow-lg'>
            <Verse />
        </div>
        <div className='bg-[#FBFBFB] shadow-lg px-10 py-16 rounded-2xl'>

            <p className='text-2xl mb-12'>Biro Kerohanian Service</p>

            <div className=' grid md:grid-cols-3  gap-5'>

                <Card
                    img={img1}
                    title='Daily Inspiration'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

                />
                <Card
                    img={img2}
                    title='Song of Verse'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                />
                <Card
                    img={img3}
                    title='Renungan'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                />
            </div>



        </div>
    </div>
);

export default Home;
