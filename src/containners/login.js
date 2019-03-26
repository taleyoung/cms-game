import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { Redirect, Route, Switch } from "react-router";
import Main from "./main";
import logoUrl from "../assets/img/logo.jpg";
class Login extends Component {
  state = {
    loginSuccess: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.userName === "wizz" && values.password === "wizz666") {
          sessionStorage.setItem("isLogin", "1");
          this.setState({
            loginSuccess: true
          });
        } else {
          alert("密码错误");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loginSuccess } = this.state;
    if (parseInt(sessionStorage.getItem("isLogin")) || loginSuccess) {
      return (
        <Switch>
          <Route path="/main" component={Main} />
          <Redirect to="/main" />
        </Switch>
      );
    } else {
      return (
        <div className="card-wrap">
          <Card
            className="card-title"
            cover={
              <img alt="example" src={logoUrl} style={{ height: "160px" }} />
            }
            title="约个游戏-后台管理系统">
            {/* <Meta title="后台管理" style={{ fontSize: "1.2em" }} /> */}
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{
                maxWidth: "300px",
                margin: "20px auto",
                border: "2px"
              }}>
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="lock"
                        className={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item className="button-wrap">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      );
    }
  }
}
export default Form.create({ name: "normal_login" })(Login);
