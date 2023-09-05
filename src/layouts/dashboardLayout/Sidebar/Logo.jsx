
import {FiMinimize2} from 'react-icons/fi'
import {FaExpand} from 'react-icons/fa'
const Logo = ({ active, minimize, setMinimize, AiOutlineClose }) => {
  return (
    <>
      {
      !minimize ?
      <div className="w-full text-center flex">
        <img src="/woofmeets-og.png" alt="woofmeets" className={` w-[150px] mx-auto`} />
        <FiMinimize2 onClick={() => {setMinimize(true)}} className="font-bold text-white text-[30px] mx-auto cursor-pointer"/>
      </div>
    :
      <div className='w-full ml-4'>
        <FaExpand onClick={() => {setMinimize(false)}} className="font-bold text-white text-[30px] cursor-pointer mx-auto"/>
      </div>
    }
    </>
    
  );
};

export default Logo;
