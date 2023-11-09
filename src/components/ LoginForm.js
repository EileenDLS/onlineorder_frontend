import { Button, Form, Input, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
// if 'export default', no need {}, but if only 'export', need {}

class LoginForm extends React.Component {
  state = {
    loading: false,
  };
  // onFinish()is a property
  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    
    login(data)
      .then(() => {
        message.success(`Login Successful`);
        this.props.onSuccess();
      })
      .catch((err) => { // solve the exception from the login function
        message.error(err.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render = () => {
    return (
      <Form
        name="normal_login"
        onFinish={this.onFinish}
        style={{
          width: 300,
          margin: "auto",
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          {/* click this button（htmlType="submit"）will trigger onFinish(), antd's design' */}
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

export default LoginForm;
