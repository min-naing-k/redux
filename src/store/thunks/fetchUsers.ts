import UserInterface from '@/contracts/UserInterface.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { pause } from '@/helpers';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async() => {
  const response = await axios.get('/users');

  await pause(1000);

  return response.data as UserInterface[];
});

export { fetchUsers };