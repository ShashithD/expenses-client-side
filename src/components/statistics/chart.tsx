import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

  const data = transformData(statistics);

  // Define color schemes for light and dark themes
  const colorScheme = {
    dark: {
      backgroundColor: '#333',
      textColor: '#fff',
      slices: [
        { color: '#2D9CDB' }, // Blue
        { color: '#27AE60' }, // Green
        { color: '#9B51E0' }, // Purple
        { color: '#F2994A' }, // Orange
        { color: '#EB5757' }, // Red
        { color: '#F2C94C' }, // Yellow
        { color: '#56CCF2' }, // Light Blue
      ],
    },
    light: {
      backgroundColor: '#E4E4E4',
      textColor: '#333',
      slices: [
        { color: '#2F80ED' }, // Blue
        { color: '#219653' }, // Green
        { color: '#BB6BD9' }, // Purple
        { color: '#F2C94C' }, // Yellow
        { color: '#EB5757' }, // Red
        { color: '#9B51E0' }, // Dark Purple
        { color: '#27AE60' }, // Dark Green
      ],
    },
  };

  const { backgroundColor, textColor, slices } =
    theme === 'dark' ? colorScheme.dark : colorScheme.light;

  const options = {
    title: 'Expenses Analytics',
    titleTextStyle: { color: textColor },
    backgroundColor,
    slices,
    legend: { textStyle: { color: textColor } },
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
