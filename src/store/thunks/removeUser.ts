import UserInterface from '@/contracts/UserInterface';
import { pause } from '@/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async(user: UserInterface) => {
  await axios.delete(`/users/${user.id}`);

  await pause(2000);

  return user;
});

export { removeUser };