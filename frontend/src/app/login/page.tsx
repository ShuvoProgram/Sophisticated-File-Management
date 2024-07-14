"use client";
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAppDispatch } from '@/redux/hooks';
import { useLoginUserMutation } from '@/redux/feature/user/userApi';
import { getUser, setToken } from '@/redux/feature/user/userSlice';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();
  const redirectTo = "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginUser(form);
    const { data: responseData, error } = result;
    if (responseData?.statusCode === 200) {
      toast.success(responseData?.message);
      dispatch(setToken(responseData?.data?.accessToken));
      await dispatch(getUser());
      router.push(redirectTo);
    } else {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex items-center mb-4">
            <input id="remember-me" type="checkbox" className="mr-2" />
            <label htmlFor="remember-me" className="text-sm">Remember me</label>
          </div>
          <Button variant="contained" color="primary" fullWidth className="mb-4" type="submit">
            Sign In
          </Button>
        </form>
        <div className="flex items-center mb-4">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-500">OR</span>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          fullWidth
          onClick={() => signIn("google", { callbackUrl: "https://learnify-v1.vercel.app" })}
        >
          Sign in with Google
        </Button>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500">Need help signing in?</a>
        </div>
      </div>
    </div>
  );
}