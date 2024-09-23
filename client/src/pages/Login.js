import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:8800/api/auth/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="login-form">
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email" required>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input type="password" />
        </Form.Item>
        <Link to="/register" className="m-2">
          Don't have an account? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
