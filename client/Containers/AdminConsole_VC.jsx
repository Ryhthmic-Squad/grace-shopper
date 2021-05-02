import React from 'react';
import UsersCard from './UsersCard';
import { Row, Spacer } from '../components/styles/AdminConsole';

const AdminConsole = () => (
  <Row>
    <UsersCard />
    <Spacer m={4} />
    <UsersCard />
    <Spacer m={4} />
    <UsersCard />
  </Row>
);

export default AdminConsole;
