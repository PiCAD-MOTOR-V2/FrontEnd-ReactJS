import React from 'react';
import PieActiveArc from './PieChart';
import ApexCharts from './ApexChart';
import ProgressBarList from '../Common/LinearProgress';
import ApplicationTypeChart from '../Common/ApplicationTypeDonut';

const ChartContainer = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '39%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 8.36px 25.09px rgba(69, 69, 80, 0.1)', padding: '10px' }}>
        <PieActiveArc />
        {/* <h4>Total Users: 25</h4> */}
      </div>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '59%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 8.36px 25.09px rgba(69, 69, 80, 0.1)', padding: '10px' }}>
        {/* Add other charts or content here */}
        {/* <LineChart /> */}
        <ApexCharts />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '59%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 8.36px 25.09px rgba(69, 69, 80, 0.1)', padding: '10px' }}>
        <h4>Users Role</h4>
        {/* <UsersRoleChart /> */}
        <ProgressBarList />
      </div>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '39%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 8.36px 25.09px rgba(69, 69, 80, 0.1)', padding: '10px' }}>
        <h2>Application Type</h2>
        <ApplicationTypeChart />
      </div>
    </div>
    </>
);

export default ChartContainer;
