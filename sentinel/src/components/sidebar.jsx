import React from 'react';
import { SidebarButton } from "@/components/SidebarButton";
import { MdComment } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { FaWpforms } from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="h-full w-6 md:min-w-20 2xl:w-28 2xl:min-w-28 overflow-hidden fixed z-10 pt-5 bg-white top-14 hidden md:block">
            <div className="p-3">
                <h2 className="mb-4 text-sm text-center tracking-tight">Menu</h2>
                <div className="w-full text-center">
                    <div>
                        <SidebarButton icon={<GoHomeFill />} tooltipText="Home" href="/" />
                    </div>
                    
                </div>
              
                <h2 className="mb-4 text-sm text-center tracking-tight mt-5 ">Tugas</h2>
                <div className="w-full text-center">

                    <div className="mt-5">
                        <SidebarButton icon={<MdComment />} tooltipText="Tugas | comment"  href="/comment"/>
                    </div>
                    <div className="mt-5">
                        <SidebarButton icon={<CiTimer />} tooltipText="Tugas | Time"  href="/time"/>
                    </div>
                    <div className="mt-5">
                        <SidebarButton icon={<CiImageOn />} tooltipText="Tugas | Image"  href="/search"/>
                    </div>
                    <div className="mt-5">
                        <SidebarButton icon={<FaYoutube />} tooltipText="Tugas | Youtube"  href="/youtube"/>
                    </div>
                    <div className="mt-5">
                        <SidebarButton icon={<SiRedux/>} tooltipText="Tugas | Redux"  href="/redux"/>
                    </div>
                    <div className="mt-5">
                        <SidebarButton icon={<FaWpforms/>} tooltipText="Tugas | Form"  href="/form"/>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
