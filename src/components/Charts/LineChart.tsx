import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', value: 4100 },
  { month: 'Feb', value: 4200 },
  { month: 'Mar', value: 4000 },
  { month: 'Apr', value: 4300 },
  { month: 'May', value: 3900 },
  { month: 'Jun', value: 4100 },
  { month: 'Jul', value: 4500 },
  { month: 'Aug', value: 3800 },
  { month: 'Sep', value: 4200 },
  { month: 'Oct', value: 4600 },
  { month: 'Nov', value: 4300 },
  { month: 'Dec', value: 4100 },
];

export const PropertyLineChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#696974' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#696974' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #F1F1F5',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00E2FF" 
            strokeWidth={3}
            dot={{ fill: '#00E2FF', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#00E2FF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};