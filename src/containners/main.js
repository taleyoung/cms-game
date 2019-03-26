import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import Chats from "./chats";
import MatchData from "./matchData";
import UserInfo from "./userInfo";
import UserAmount from "./userAmount";
import { Layout, Menu, Icon } from "antd";

const { Header, Content, Footer, Sider } = Layout;
export default class Main extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <NavLink to="/main/userAmount">
                  <Icon type="pie-chart" />
                  <span>数据呈现</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/main/userInfo">
                  <Icon type="user" />
                  <span>用户管理</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/main/matchData">
                  <Icon type="solution" />
                  <span>事务管理</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="5">
                <a href="https://mp.weixin.qq.com/" target="blank">
                  <Icon type="idcard" />
                  <span>公众号管理</span>
                </a>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="idcard" />
                <span>联系开发者</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>
            <Header
              style={{
                background: "#fff",
                textAlign: "center",
                fontSize: "1.8em",
                color: "#1890FF",
                fontWeight: "bold"
              }}>
              '约个游戏' 项目后台管理系统
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <div>
                <Switch>
                  <Route path="/main/userAmount" component={UserAmount} />
                  <Route path="/main/userInfo" component={UserInfo} />
                  <Route path="/main/matchData" component={MatchData} />
                  <Route path="/main/chats" component={Chats} />
                </Switch>
                <Redirect to="/main/userAmount" />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              GAME-CMS ©2019 Created by Wizz_Studio
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
