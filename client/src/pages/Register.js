import React from "react";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:8800/api/auth/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
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
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Register Form</h3>
        <Form.Item label="Name" name="name" required>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email" required>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input type="password" />
        </Form.Item>
        <Link to="/login" className="m-2">
          Already a user? Login here
        </Link>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
