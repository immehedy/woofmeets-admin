import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { getPastDate } from "./lib/hooks/useGetHomePageData";
import { useState, useEffect } from "react";
import { format } from "date-fns";
  
const Subscription = ({dashBoardStat}) => {
  const [SubscriptionInfo, setSubscriptionInfo] = useState([]);
  useEffect(() => {
    setSubscriptionInfo([
      {
        date: format(new Date(getPastDate(30)), "MMM dd yy"),
        "NONE": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(30) && item?.subscriptionType === "NONE"
        ).length,
        "BASIC": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(30) && item?.subscriptionType === "BASIC"
        ).length,
        "GOLD": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(30) && item?.subscriptionType === "GOLD"
        ).length,
        "PLATINUM": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(30) && item?.subscriptionType === "PLATINUM"
        ).length,
      },
      {
        date: format(new Date(getPastDate(28)), "MMM dd yy"),
        "NONE": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(28) && item?.subscriptionType === "NONE"
        ).length,
        "BASIC": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(28) && item?.subscriptionType === "BASIC"
        ).length,
        "GOLD": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(28) && item?.subscriptionType === "GOLD"
        ).length,
        "PLATINUM": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(28) && item?.subscriptionType === "PLATINUM"
        ).length,
      },
      {
        date: format(new Date(getPastDate(21)), "MMM dd yy"),
        "NONE": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(21) &&
              item?.createdAt < getPastDate(22) && item?.subscriptionType === "NONE"
            );
          }
        ).length,
        "BASIC": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(21) &&
              item?.createdAt < getPastDate(22) && item?.subscriptionType === "BASIC"
            );
          }
        ).length,
        "GOLD": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(21) &&
              item?.createdAt < getPastDate(22) && item?.subscriptionType === "GOLD"
            );
          }
        ).length,
        "PLATINUM": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(21) &&
              item?.createdAt < getPastDate(22) && item?.subscriptionType === "PLATINUM"
            );
          }
        ).length,
      },
      {
        date: format(new Date(getPastDate(14)), "MMM dd yy"),
        "NONE": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(14) &&
              item?.createdAt < getPastDate(13) && item?.subscriptionType === "NONE"
            );
          }
        ).length,
        "BASIC": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(14) &&
              item?.createdAt < getPastDate(13) && item?.subscriptionType === "BASIC"
            );
          }
        ).length,
        "GOLD": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(14) &&
              item?.createdAt < getPastDate(13) && item?.subscriptionType === "GOLD"
            );
          }
        ).length,
        "PLATINUM": dashBoardStat?.provider?.filter(
          (item) => {
            return (
              item?.createdAt >= getPastDate(14) &&
              item?.createdAt < getPastDate(13) && item?.subscriptionType === "PLATINUM"
            );
          }
        ).length,
      },
      {
        date: format(new Date(getPastDate(7)), "MMM dd yy"),
        "NONE": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt >= getPastDate(7) && item?.subscriptionType === "NONE"
        ).length,
        "BASIC": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt >= getPastDate(7) && item?.subscriptionType === "BASIC"
        ).length,
        "GOLD": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt >= getPastDate(7) && item?.subscriptionType === "GOLD"
        ).length,
        "PLATINUM": dashBoardStat?.provider?.filter(
          (item) => item?.createdAt >= getPastDate(7) && item?.subscriptionType === "PLATINUM"
        ).length,
      },
    ]);
  }, [dashBoardStat]);
  return (
    <Card>
    <Title>Subscription Holder</Title>
    <BarChart
      data={SubscriptionInfo}
      dataKey="date"
      categories={[
        "NONE",
        "BASIC",
    "GOLD",
    "PLATINUM",
      ]}
      colors={["blue", "teal", "amber", "violet"]}
      marginTop="mt-6"
      yAxisWidth="w-12"
    />
  </Card>
  )
}

export default Subscription