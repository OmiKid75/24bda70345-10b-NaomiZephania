import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full`}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full`}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full`}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">Register</button>
    </form>
  );
};

export default RegisterForm;