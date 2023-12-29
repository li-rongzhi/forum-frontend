import React, { useState, useEffect } from 'react';
import { Button, TextField, Avatar } from '@mui/material';

const AccountPage: React.FC = () => {
    // State for user info
    const [userInfo, setUserInfo] = useState({
        userName: '',
        profileImage: '', // URL to the user's profile image
        threads: [], // This would be an array of thread objects
    });

    // State for the form inputs
    const [newUserName, setNewUserName] = useState('');
    const [newProfileImage, setNewProfileImage] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Handlers for updating user info
    const handleNameChange = async () => {
        // Implement API call to update the username
        console.log('Update name to:', newUserName);
    };

    const handleProfileChange = async () => {
        // Implement API call to update the profile image
        console.log('Update profile image to:', newProfileImage);
    };

    const handlePasswordChange = async () => {
        // Implement API call to update the password
        console.log('Update password');
    };

    let userData = localStorage.getItem("userData");
    if (userData == null) {
        return <>Log in first</>
    }
    userData = JSON.parse(userData)
    return (
        <div style={{ padding: '20px' }}>
            <h1>Account Info</h1>
            <Avatar src="" alt="Guest" style={{ width: '100px', height: '100px' }} />
            <h2>{userInfo.userName}</h2>

            {/* User's threads */}
            <div>
                <h3>Your Threads:</h3>
                {userInfo.threads.map((thread, index) => (
                    <p key={index}>thread title</p> // Replace with actual content of the thread
                ))}
            </div>

            {/* Form for updating user info */}
            <div>
                <h3>Update Name</h3>
                <TextField label="New Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                <Button onClick={handleNameChange}>Update Name</Button>

                <h3>Update Profile Image</h3>
                <TextField label="New Profile Image URL" value={newProfileImage} onChange={(e) => setNewProfileImage(e.target.value)} />
                <Button onClick={handleProfileChange}>Update Profile</Button>

                <h3>Change Password</h3>
                <TextField type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Button onClick={handlePasswordChange}>Change Password</Button>
            </div>
        </div>
    );
};

export default AccountPage;
