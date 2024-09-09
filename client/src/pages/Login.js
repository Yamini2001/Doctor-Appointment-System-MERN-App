import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd'; // Import Button from Ant Design
import '../styles/Login.css'; // Ensure you have styles defined

const Login = () => {
  // Form handler
  const onFinishHandler = (values) => {
    console.log('Login Values: ', values);
  };

  return (
    <div className="form-container1">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="login-form" // Consider using a more appropriate class like 'login-form'
        initialValues={{
          email: '',
          password: '',
        }}
      >
        <h1 className="text-center">Login Form</h1>
        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email', // Ensures that the input is validated as an email
            },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>

        {/* Password Field */}
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
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* Register Link */}
        <Link to="/register" className="ms-2 text">
          Not a user? Register here
        </Link>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-btn">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
