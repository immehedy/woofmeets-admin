import { Card, Title, AreaChart } from "@tremor/react";
import { getPastDate } from "./lib/hooks/useGetHomePageData";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const OwnerComparison = ({ dashBoardStat }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    setUserInfo([
      {
        date: format(new Date(getPastDate(30)), "MMM dd yy"),
        owner: dashBoardStat?.user?.filter(
          (item) => item?.createdAt <= getPastDate(30)
        ).length,
        sitter: dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(30)
        ).length,
      },
      {
        date: format(new Date(getPastDate(28)), "MMM dd yy"),
        owner: dashBoardStat?.user?.filter(
          (item) => item?.createdAt <= getPastDate(28)
        ).length,
        sitter: dashBoardStat?.provider?.filter(
          (item) => item?.createdAt <= getPastDate(28)
        ).length,
      },
      {
        date: format(new Date(getPastDate(21)), "MMM dd yy"),
        owner: dashBoardStat?.user?.filter((item) => {
          return (
            item?.createdAt >= getPastDate(21) &&
            item?.createdAt < getPastDate(22)
          );
        }).length,
        sitter: dashBoardStat?.provider?.filter((item) => {
          return (
            item?.createdAt >= getPastDate(21) &&
            item?.createdAt < getPastDate(22)
          );
        }).length,
      },
      {
        date: format(new Date(getPastDate(14)), "MMM dd yy"),
        owner: dashBoardStat?.user?.filter((item) => {
          return (
            item?.createdAt >= getPastDate(14) &&
            item?.createdAt < getPastDate(13)
          );
        }).length,
        sitter: dashBoardStat?.provider?.filter((item) => {
          return (
            item?.createdAt >= getPastDate(14) &&
            item?.createdAt < getPastDate(13)
          );
        }).length,
      },
      {
        date: format(new Date(getPastDate(7)), "MMM dd yy"),
        owner: dashBoardStat?.user?.filter((item) => {
          return item?.createdAt >= getPastDate(7);
        }).length,
        sitter: dashBoardStat?.provider?.filter((item) => {
          return item?.createdAt >= getPastDate(7);
        }).length,
      },
    ]);
  }, [dashBoardStat]);

  return (
    <Card>
      <Title>Owner/Sitter onBoard</Title>
      <AreaChart
        data={userInfo}
        categories={["owner", "sitter"]}
        dataKey="date"
        height="h-72"
        colors={["indigo", "amber"]}
        marginTop="mt-4"
      />
    </Card>
  );
};
export default OwnerComparison;
