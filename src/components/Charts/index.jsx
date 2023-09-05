
import CardDesign from "./CardDesign";
import UserComparison from "./UserComparison";
import Subscription from "./Subscription";
import PieChart from "./PieChart";
import BarListChart from "./BarListChart";
import {getPastDate, getHompageData, getDashboardDateRange, getSittersCountByCountry} from "./lib/hooks/useGetHomePageData";
import { useState, useEffect } from "react";
import { FaDog, FaUser } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GiSittingDog } from "react-icons/gi";

const Charts = () => {
  const [homepageData, setHomePageData] = useState();
  const [dashBoardStat, setDashBoardStat] = useState();
  const [sittersCountByCountry, setSittersCountByCuntry] = useState();
  
  useEffect(() => {
    getHompageData()
      .then((res) => {
        setHomePageData(res?.data);
      })
      .catch((err) => console.log(err));

      getDashboardDateRange(getPastDate(30), new Date().toISOString())
      .then((res) => {
        setDashBoardStat(res?.data);
      })
      .catch((err) => console.log(err));

      getSittersCountByCountry()
      .then((res) => {
        setSittersCountByCuntry(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 my-4 gap-5">
				<div className="col-span-2">
					<UserComparison dashBoardStat={dashBoardStat} />
				</div>
				<div className="col-span-1 grid gap-3">
        <CardDesign
          bg="indigo"
          title="Pet Owners"
          icon={<GiSittingDog />}
          value={homepageData?.userCount}
        />
					<CardDesign
          bg="amber"
          title="Sitters"
          icon={<FaUser />}
          value={homepageData?.providerCount}
        />
				</div>
        <div  className="col-span-2">
        <Subscription dashBoardStat={dashBoardStat}/>
        </div>
        <div>
        <PieChart sittersCountByCountry={sittersCountByCountry}/>
        <BarListChart dashBoardStat={dashBoardStat}/>
        </div>
        
			</div>
    </>
  );
};

export default Charts;
