import Items from './Items';
import Logo from './Logo';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';


const Sidebar = ({
  active,
  setActive,
  items
  
}) => {
  // const location = useLocation();
  // const pathname = location.pathname;
  const [minimize, setMinimize] = useState(false);
  return (
    <div
      className={`${
        active ? 'fixed !z-[9999] w-[200px]' : 'w-[0px]'
      }  h-100vh  flex flex-col  items-center py-8 transition-all duration-150 ${minimize ? 'lg:w-[70px]' : 'lg:w-[250px]'} lg:py-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600`}
    >
      {active && (
        <div
          onClick={() => setActive(false)}
          className="absolute top-2 right-3 block lg:hidden"
        >
          <AiOutlineClose className="cursor-pointer text-[20px] font-bold text-white" />
        </div>
      )}


      <Logo active={active} minimize={minimize} setMinimize={setMinimize} AiOutlineClose={AiOutlineClose} />
      <Items
        items={items}
        active={active}
        setActive={setActive}
      />
      
      

    </div>
    
  );
};

export default Sidebar;
