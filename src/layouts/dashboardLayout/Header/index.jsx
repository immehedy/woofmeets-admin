import { useState } from 'react';
import UserInfo from './UserInfo';
import { IoIosWarning } from 'react-icons/io';
import Search from './Search';
import { AiOutlineWarning } from 'react-icons/ai';



const Header = ({ active, setActive }) => {

  return (
    <div
      className={`sticky top-0 z-50 w-full bg-white py-3  shadow `}
    >
      <div className="relative mx-auto flex w-full items-center justify-between  lg:grid lg:grid-cols-12 lg:gap-8">
        <div className=" lg:col-span-7">
          <Search active={active} setActive={setActive} />
        </div>
        <div className=" px-2 lg:col-span-5 lg:px-10">
          <UserInfo />
        </div>

      </div>
    </div>
  );
};

export default Header;
