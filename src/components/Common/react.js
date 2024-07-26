import React, { useState, useEffect } from "react";
import {
  CSmartTable,
  CBadge,
  CButton,
  // CCollapse,
  // CCardBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormControlWrapper,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CCloseButton,
} from "@coreui/react-pro";
import '@coreui/coreui/dist/css/coreui.min.css';
import editprofile from '../../assets/images/icons/ProfileCamIcon.svg';
import '../Common/CSmartTable.css'; // Import your CSS file for the transition effect
import viewEyeIcon from '../../assets/images/icons/viewEyeIcon.svg';
import deleteIcon from '../../assets/images/icons/deleteIcon.svg';
import emailIcon from '../../assets/images/icons/emailIcon.svg';
import lastLoginIcon from '../../assets/images/icons/lastLoginIcon.svg';
import bioIcon from '../../assets/images/icons/bioIcon.svg';
import passwordIcon from '../../assets/images/icons/passwordIcon.svg';
import ratingIcon from '../../assets/images/icons/ratingIcon.svg';
import commentIcon from '../../assets/images/icons/commentIcon.svg';

const TrackRequest = () => {
  // const [details, setDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      userName: 'Yuvaraja',
      emailId: 'yuvaraja...@email.com',
      occupation: 'Professional',
      lastLogin: '19/06/2024 15:00:00',
      status: 'Active',
      bio: "Yuvaraja is a dynamic Mechanical Engineering student at IIT Madras. Passionate about robotics and sustainable design, he excels in both academics and extracurriculars. Yuvaraja actively participates in the robotics club, and his research on renewable energy solutions is making waves. In his free time, he enjoys playing chess and hiking.",
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
  ]);
  const [viewModal, setViewModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState('Active');

  // State for Add User Modal
  const [addUserModal, setAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

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
      _style: { width: '5%' },
      filter: false,
      sorter: false,
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

  const handleAction = (action) => {
    switch (action) {
      case 'addUser':
        setAddUserModal(true);
        break;
      case 'updateStatus':
        setStatusModal(true);
        break;
      case 'deleteUsers':
        const updatedData = usersData.filter(user => !selectedItems.includes(user.id));
        setUsersData(updatedData);
        setSelectedItems([]);
        break;
      case 'exportCSV':
        exportCSV();
        break;
      default:
        break;
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModal(true);
  };

  const handleDeleteUser = (userId) => {
    const updatedData = usersData.filter(user => user.id !== userId);
    setUsersData(updatedData);
  };

  const handleUpdateStatus = () => {
    const updatedData = usersData.map(user => {
      if (selectedItems.includes(user.id)) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsersData(updatedData);
    setStatusModal(false);
    setSelectedItems([]);
  };

  const exportCSV = () => {
    const selectedUsers = usersData.filter(user => selectedItems.includes(user.id));
    const csvContent = [
      ['User Name', 'Email ID', 'Occupation', 'Last Login', 'Status'],
      ...selectedUsers.map(user => [
        user.userName,
        user.emailId,
        user.occupation,
        user.lastLogin,
        user.status,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_users.csv';
    a.click();
  };

  const handleSaveUser = () => {
    // Here you can add validation logic before adding new user to the state
    setUsersData([...usersData, newUser]);
    setAddUserModal(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isEditing] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewUser({ ...newUser, profileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const [isEditable, setIsEditable] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setEditableUser(selectedUser);
    }
  }, [selectedUser]);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };


  return (
    <div className="CSmartTable">
      <CRow className="mb-2">
        <CCol>
          <CButton color="primary" className="buttonsATable" onClick={() => handleAction('addUser')}>Add User</CButton>
        </CCol>
        <CCol>
          <CDropdown className="float-end">
            <CDropdownToggle color="secondary" className="buttonsATable">
              Action
            </CDropdownToggle>
            <CDropdownMenu className="actionBtn">
              <CDropdownItem onClick={() => handleAction('updateStatus')}>Update Status</CDropdownItem>
              <CDropdownItem onClick={() => handleAction('deleteUsers')}>Delete Users</CDropdownItem>
              <CDropdownItem onClick={() => handleAction('exportCSV')}>Export CSV</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <CSmartTable
      activePage={1}
      clickableRows
      columns={columns}
      columnFilter
      columnSorter
      items={usersData}
      itemsPerPageSelect
      itemsPerPage={10}
      pagination
      onFilteredItemsChange={(items) => {
        console.log(items);
      }}
      onSelectedItemsChange={(items) => {
        setSelectedItems(items.map(item => item.id));
        console.log(items);
      }}
      scopedColumns={{
        checkbox: (item) => (
          <td>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => {
                if (selectedItems.includes(item.id)) {
                  setSelectedItems(selectedItems.filter(id => id !== item.id));
                } else {
                  setSelectedItems([...selectedItems, item.id]);
                }
              }}
            />
          </td>
        ),
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
        options: (item) => (
          <td className="py-2">
            <CDropdown>
              <CDropdownToggle color="secondary" className="custom-dropdown-toggle">
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem className="custom-dropdown-item" onClick={() => handleViewUser(item)}><img src={viewEyeIcon} alt="View Eye Icon" /> View</CDropdownItem>
                <CDropdownItem className="custom-dropdown-item" onClick={() => handleDeleteUser(item.id)}><img src={deleteIcon} alt="Delete Icon" /> Delete</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </td>
        ),
      }}
      selectable
      sorterValue={{ column: 'status', state: 'asc' }}
      tableProps={{
        className: 'add-this-class',
        responsive: true,
        // striped: true,
        // hover: true,
      }}
      tableBodyProps={{
        className: 'align-middle',
      }}
    />

<CModal visible={viewModal} onClose={() => setViewModal(false)} className="add-user-modal">
      <CModalHeader onClose={() => setViewModal(false)} className="closeButton">
        <CButton color="primary" className="edit-button" onClick={toggleEdit}>
          {isEditable ? 'Save' : 'Edit'}
        </CButton>
      </CModalHeader>
      <CModalBody>
        {editableUser && (
          <>
            <div className="profile-section">
              <p className="userStatus">{editableUser.status}</p>
              <img src={editableUser.profilePicture} alt="Profile" className="profile-picture" />
              <h4 className="userName">{editableUser.userName}</h4>
              <p className="userOccupation">{editableUser.occupation}</p>
            </div>
            <div className="about-section">
              <h5 className="aboutTitle">About</h5>
              <div className="about-item">
                <img src={emailIcon} alt="Email Icon"/>
                <div>
                  <label>Email:</label>
                  <CFormInput
                    type="text"
                    name="emailId"
                    value={editableUser.emailId}
                    readOnly={!isEditable}
                    className="borderless-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* <div className="about-item">
                <img src={lastLoginIcon} alt="Last Login Icon"/>
                <div>
                  <label>Last Login:</label>
                  <CFormInput
                    type="text"
                    name="lastLogin"
                    value={editableUser.lastLogin}
                    readOnly={!isEditable}
                    className="borderless-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}
              <div className="about-item">
                <img src={bioIcon} alt="Bio Icon"/>
                <div>
                  <label>Bio:</label>
                  {/* <CFormTextarea
                  rows={3}
                    type="text"
                    name="bio"
                    value={editableUser.bio}
                    readOnly={!isEditable}
                    className="borderless-input"
                    onChange={handleInputChange}
                  /> */}
                  <div className="bioText">
                    {editableUser.bio}
                  </div>
                </div>
              </div>
              <div className="about-item">
                <img src={passwordIcon} alt="Password Icon"/>
                <div>
                  <label>Password:</label>
                  <div className="password-container">
                    <CFormInput
                      type="password"
                      name="password"
                      value={editableUser.password}
                      readOnly={!isEditable}
                      className="borderless-input"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-comment">
                <div>
                  <img src={ratingIcon} alt="Rating Icon"/>
                  <div>
                    <label>Rating</label>
                    <div className="white-background">
                      {/* Rating and comment content goes here */}
                    </div>
                  </div>
                </div>
                <div>
                  <img src={commentIcon} alt="Comment Icon"/>
                  <div>
                    <label>Comment</label>
                    <div className="white-background">
                      {/* Rating and comment content goes here */}
                    </div>
                  </div>
                </div>
              </div>
          </>
        )}
      </CModalBody>
      {/* <CModalFooter>
        <div className="buttons">
          <CButton color="secondary" onClick={() => setViewModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={() => setViewModal(false)}>Confirm</CButton>
        </div>
      </CModalFooter> */}
    </CModal>

      <CModal visible={statusModal} onClose={() => setStatusModal(false)}>
        <CModalHeader onClose={() => setStatusModal(false)}>
          <CModalTitle>Update Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleUpdateStatus}>Update</CButton>
          <CButton color="secondary" onClick={() => setStatusModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      {/* Add User Modal */}
      <CModal
        visible={addUserModal}
        onClose={() => setAddUserModal(false)}
        className="add-user-modal"
      >
        <CModalHeader onClose={() => setAddUserModal(false)}>
          <CModalTitle>Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="profile-pic">
              <img src={profileImagePreview || editprofile} alt="Profile" onClick={() => document.getElementById('fileInput').click()} height={"100px"} width={"100px"} style={{borderRadius: '50%', border: '1px black solid', borderColor: 'rgba(0, 0, 0, 0.5)'}}/>
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>
            <CFormControlWrapper>
              <div>
              <CFormLabel>First Name</CFormLabel>
              <CFormInput
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onCha
                nge={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              />
              </div>
            </CFormControlWrapper>
            <CFormControlWrapper>
              <div>
              <CFormLabel>Last Name</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              />
              </div>
            </CFormControlWrapper>
            <CFormControlWrapper>
              <div>
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              </div>
            </CFormControlWrapper>
            <CFormControlWrapper>
              <div>
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              </div>
            </CFormControlWrapper>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSaveUser}>Save</CButton>
          <CButton color="secondary" onClick={() => setAddUserModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TrackRequest;