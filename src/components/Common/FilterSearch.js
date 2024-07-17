import React, { useState } from 'react';
import './FilterSearch.css';
import { DateRangePicker } from 'rsuite';

const FilterSearch = () => {
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    timeframe: '',
    vehicleAppName: '',
    motorName: '',
    simulationStatus: '',
    ev: {
      EV: false,
      NonEV: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      ev: {
        ...filters.ev,
        [name]: checked,
      },
    });
  };

  const handleExport = (type) => {
    if (type === 'csv') {
      // Handle CSV export
    } else if (type === 'pdf') {
      // Handle PDF export
    }
  };

  return (
    <div className='mainclassfilter'>
      <div className="actions">
        <button className="dropdown-button">Export as</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => handleExport('csv')}>CSV</a>
          <a href="#" onClick={() => handleExport('pdf')}>PDF</a>
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
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={filters.email} onChange={handleChange} />
            </div>
            <div className="report-group">
              <label htmlFor="timeframe">Timeframe</label>
              {/* <input type="date" name="timeframe" id="timeframe" value={filters.timeframe} onChange={handleChange} /> */}
              <DateRangePicker />
            </div>
            <div className="checkbox-group">
              <label>EV / Non-EV</label>
              <div className='checkspace'>
                <span>
                <input type="checkbox" id="ev" name="EV" checked={filters.ev.EV} onChange={handleCheckboxChange} />
                <label htmlFor="ev">EV</label>
                </span>
                <span>
                <input type="checkbox" id="non-ev" name="NonEV" checked={filters.ev.NonEV} onChange={handleCheckboxChange} />
                <label htmlFor="non-ev">Non-EV</label>
                </span>
                
              </div>
            </div>
            
          </div>

          <div className="report-section">
            
            <div className="report-group">
              <label htmlFor="vehicleAppName">Vehicle / App Name</label>
              <input type="text" name="vehicleAppName" id="vehicleAppName" value={filters.vehicleAppName} onChange={handleChange} />
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
            <button onClick={() => setFilters({
              name: '',
              email: '',
              timeframe: '',
              vehicleAppName: '',
              motorName: '',
              simulationStatus: '',
              ev: {
                EV: false,
                NonEV: false,
              },
            })}>Clear Filter</button>
            <button>Apply Filter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
