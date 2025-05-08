import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProfileConsumersPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== 'buyer') {
    return <div><h2>Consumer Profile</h2><p>You are not authorized to view this page.</p></div>;
  }

  return (
    <div>
      <h2>Consumer Profile</h2>
      <ul>
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Role:</strong> {user.role}</li>
      </ul>
    </div>
  );
};

export default ProfileConsumersPage; 