import React, { useState } from 'react';
import './FilterSearch.css';
import { DateRangePicker } from 'rsuite';
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CBadge } from '@coreui/react-pro'; // Import CBadge if needed
import CustomTable from './CustomTable.js';


const FilterSearch = () => {

  const usersData = [
    {
      id: 1,
      user_info: "Clinton",
      email_id:"clinton@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Honda",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    {
      id: 2,
      user_info: "Oscar",
      email_id:"oscar@gmail.com",
      ev_nonev: "Non-EV",
      vehicle_name: "Apache",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    {
      id: 3,
      user_info: "Aravind",
      email_id:"aravind@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Hero",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Incomplete",
    },
    {
      id: 4,
      user_info: "Inbaraj",
      email_id:"inbaraj@gmail.com",
      ev_nonev: "Non-EV",
      vehicle_name: "Loom",
      motor_name: "Motor2",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    {
      id: 5,
      user_info: "SenthilKumar",
      email_id:"senthil@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Yamaha",
      motor_name: "Motor2",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    // Remaining data entries...
  ];
  


  const [details, setDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email_id: "",
    vehicleApp: "",
    motorName: "",
    ev: {
      EV: false,
      NonEV: false,
    },
    simulationStatus: "",
    timeframe: "",
  });
  const [filteredData, setFilteredData] = useState(usersData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      ev: {
        ...prevFilters.ev,
        [name]: checked,
      },
    }));
  };

  const columns = [
    { key: 'user_info', label: 'User Info', _style: { width: '15%', color: '#0069bd' } },
    { key: 'email_id', label: 'Email', _style: { width: '20%', color: '#0069bd' } },
    { key: 'ev_nonev', label: 'EV/NON-EV', _style: { width: '15%', color: '#0069bd' } },
    { key: 'vehicle_name', label: 'Vehicle Name', _style: { width: '20%', color: '#0069bd' } },
    { key: 'motor_name', label: 'Motor Name', _style: { width: '15%', color: '#0069bd' } },
    { key: 'created_on', label: 'Created on', _style: { width: '15%', color: '#0069bd' }, filter: false, sorter: false },
    { key: 'simulation_status', label: 'Simulation Status', _style: { width: '15%', color: '#0069bd' } },
  ];
  
    const getBadge = (status) => {
      switch (status) {
        case "Completed":
          return "success";
        case "Incomplete":
          return "warning";
        default:
          return "primary";
      }
    };
  
    const toggleDetails = (index) => {
      const position = details.indexOf(index);
      let newDetails = details.slice();
      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...details, index];
      }
      setDetails(newDetails);
    };
  
    const handleExport = (type) => {
      switch (type) {
        case "CSV":
          exportCSV();
          break;
        case "PDF":
          exportPDF();
          break;
        default:
          break;
      }
    };
  
    const exportCSV = () => {
      // Extract selected users from filteredData based on selectedItems (assuming you have a way to track selected items)
      const selectedUsers = filteredData.filter(user => selectedItems.includes(user.id));
    
      // Define CSV headers and map data accordingly
      const csvHeaders = [
        'User Info',
        'Email',
        'EV/NON-EV',
        'Vehicle Name',
        'Motor Name',
        'Created On',
        'Simulation Status',
      ];
    
      // Map selectedUsers data to match csvHeaders
      const csvContent = [
        csvHeaders.join(','), // Join headers with comma
        ...selectedUsers.map(user => [
          user.user_info,
          user.email_id,
          user.ev_nonev,
          user.vehicle_name,
          user.motor_name,
          user.created_on,
          user.simulation_status,
        ].join(','))
      ].join('\n'); // Join each row with newline
    
      // Create Blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'selected_users.csv';
      a.click();
    };
    
  
    const exportPDF = () => {
      const doc = new jsPDF();
      doc.autoTable({
        head: [
          [
            "User Info",
            "Email",
            "EV/NON-EV",
            "Vehicle Name",
            "Motor Name",
            "Created On",
            "Simulation Status",
          ],
        ],
        body: filteredData.map((item) => [
          item.user_info,
          item.email_id,
          item.ev_nonev,
          item.vehicle_name,
          item.motor_name,
          item.created_on,
          item.simulation_status,
        ]),
      });
      doc.save("filtered_data.pdf");
    };
  
    const clearFilters = () => {
      setFilters({
        name: '',
        email_id: '',
        timeframe: '',
        vehicleApp: '',
        motorName: '',
        simulationStatus: '',
        ev: {
          EV: false,
          NonEV: false,
        },
      });
      setFilteredData(usersData);
    };
  
    const applyFilters = () => {
      let data = usersData;
  
      if (filters.name) {
        data = data.filter((item) =>
          item.user_info.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.email_id) {
        data = data.filter((item) =>
          item.email_id && item.email_id.toLowerCase().includes(filters.email_id.toLowerCase())
        );
      }
      if (filters.vehicleApp) {
        data = data.filter((item) =>
          item.vehicle_name.toLowerCase().includes(filters.vehicleApp.toLowerCase())
        );
      }
      if (filters.motorName) {
        data = data.filter((item) =>
          item.motor_name.toLowerCase().includes(filters.motorName.toLowerCase())
        );
      }
      if (filters.ev.EV || filters.ev.NonEV) {
        const evNonevFilter = [];
        if (filters.ev.EV) evNonevFilter.push("EV");
        if (filters.ev.NonEV) evNonevFilter.push("Non-EV");
        data = data.filter((item) => evNonevFilter.includes(item.ev_nonev));
      }
      if (filters.simulation_Status) {
        data = data.filter((item) => item.simulation_status === filters.simulationStatus);
      }
      if (filters.timeframe) {
        data = data.filter((item) => item.created_on.includes(filters.timeframe));
      }
  
      setFilteredData(data);
    };
  

  return (
    <div className='mainclassfilter'>
      <div className="actions">
        <button className="dropdown-button">Export as</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => handleExport('CSV')}>CSV</a>
          <a href="#" onClick={() => handleExport('PDF')}>PDF</a>
        </div>
      </div>
      <div className="filter-search">
        <h5 className='heading'>FilterSearch</h5>
        <div className="filter-form">
          <div className="report-section">
            <div className="report-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={filters.name} onChange={handleChange} />
            </div>
            
            <div className="report-group">
              <label htmlFor="email_id">Email</label>
              <input type="email" name="email_id" id="email_id" value={filters.email_id} onChange={handleChange} />
            </div>
            <div className="report-group">
              <label htmlFor="timeframe">Timeframe</label>
              {/* <input type="date" name="timeframe" id="timeframe" value={filters.timeframe} onChange={handleChange} /> */}
              <DateRangePicker />
            </div>
            <div className="checkbox-group">
  <label>EV / Non-EV</label>
  <div className="checkspace">
    <span>
      <input
        type="checkbox"
        id="ev"
        name="EV"
        checked={filters.ev.EV}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="ev">EV</label>
    </span>
    <span>
      <input
        type="checkbox"
        id="non-ev"
        name="NonEV"
        checked={filters.ev.NonEV}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="non-ev">Non-EV</label>
    </span>
  </div>
</div>
            
          </div>

          <div className="report-section">
            
            <div className="report-group">
              <label htmlFor="vehicleApp">Vehicle / App Name</label>
              <input type="text" name="vehicleApp" id="vehicleApp" value={filters.vehicleApp} onChange={handleChange} />
            </div>
            <div className="report-group">
              <label htmlFor="motorName">Motor Name</label>
              <input type="text" name="motorName" id="motorName" value={filters.motorName} onChange={handleChange} />
            </div>
            <div className="report-group">
              <label htmlFor="simulationStatus">Simulation Status</label>
              <select name="simulationStatus" id="simulationStatus" value={filters.simulationStatus} onChange={handleChange}>
                <option value="">Select</option>
                <option value="completed">Completed</option>
                <option value="in-progress">InCompleted</option>
              </select>
            </div>
          </div>

          <div className="buttons">
            <button onClick={clearFilters}>Clear Filter</button>
            <button onClick={applyFilters}>Apply Filter</button>
          </div>
        </div>
      </div>

      
      <CustomTable usersData={filteredData} columns={columns} getBadge={getBadge} />
      
      
    </div>
  );
};

export default FilterSearch;
