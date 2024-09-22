import React from 'react';
import { Form, Input,message } from "antd";
import '../styles/Register.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  // Form handler
  const onFinishHandler = async(values) => {
    try{
      const res = await axios.post('/api/v1/user/register',values)
      if(res.data.success){
        message.success('Register Suceessfully!')
        navigate('/login')
      }
      else{
        message.error(res.data.message)
      }
    }
    catch(error){
      console.log(error);
      message.error('Something went Wrong')
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
        >
          <h1 className="text-center">Register Form</h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Link to="/login" className="ms-2 text">
            Already a user? Log in here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
