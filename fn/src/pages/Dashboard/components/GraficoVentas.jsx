import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MoreVertical } from 'lucide-react';

export default function GraficoVentas({ datos }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-h2 font-semibold tracking-tight text-primary-container">Ventas últimos 7 días</h3>
        <button className="text-on-surface-variant hover:text-secondary transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={datos} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4e4541', fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #d1c4be', boxShadow: '0 4px 12px rgba(22,15,12,0.02)' }}
            />
            <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={60}>
              {datos.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isToday ? '#c9873a' : '#E5D5C1'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end mt-2">
        <span className="text-[10px] font-bold text-accent uppercase mr-4">Hoy</span>
      </div>
    </div>
  );
}
