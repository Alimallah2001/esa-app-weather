import React from 'react'
import { Form, Input,message} from 'antd'
import '../styles/register.css'
import {Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showLoading , hideLoading} from '../redux/features/alertSlice'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onFinishHandler = async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('http://localhost:2023/api/v1/user/login',values)
      window.location.reload();
      dispatch(hideLoading())

    if(res.data.success){
      localStorage.setItem("token" ,res.data.token)
      message.success(res.data.message)
      navigate('/')
    }
    else{
      message.error(res.data.message)
    }
    
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  }
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-2xl text-center mb-6 font-medium">Login Form</h3>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/register" className="block text-sm mt-2">
              Not a user register here
            </Link>
            <button type='submit' className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login
