import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import styles from './TableComponent.module.css';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState('Active');
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setData([
      { id: 1, userName: 'Yuvaraja', emailId: 'yuvaraja...@email.com', occupation: 'Professional', lastLogin: '19/06/2024 15:00:00', status: 'Active' },
      { id: 2, userName: 'Anand', emailId: 'anand...@email.com', occupation: 'Others', lastLogin: '19/06/2024 15:00:00', status: 'Active' },
      { id: 3, userName: 'Senthilkumar', emailId: 'senthil...@email.com', occupation: 'Student', lastLogin: '19/06/2024 15:00:00', status: 'Suspended' },
      { id: 4, userName: 'Yuvaraja', emailId: 'yuvaraja...@email.com', occupation: 'Manufacturer', lastLogin: '19/06/2024 15:00:00', status: 'Active' },
      { id: 5, userName: 'Anand', emailId: 'anand...@email.com', occupation: 'Student', lastLogin: '19/06/2024 15:00:00', status: 'Active' },
      { id: 6, userName: 'Senthilkumar', emailId: 'senthil...@email.com', occupation: 'Faculty', lastLogin: '19/06/2024 15:00:00', status: 'Inactive' }
    ]);
  }, []);

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((i) => i !== id) : [...prevSelected, id]
    );
  };

  const handleBulkAction = async (action) => {
    switch (action) {
      case 'Update Status':
        setModalShow(true);
        break;
      case 'Delete Users':
        setData(data.filter((row) => !selectedRows.includes(row.id)));
        setSelectedRows([]);
        break;
      case 'Export CSV':
        // Export logic handled by react-csv
        break;
      default:
        break;
    }
  };

  const handleStatusUpdate = async () => {
    setData(data.map((row) => selectedRows.includes(row.id) ? { ...row, status } : row));
    setSelectedRows([]);
    setModalShow(false);
  };

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const handleFilter = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
  };

  const filteredData = sortedData.filter((row) => {
    return Object.keys(filters).every((key) => row[key].toString().toLowerCase().includes(filters[key].toLowerCase()));
  });

  return (
    <div>
      <div className={styles.bulkActions}>
        <div className={styles.bulkActionsButtons}>
          <Button onClick={() => handleBulkAction('Update Status')}>Update Status</Button>
          <Button onClick={() => handleBulkAction('Delete Users')}>Delete Users</Button>
          <CSVLink data={selectedRows.length ? data.filter(row => selectedRows.includes(row.id)) : data}>
            <Button>Export CSV</Button>
          </CSVLink>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.theadRow}>
            <th><input type="checkbox" onChange={(e) => setSelectedRows(e.target.checked ? data.map(row => row.id) : [])} /></th>
            <th className={styles.th} onClick={() => handleSort('userName')}>User Name</th>
            <th className={styles.th} onClick={() => handleSort('emailId')}>Email ID</th>
            <th className={styles.th} onClick={() => handleSort('occupation')}>Occupation</th>
            <th className={styles.th} onClick={() => handleSort('lastLogin')}>Last Login</th>
            <th className={styles.th} onClick={() => handleSort('status')}>Status</th>
            <th>Options</th>
          </tr>
          <tr>
            <th></th>
            <th><input className={styles.filterInput} type="text" placeholder="Filter by name" onChange={(e) => handleFilter('userName', e.target.value)} /></th>
            <th><input className={styles.filterInput} type="text" placeholder="Filter by email" onChange={(e) => handleFilter('emailId', e.target.value)} /></th>
            <th><input className={styles.filterInput} type="text" placeholder="Filter by occupation" onChange={(e) => handleFilter('occupation', e.target.value)} /></th>
            <th><input className={styles.filterInput} type="text" placeholder="Filter by last login" onChange={(e) => handleFilter('lastLogin', e.target.value)} /></th>
            <th><input className={styles.filterInput} type="text" placeholder="Filter by status" onChange={(e) => handleFilter('status', e.target.value)} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className={styles.tbodyRow}>
              <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleRowSelect(row.id)} /></td>
              <td className={styles.td}>{row.userName}</td>
              <td className={styles.td}>{row.emailId}</td>
              <td className={styles.td}>{row.occupation}</td>
              <td className={styles.td}>{row.lastLogin}</td>
              <td className={styles.td}>
                <span className={`${styles.statusBadge} ${styles[`status${row.status}`]}`}>{row.status}</span>
              </td>
              <td className={styles.td}>
                <DropdownButton id="dropdown-basic-button" className={styles.customDropdown} title="...">
                  <Dropdown.Item className={styles.dropdownItem} onClick={() => alert(JSON.stringify(row))}>View</Dropdown.Item>
                  <Dropdown.Item className={styles.dropdownItem} onClick={() => setData(data.filter((item) => item.id !== row.id))}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableComponent;
