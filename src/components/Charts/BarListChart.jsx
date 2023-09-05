import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import { useState, useEffect } from "react";
const data = [
  { name: "Amount Paid", value: 4560, data: "$500" },
  { name: "Service Charge", value: 750, data: "$500" },
  { name: "Sitters Due", value: 200, data: "$500" },
];
const dataFormatter = (number) => {
  return "$" + Intl.NumberFormat("us").format(number).toString();
};
const BarListChart = ({ dashBoardStat }) => {
  const [earning, setEarning] = useState([]);
  let woofmeetsEarning = 0;
  useEffect(() => {
    const totalPayment = dashBoardStat?.appointmentTransactions?.reduce(
      (acc, o) => acc + parseInt(o.paidAmount),
      0
    );
    // woofmeetsEarning = dashBoardStat?.appointmentTransactions?.map(item => {
    //   if(item?.state === "PARTIAL_REFUND"){
    //     woofmeetsEarning += item?.paidAmount - ((item?.userRefundAmount ? item?.userRefundAmount : 0) + item?.providerAmount)
    //   }
    //   else if(item?.state === "FULL_REFUND"){
    //     woofmeetsEarning += item?.paidAmount - item?.billing?.subtotal;
    //   }
    //   else{
    //     woofmeetsEarning += item?.paidAmount - item?.providerAmount;
    //   }
    // })
    const serviceCharge = dashBoardStat?.appointmentTransactions?.reduce(
      (acc, o) => acc + parseInt(o?.billing?.serviceCharge),
      0
    );

    // if (dashBoardStat?.appointmentTransactions?.state === "PARTIAL_REFUND") {
    //   woofmeetsEarning = totalPayment - (userRefundAmount + providerAmount);
    // } else if (
    //   dashBoardStat?.appointmentTransactions?.state === "FULL_REFUND"
    // ) {
    //   woofmeetsEarning = totalPayment - billingSubTotal;
    // } else {
    //   woofmeetsEarning = totalPayment - providerAmount;
    // }
    setEarning([
      { name: "Total Payment", value: totalPayment },
      { name: "Woofmeets Earning", value: serviceCharge },
    ]);
  }, [dashBoardStat]);
  return (
    <Card maxWidth="max-w-lg">
      <Title>Last Month's Earning</Title>
      <BarList
        data={earning}
        marginTop="mt-2"
        color="red"
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default BarListChart;
