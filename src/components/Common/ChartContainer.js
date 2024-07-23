import React from 'react';
import PieActiveArc from './PieChart';
import ApexCharts from './ApexChart';
import ProgressBarList from '../Common/LinearProgress';
import ApplicationTypeChart from '../Common/ApplicationTypeDonut';

const ChartContainer = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '39%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 2px 24px rgba(101, 101, 101, 0.1)', padding: '10px 20px' }}>
        <h4 style={{margin: '10px 0px'}}><span style={{color: '#009400', fontSize: '20px'}}>25</span> Total Users</h4>
        <PieActiveArc />
      </div>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '60%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 2px 24px rgba(101, 101, 101, 0.1)', padding: '10px 20px' }}>
        {/* Add other charts or content here */}
        {/* <LineChart /> */}
        <h4 style={{margin: '10px 0px'}}>Visitors Insight</h4>
        <ApexCharts />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '60%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 2px 24px rgba(101, 101, 101, 0.1)', padding: '10px 20px' }}>
        <h4 style={{margin: '10px 0px'}}>Users Role</h4>
        {/* <UsersRoleChart /> */}
        <ProgressBarList />
      </div>
      <div style={{ flex: '1', minWidth: '200px', maxWidth: '39%', backgroundColor: '#F0F7FD', border: '1px solid #ECEEF6', borderRadius: 6.27, boxShadow: '0 2px 24px rgba(101, 101, 101, 0.1)', padding: '10px 20px' }}>
        <h4 style={{margin: '10px 0px'}}>Application Type</h4>
        <ApplicationTypeChart />
        <h4 style={{textAlign: 'center', margin: '0px'}}><span style={{color: '#009400', fontSize: '20px'}}>100</span> Total Applications</h4>
      </div>
    </div>
    </>
);

export default ChartContainer;
