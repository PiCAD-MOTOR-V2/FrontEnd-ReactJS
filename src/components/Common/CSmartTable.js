import React, { useState } from "react";
import { CSmartTable, CBadge, CButton, CCollapse, CCardBody, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CRow } from "@coreui/react-pro";
import '@coreui/coreui/dist/css/coreui.min.css';

const CSmartTableCoreUI = () => {
  const [details, setDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const columns = [
    {
      key: 'userName',
      label: 'User Name',
      _style: { width: '20%' },
    },
    {
      key: 'emailId',
      label: 'Email ID',
      _style: { width: '25%' },
    },
    {
      key: 'occupation',
      label: 'Occupation',
      _style: { width: '20%' },
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      _style: { width: '15%' },
    },
    {
      key: 'status',
      label: 'Status',
      _style: { width: '10%' },
    },
    {
      key: 'options',
      label: 'Options',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
  ];

  const usersData = [
    {
      id: 1,
      userName: 'Yuvaraja',
      emailId: 'yuvaraja...@email.com',
      occupation: 'Professional',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 2,
      userName: 'Anand',
      emailId: 'anand...@email.com',
      occupation: 'Others',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 3,
      userName: 'Senthilkumar',
      emailId: 'senthil...@email.com',
      occupation: 'Student',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Suspended',
    },
    {
      id: 4,
      userName: 'Yuvaraja',
      emailId: 'yuvaraja...@email.com',
      occupation: 'Manufacturer',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 5,
      userName: 'Anand',
      emailId: 'anand...@email.com',
      occupation: 'Student',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 6,
      userName: 'Senthilkumar',
      emailId: 'senthil...@email.com',
      occupation: 'Faculty',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Inactive',
    },
    {
      id: 7,
      userName: 'Yuvaraja',
      emailId: 'yuvaraja...@email.com',
      occupation: 'Student',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 8,
      userName: 'Anand',
      emailId: 'anand...@email.com',
      occupation: 'Student',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
    {
      id: 9,
      userName: 'Senthilkumar',
      emailId: 'senthil...@email.com',
      occupation: 'Mentor',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Suspended':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
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
      case 'addUser':
        console.log('Add User');
        break;
      case 'updateStatus':
        console.log('Update Status');
        break;
      case 'deleteUsers':
        console.log('Delete Users');
        break;
      case 'exportCSV':
        console.log('Export CSV');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <CRow className="mb-2">
        <CCol>
          <CButton color="primary" onClick={() => handleAction('addUser')}>Add User</CButton>
        </CCol>
        <CCol>
          <CDropdown className="float-end">
            <CDropdownToggle color="secondary">
              Action
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => handleAction('updateStatus')}>Update Status</CDropdownItem>
              <CDropdownItem onClick={() => handleAction('deleteUsers')}>Delete Users</CDropdownItem>
              <CDropdownItem onClick={() => handleAction('exportCSV')}>Export CSV</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <CSmartTable
        activePage={1}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        items={usersData}
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
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          options: (item) => (
            <td className="py-2">
              <CDropdown>
                <CDropdownToggle color="secondary">
                  <span>⋮</span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => console.log('View User')}>View</CDropdownItem>
                  <CDropdownItem onClick={() => console.log('Delete User')}>Delete</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </td>
          ),
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody className="p-3">
                  <h4>{item.userName}</h4>
                  <p className="text-muted">User since: {item.lastLogin}</p>
                  <CButton size="sm" color="info" onClick={() => handleAction('updateStatus')}>Update Status</CButton>
                  <CButton size="sm" color="danger" className="ml-1" onClick={() => console.log('Delete User')}>Delete</CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
        selectable
        sorterValue={{ column: 'status', state: 'asc' }}
        tableFilter
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
  );
};

export default CSmartTableCoreUI;
