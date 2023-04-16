import {
  LineChart,
  Line as ReLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "~/store";

// const data = [
//   {
//     date: 'Date 1',
//     max: 4000,
//     min: 2400,
//     avg: 2400,
//   },
//   {
//     date: 'Date 2',
//     max: 3000,
//     min: 1398,
//     avg: 2210,
//   },
//   {
//     date: 'Date 3',
//     max: 2000,
//     min: 9800,
//     avg: 2290,
//   },
//   {
//     date: 'Date 4',
//     max: 2780,
//     min: 3908,
//     avg: 2000,
//   },
//   {
//     date: 'Date 5',
//     max: 1890,
//     min: 4800,
//     avg: 2181,
//   },
// ];

export default function Line() {
  const { singleSearchPriceList: data } = useStore();

  if (data === undefined || data.length === 0) {
    return (
      <div className="flex items-center justify-center pt-5">
        You just created the first price entry for this card. Search the card
        again to view the results.
      </div>
    );
  }
  console.log("data", data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={200}
        height={300}
        // data={data}
        // let data be type any before passing it to LineChart
        data={data}
        margin={{
          top: 5,
          right: 12,
          left: -5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
        <Legend />
        <ReLine type="monotone" dataKey="max" stroke="#FF0000" />

        <ReLine
          type="monotone"
          dataKey="avg"
          stroke="#FDE01A"
          activeDot={{ r: 8 }}
        />

        <ReLine type="monotone" dataKey="min" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
