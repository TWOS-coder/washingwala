import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [mode, setMode] = useState('Sign Up') // better naming
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    password: '',
  })

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, formData)
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          phone: formData.phone,
          password: formData.password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in successfully')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Server error, please try again later')
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const buttonText = mode === 'Sign Up' ? 'Create account' : 'Login'
  const toggleText = mode === 'Sign Up'
    ? <>Already have an account? <button onClick={() => setMode('Login')} className='text-primary underline'>Login here</button></>
    : <>Create a new account? <button onClick={() => setMode('Sign Up')} className='text-primary underline'>Sign up here</button></>

  return (
    <main className='min-h-[80vh] flex justify-center items-center p-6'>
      <form onSubmit={onSubmitHandler} className='max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-gray-700 text-sm space-y-6' aria-label={mode === 'Sign Up' ? 'Sign up form' : 'Login form'}>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          {mode === 'Sign Up' ? 'Create Account' : 'Login'}
        </h1>
        <p className='mb-6 text-gray-600'>
          Please {mode === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
        </p>

        {mode === 'Sign Up' && (
          <label htmlFor='name' className='block'>
            Full Name
            <input
              id='name'
              name='name'
              type='text'
              required
              value={formData.name}
              onChange={handleChange}
              className='mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Enter full name'
              autoComplete='name'
            />
          </label>
        )}

        <label htmlFor='phone' className='block'>
          Phone
          <input
            id='phone'
            name='phone'
            type='tel'
            required
            value={formData.phone}
            onChange={handleChange}
            className='mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Enter phone number'
            autoComplete='tel'
          />
        </label>

        {mode === 'Sign Up' && (
          <label htmlFor='address' className='block'>
            Pin Code
            <input
              id='address'
              name='address'
              type='text'
              required
              value={formData.address}
              onChange={handleChange}
              className='mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Enter pin code'
              autoComplete='postal-code'
            />
          </label>
        )}

        <label htmlFor='password' className='block'>
          Password
          <input
            id='password'
            name='password'
            type='password'
            required
            value={formData.password}
            onChange={handleChange}
            className='mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Enter password'
            autoComplete={mode === 'Sign Up' ? 'new-password' : 'current-password'}
          />
        </label>

        <button type='submit' className='w-full py-3 bg-primary text-white rounded-md font-semibold text-lg hover:bg-primary-dark transition'>
          {buttonText}
        </button>

        <div className='text-center text-gray-600'>
          {toggleText}
        </div>
      </form>
    </main>
  )
}

export default Login
