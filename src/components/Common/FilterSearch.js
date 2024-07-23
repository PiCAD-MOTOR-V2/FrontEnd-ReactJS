import React, { useState } from 'react';
import './FilterSearch.css';
import { DateRangePicker } from 'rsuite';
// import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CSmartTable  } from "@coreui/react-pro";

const FilterSearch = () => {

  const usersData = [
    // Sample data
    {
      id: 1,
      user_Name: "Clinton",
      email_id: "clinton@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Honda",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Incomplete",
    },
    {
      id: 2,
      user_Name: "Oscar",
      email_id: "oscar@gmail.com",
      ev_nonev: "Non-EV",
      vehicle_name: "Apache",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    {
      id: 3,
      user_Name: "Aravind",
      email_id: "aravind@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Hero",
      motor_name: "Motor1",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Incomplete",
    },
    {
      id: 4,
      user_Name: "Inbaraj",
      email_id: "inbaraj@gmail.com",
      ev_nonev: "Non-EV",
      vehicle_name: "Loom",
      motor_name: "Motor2",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    {
      id: 5,
      user_Name: "SenthilKumar",
      email_id: "senthil@gmail.com",
      ev_nonev: "EV",
      vehicle_name: "Yamaha",
      motor_name: "Motor2",
      created_on: "19/06/2024 15:00:00",
      simulation_status: "Completed",
    },
    // Add more entries as needed...
  ];

  // const [details, setDetails] = useState([]);
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
    timeframe: null,
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

  const handleDateRangeChange = (range) => {
    setFilters({
      ...filters,
      timeframe: range,
    });
  };

  const columns = [
    { key: 'user_Name', label: 'User Name', _style: { width: '15%', color: '#0069bd' } },
    { key: 'email_id', label: 'Email', _style: { width: '20%', color: '#0069bd' } },
    { key: 'ev_nonev', label: 'EV/NON-EV', _style: { width: '10%', color: '#0069bd' } },
    { key: 'vehicle_name', label: 'Vehicle Name', _style: { width: '15%', color: '#0069bd' } },
    { key: 'motor_name', label: 'Motor Name', _style: { width: '15%', color: '#0069bd' } },
    { key: 'created_on', label: 'Created on', _style: { width: '10%', color: '#0069bd' }, filter: false, sorter: false },
    { key: 'simulation_status', label: 'Simulation Status', _style: { width: '20%', color: '#0069bd' } },
  ];

  const getBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge-completed";
      case "Incomplete":
        return "badge-incomplete";
      default:
        return ""; // default class or none
    }
  };

  const getEVClass = (evStatus) => {
    switch (evStatus) {
      case "EV":
        return "badge-ev";
      case "Non-EV":
        return "badge-nonev";
      default:
        return ""; // default class or none
    }
  };

  // const toggleDetails = (index) => {
  //   const position = details.indexOf(index);
  //   let newDetails = details.slice();
  //   if (position !== -1) {
  //     newDetails.splice(position, 1);
  //   } else {
  //     newDetails = [...details, index];
  //   }
  //   setDetails(newDetails);
  // };

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
    const selectedUsers = filteredData.filter(user => selectedItems.includes(user.id));

    const csvHeaders = [
      'User Name',
      'Email',
      'EV/NON-EV',
      'Vehicle Name',
      'Motor Name',
      'Created On',
      'Simulation Status',
    ];

    const csvContent = [
      csvHeaders.join(','),
      ...selectedUsers.map(user => [
        user.user_Name,
        user.email_id,
        user.ev_nonev,
        user.vehicle_name,
        user.motor_name,
        user.created_on,
        user.simulation_status,
      ].join(','))
    ].join('\n');

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
          "User Name",
          "Email",
          "EV/NON-EV",
          "Vehicle Name",
          "Motor Name",
          "Created On",
          "Simulation Status",
        ],
      ],
      body: filteredData.map((item) => [
        item.user_Name,
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
      timeframe: null,
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
        item.user_Name.toLowerCase().includes(filters.name.toLowerCase())
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
    if (filters.simulationStatus) {
      data = data.filter((item) => item.simulation_status === filters.simulationStatus);
    }
    if (filters.timeframe && filters.timeframe.length === 2) {
      const [startDate, endDate] = filters.timeframe;
      data = data.filter((item) => {
        const createdDate = new Date(item.created_on);
        return createdDate >= startDate && createdDate <= endDate;
      });
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
              <DateRangePicker onChange={handleDateRangeChange} value={filters.timeframe} />
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
              <select
                name="simulationStatus"
                value={filters.simulationStatus}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
          </div>

          <div className="buttons">
            <button className='clearbutton' onClick={clearFilters}>Clear Filter</button>
            <button onClick={applyFilters}>Apply Filter</button>
          </div>
        </div>
      </div>

      <div>
        <CSmartTable
          activePage={1}
          clickableRows
          columns={columns}
          items={filteredData}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          onFilteredItemsChange={(items) => {
            console.log(items);
          }}
          onSelectedItemsChange={(items) => {
            setSelectedItems(items);
            console.log(items);
          }}
          scopedColumns={{
            simulation_status: (item) => (
              <td>
                <div className={`badge ${getBadgeClass(item.simulation_status)}`}>
                  {item.simulation_status}
                </div>
              </td>
            ),
            ev_nonev: (item) => (
              <td>
                <div className={`badge ${getEVClass(item.ev_nonev)}`}>
                  {item.ev_nonev}
                </div>
              </td>
            ),
          }}
          selectable
          sorterValue={{ column: 'simulation_status', state: 'asc' }}
          tableProps={{
            className: 'add-this-class',
            responsive: true,
            striped: true,
            hover: true,
          }}
          tableBodyProps={{
            className: 'align-middle',
          }}
        />
      </div>
    </div>
  );
};

export default FilterSearch;
