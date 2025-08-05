import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sale', value: 22870, color: '#00E2FF' },
  { name: 'Rent', value: 8000, color: '#22C55E' },
];

export const PropertyDonutChart = () => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <div className="relative h-48 w-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="font-heading font-bold text-2xl text-foreground">
            {total.toLocaleString()}
          </p>
          <p className="font-body text-sm text-muted-foreground">Total</p>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <div>
              <p className="font-body text-xs text-muted-foreground">Total {entry.name}</p>
              <p className="font-heading font-semibold text-sm text-foreground">
                {entry.value === 22870 ? '1.1k' : '2.3k'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};