import React from 'react'
import { Form, Input,message} from 'antd'
import '../styles/register.css'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showLoading , hideLoading} from '../redux/features/alertSlice'

const Register = () => {

const navigate = useNavigate()
const dispatch =useDispatch()

const onFinishHandler = async (values) => {
  try {
    dispatch(showLoading())
     const res = await axios.post("http://localhost:2023/api/v1/user/register/", values);
    dispatch(hideLoading())
    if (res.data.success) {
      message.success(res.data.message);
      navigate("/login");
    } else {
      message.error(res.data.message);
    }
    
  } catch (error) {
    console.log(error);
    message.error("Something Went Wrong");
  }
};


  return (
    <div>
           <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Form layout="vertical" onFinish={onFinishHandler}  >
          <h3  className="text-2xl text-center mb-6 font-medium">Register Form</h3>
            <Form.Item label='Name' name='name'>
              <Input type='text' required/>
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input type='email' required/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' required/>
            </Form.Item>
            <Link to='/login' className="block text-sm mt-2">Already user Login here</Link>
            <button  className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700" type='submit'>Register</button>
        </Form>
      </div>
    </div>
    </div>
    </div>
    

  )
}

export default Register
