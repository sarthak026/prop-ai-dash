import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', online: 45, offline: 35 },
  { month: 'Feb', online: 52, offline: 42 },
  { month: 'Mar', online: 61, offline: 38 },
  { month: 'Apr', online: 38, offline: 28 },
  { month: 'May', online: 42, offline: 35 },
  { month: 'Jun', online: 55, offline: 45 },
  { month: 'Jul', online: 48, offline: 38 },
  { month: 'Aug', online: 58, offline: 48 },
  { month: 'Sep', online: 35, offline: 25 },
  { month: 'Oct', online: 65, offline: 55 },
  { month: 'Nov', online: 52, offline: 42 },
  { month: 'Dec', online: 45, offline: 35 },
];

export const RevenueBarChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
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
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px',
              fontSize: '12px'
            }}
          />
          <Bar 
            dataKey="online" 
            fill="#00E2FF" 
            radius={[4, 4, 0, 0]}
            name="Online Sales"
          />
          <Bar 
            dataKey="offline" 
            fill="#22C55E" 
            radius={[4, 4, 0, 0]}
            name="Offline Sales"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};