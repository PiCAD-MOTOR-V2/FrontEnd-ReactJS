import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Settings.css';
import editIcon from '../../assets/images/icons/editicon.svg';
import profileImage from '../../assets/images/icons/profile.svg';
import editprofile from '../../assets/images/icons/editprofile.svg';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Administrator');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('admin123@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(profileImage);
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Handle the save logic here
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePasswordSaveClick = () => {
    // Handle the password change logic here
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'General' ? 'active' : ''}`}
          onClick={() => handleTabClick('General')}
        >
          General
        </div>
        <div
          className={`tab ${activeTab === 'Security' ? 'active' : ''}`}
          onClick={() => handleTabClick('Security')}
        >
          Security
        </div>
      </div>
      {activeTab === 'General' && (
        <div className="profile-settings">
          <h4 className='settings-h'>Profile settings</h4>
          <div className="profile-pic">
            <img src={profileImageSrc} alt="Profile" />
            {isEditing && (
              <>
                <img
                  src={editprofile}
                  alt="upload_button"
                  className="upload_button"
                  onClick={() => document.getElementById('fileInput').click()}
                />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
          <div className="form">
            <div className="form-group">
              <TextField
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Email ID"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
          </div>
          <div className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              disabled={isEditing}
              className="edit-button"
              endIcon={<img src={editIcon} alt="Edit Icon" className="edit-icon1" />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              disabled={!isEditing}
              className="submit-button"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {activeTab === 'Security' && (
        <div className="security-settings">
          <h4 className='head'>Reset Password</h4>
          <div className="form">
            <div className="form-group">
              <TextField
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className="password-visibility-icon" onClick={() => togglePasswordVisibility('current')}>
                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className="password-visibility-icon" onClick={() => togglePasswordVisibility('new')}>
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Re-enter New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className="password-visibility-icon" onClick={() => togglePasswordVisibility('confirm')}>
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="button-group-right">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordSaveClick}
              className="submit-button"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Password Changed Successfully"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Your password has been changed successfully.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
