import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from '../components/styles/AdminConsole';
import Button from '../components/styles/Button';

const UsersCard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data: users } = await axios.get('/api/users');
      setUsers(users);
    };
    getData();
  }, []);

  return (
    <div>
      <h2>New Users</h2>
      <hr className="heavy" />
      <Row>
        <strong>Name</strong>
        <strong>Sign-up Date</strong>
      </Row>
      <hr />
      {users.length && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Row>
                <span>{user.fullName}</span>
                <span>{user.createdAt.slice(0, 10)}</span>
              </Row>
            </li>
          ))}
        </ul>
      )}
      <Button>Show Users</Button>
    </div>
  );
};

export default UsersCard;
