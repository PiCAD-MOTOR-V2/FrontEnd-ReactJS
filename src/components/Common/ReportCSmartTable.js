import React, { useState } from "react";
import "./Report.css"
import {
  CSmartTable,
  CBadge,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CRow,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CFormCheck,
  CInputGroup,
} from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import DownloadCSV from "./DownloadCSV";



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

const ReportCSmartTableCoreUI = () => {
  const [details, setDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email_id: "",
    vehicleApp: "",
    motorName: "",
    evNonev: [],
    simulationStatus: "",
    timeframe: "",
  });
  const [filteredData, setFilteredData] = useState(usersData);

  const columns = [
    { key: "user_info", label: "User Info", _style: { width: "15%", color: "#0069bd" } },
    { key: "email_id", label: "Email", _style: { width: "20%", color: "#0069bd" } },
    { key: "ev_nonev", label: "EV/NON-EV", _style: { width: "15%", color: "#0069bd" } },
    { key: "vehicle_name", label: "Vehicle Name", _style: { width: "20%", color: "#0069bd" } },
    { key: "motor_name", label: "Motor Name", _style: { width: "15%", color: "#0069bd" } },
    {
      key: "created_on",
      label: "Created on",
      _style: { width: "15%", color: "#0069bd" },
      filter: false,
      sorter: false,
    },
    {
      key: "simulation_status",
      label: "Simulation Status",
      _style: { width: "15%",color: "#0069bd" },
    },
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

  const handleAction = (action) => {
    switch (action) {
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
      name: "",
      email_id: "",
      vehicleApp: "",
      motorName: "",
      evNonev: [],
      simulationStatus: "",
      timeframe: "",
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
    if (filters.evNonev.length > 0) {
      data = data.filter((item) => filters.evNonev.includes(item.ev_nonev));
    }
    if (filters.simulationStatus) {
      data = data.filter((item) => item.simulation_status === filters.simulationStatus);
    }
    if (filters.timeframe) {
      data = data.filter((item) => item.created_on.includes(filters.timeframe));
    }

    setFilteredData(data);
  };

  return (
    <div>
      <div>
      <CRow className="mb-2">
        <CCol>
          <CDropdown className="float-end">
            <CDropdownToggle color="secondary" className="me-2">Export as</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => handleAction("CSV")}>
                CSV
              </CDropdownItem>
              <CDropdownItem onClick={() => handleAction("PDF")}>
                PDF
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <h5 className="heading">Filter Search</h5>
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            className="blue-input"
            // placeholder="Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="text"
            // placeholder="Email"
            value={filters.email_id}
            onChange={(e) => setFilters({ ...filters, email_id: e.target.value })}
          />
        </CCol>
        
        <CCol md="3">
          <CFormLabel>EV/Non-EV</CFormLabel>
          <CInputGroup className="checkboxclass">
            <CFormCheck
              type="checkbox"
              name="ev_nonev"
              id="ev"
              value="EV"
              label="EV"
              checked={filters.evNonev.includes("EV")}
              onChange={(e) => {
                const updatedEVState = e.target.checked
                  ? [...filters.evNonev, "EV"]
                  : filters.evNonev.filter(item => item !== "EV");
                setFilters({ ...filters, evNonev: updatedEVState });
              }}
            />
            <CFormCheck
              type="checkbox"
              name="ev_nonev"
              id="non-ev"
              value="Non-EV"
              label="Non-EV"
              checked={filters.evNonev.includes("Non-EV")}
              onChange={(e) => {
                const updatedNonEVState = e.target.checked
                  ? [...filters.evNonev, "Non-EV"]
                  : filters.evNonev.filter(item => item !== "Non-EV");
                setFilters({ ...filters, evNonev: updatedNonEVState });
              }}
            />
          </CInputGroup>
        </CCol>
        
      </CRow>

      <CRow className="mb-3">

      <CCol md="3">
          <CFormLabel>Timeframe</CFormLabel>
          <CFormInput
            type="date"
            value={filters.timeframe}
            onChange={(e) =>
              setFilters({ ...filters, timeframe: e.target.value })
            }
          />
        </CCol>

      <CCol md="3">
          <CFormLabel>Vehicle/App Name</CFormLabel>
          <CFormInput
            type="text"
            // placeholder="Vehicle/App Name"
            value={filters.vehicleApp}
            onChange={(e) =>
              setFilters({ ...filters, vehicleApp: e.target.value })
            }
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Motor Name</CFormLabel>
          <CFormInput
            type="text"
            // placeholder="Motor Name"
            value={filters.motorName}
            onChange={(e) =>
              setFilters({ ...filters, motorName: e.target.value })
            }
          />
        </CCol>
        
        <CCol md="3">
          <CFormLabel>Simulation Status</CFormLabel>
          <CFormSelect
            value={filters.simulationStatus}
            onChange={(e) =>
              setFilters({ ...filters, simulationStatus: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </CFormSelect>
        </CCol>
      </CRow> 

      
      <CCol className="d-flex align-items-end justify-content-end">
          <CButton color="primary" className="me-2" onClick={clearFilters}>
            Clear Filter
          </CButton>
          <CButton color="primary" className="me-2" onClick={applyFilters}>
            Apply Filter
          </CButton>
        </CCol>
      </div>
      
<div className="tableclass">
      <CSmartTable
        activePage={1}
        // cleaner
        clickableRows
        columns={columns}
        // columnSorter
        items={filteredData}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        onSelectedItemsChange={(items) => setSelectedItems(items)}
        scopedColumns={{
          simulation_status: (item) => (
            <td>
              <CBadge color={getBadge(item.simulation_status)}>
                {item.simulation_status}
              </CBadge>
            </td>
          ),
        }}
        selectable
        sorterValue={{ column: "created_on", state: "asc" }}
        tableProps={{
          className: "add-this-class",
          responsive: true,
          striped: true,
          hover: true,
        }}
        tableBodyProps={{
          className: "align-middle",
        }}
      />
      </div>
    </div>
  );
};

export default ReportCSmartTableCoreUI;
