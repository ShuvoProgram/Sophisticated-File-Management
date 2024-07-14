// pages/register.tsx
"use client";
import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';

import { useRegisterUserMutation } from '@/redux/feature/user/userApi';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import toast from "react-hot-toast";
import { Logo } from '@/components/logo';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirectTo = "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({
        ...form,
        [name]: checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here

    const result = await registerUser(form);
    const { data: responseData, error } = result;
    if (responseData?.statusCode === 200) {
      toast.success(responseData?.message);
      router.push("/login");
    } else {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
              />
            }
            label="I agree to the terms and conditions"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mb-4"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;