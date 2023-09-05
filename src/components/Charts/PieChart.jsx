import { Card, Title, DonutChart } from '@tremor/react';
import {useState, useEffect} from "react";

const PieChart = ({sittersCountByCountry}) => {
    const [countryWiseSitters, setCountryWiseSitters] = useState([]);
    useEffect(() => {
        setCountryWiseSitters([
            {
                name: 'USA',
                sitters: sittersCountByCountry?.providerUSACount,
            },
            {
                name: 'CANADA',
                sitters: sittersCountByCountry?.providerCACount,
            }
        ])

    },[sittersCountByCountry])
  return (
    <Card maxWidth="max-w-lg">
        <Title>Approved Sitters</Title>
        <DonutChart
            data={ countryWiseSitters }
            category="sitters"
            dataKey="name"
            marginTop="mt-6"
            colors={[ "rose", "cyan"]}
        />
    </Card>
  )
}

export default PieChart