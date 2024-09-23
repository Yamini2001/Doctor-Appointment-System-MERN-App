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

  // Form handler for registration
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      // Sending registration data to the backend
      const res = await axios.post("/api/v1/user/register", values);

      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login"); // Navigate to login after success
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Register Form</h3>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: "Please enter a valid email!" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
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
