import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ChartData {
  totalAmount: string;
  type: string;
}

function transformData(data: ChartData[]) {
  const transformedData = [['Type', 'Total Expenses Amount']];

  data.forEach((item: ChartData) => {
    transformedData.push([item.type, item.totalAmount]);
  });

  return transformedData;
}

const PieChart = () => {
  const { statistics } = useSelector((state: RootState) => state?.expenses);

  const data = transformData(statistics);

  console.log(statistics);

  const options = {
    title: 'Past Expenses',
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={'100%'}
      height={'60vh'}
    />
  );
};

export default PieChart;
