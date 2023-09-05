import Item from './Item';
import styles from '../DashboardLayout.module.css';
import {TbLogout} from 'react-icons/tb';
import {useAuth} from '../../../components/Authentication/auth'
import {useNavigate} from 'react-router-dom';
const Items = ({ items, setActive }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    auth.logout();
    navigate('/login');
  }
  return (
    <div
      className={`${styles.dashboard__items__wrapper} h-[100vh] w-full space-y-2 overflow-y-scroll pt-5 text-white`}
    >
      
      {items?.map((item, i) => (
        <Item
          key={i}
          item={item}
          setActive={setActive}
        />
      ))}
      <div
      className={`cursor-pointer pl-4 lg:pl-8 py-3  text-sm lg:text-base`}
      
    >
      <div
        className="flex items-center justify-between"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-4 lg:space-x-5">
          <TbLogout className='text-[20px]'/> <span className="flex-1">Logout</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Items;
