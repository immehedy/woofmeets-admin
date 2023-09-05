import { NavLink, useLocation } from "react-router-dom";
const Item = ({ item, setActive }) => {
  const location = useLocation();
  const pathName= location?.pathname;
  return (
    
      <div
      className={` ${
        pathName === item?.url
          ? 'border-l-4 border-2-white bg-[#FFA557]'
          : ''
      } cursor-pointer hover:border-l-4 hover:border-2-white hover:bg-[#FFA557] ${
        pathName === item?.url ? 'pl-3 lg:pl-7' : 'pl-4 lg:pl-8'
      } py-3  text-sm lg:text-base`}
      onClick={() => {
        setActive(false); 
        localStorage.removeItem('curr-page');
        localStorage.removeItem('search-data');
        localStorage.removeItem('filter-search-data');
        localStorage.removeItem('filter-activation');
        }}
    >
<NavLink to={item?.url}>
      <div
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4 lg:space-x-5">
          {item?.icon} <span className="flex-1">{item?.name}</span>
        </div>
      </div>
      </NavLink>
    </div>
    
  );
};

export default Item;
