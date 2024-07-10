import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { type: 'Student', percentage: 46 },
  { type: 'Professional', percentage: 17 },
  { type: 'Faculty', percentage: 19 },
  { type: 'Trainer', percentage: 17 },
  { type: 'Technician', percentage: 17 },
  { type: 'Manufacturer', percentage: 19 },
  { type: 'Others', percentage: 17 },
];

const UsersRoleChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="type" type="category" />
      <Tooltip />
      <Bar dataKey="percentage" fill="#28a745" />
    </BarChart>
  </ResponsiveContainer>
);

export default UsersRoleChart;
