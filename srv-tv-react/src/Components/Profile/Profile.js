import React from 'react';

const Profile = () => {
  var userData = JSON.parse(localStorage.getItem('user'));
  
  return <div className='container mt-5'>
    <h1>Profile</h1>
    <div>

      <h5>{userData.firstName} {userData.lastName}</h5>
      <h5>Email: {userData.email}</h5>
      <h5>Date of Birth: {userData.dob}</h5>
      <h5>Contact: {userData.contect}</h5>
      <h5>Address: {userData.address}</h5>
    </div>
  </div>;
};

export default Profile;
