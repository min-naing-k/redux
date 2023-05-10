import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { pause } from '@/helpers';

const addUser = createAsyncThunk('users/add', async() => {
  const response = await axios.post('/users', {
    name: faker.name.fullName(),
    email: faker.name.firstName().toLowerCase() + '@gmail.com'
  });

  await pause(2000);

  return response.data;
});

export { addUser };