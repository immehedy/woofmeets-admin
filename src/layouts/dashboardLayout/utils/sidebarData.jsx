import { AiFillHome } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineSubscriptions, MdOutlineMobileFriendly } from "react-icons/md";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { RiCoupon2Fill, RiFileTransferFill } from "react-icons/ri";
import {HiBadgeCheck} from "react-icons/hi";

export const sidebarDatas = [
  {
    name: "Dashboard",
    url: "/",
    icon: <AiFillHome className="text-[20px]" />,
  },
  {
    name: "Pet Owners",
    url: "/users",
    icon: <BiUserCircle className="text-[20px]" />,
  },
  {
    name: "Sitters",
    url: "/sitters",
    icon: <FiUser className="text-[20px]" />,
  },
  // {
  //   name: "Subscriptions",
  //   url: "/subscriptions",
  //   icon: <MdOutlineSubscriptions className="text-[20px]" />,
  // },
  {
    name: "Appointments",
    url: "/appointments",
    icon: <BsJournalBookmarkFill className="text-[20px]" />,
  },
  {
    name: "Transactions",
    url: "/transactions",
    icon: <RiFileTransferFill className="text-[20px]" />,
  },
  {
    name: "Subscriptions Paid",
    url: "/user-subscription-lists",
    icon: <MdOutlineSubscriptions className="text-[20px]" />,
  },
  {
    name: "Coupon",
    url: "/user-coupon-lists",
    icon: <RiCoupon2Fill className="text-[20px]" />,
  },
  {
    name: "Badge",
    url: "/user-badge-lists",
    icon: <HiBadgeCheck className="text-[20px]" />,
  },
  {
    name: "Application Version",
    url: "/user-application-version",
    icon: <MdOutlineMobileFriendly className="text-[20px]" />,
  },
];
