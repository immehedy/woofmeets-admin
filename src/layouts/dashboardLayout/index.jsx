
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { sidebarDatas } from './utils/sidebarData';


const DashboardLayout = ({
  children,
  client,
  status,
  setStatus,
}) => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex h-screen w-full">
      <Sidebar
        active={active}
        setActive={setActive}
        items={sidebarDatas}
      />
      <div className="h-screen w-full flex-1 overflow-y-scroll">
        <Header
          active={active}
          setActive={setActive}
        />
        <div className="px-10 py-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
