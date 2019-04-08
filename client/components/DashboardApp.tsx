"use strict";
import * as React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Card, DatePicker, Switch, Row, Col } from 'antd';
import moment from 'moment';


// Adding the Report Component
import Report from './Report';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

require('antd/dist/antd.less');

class DashboardApp extends React.Component{

  // Assigned additional states for recipients, optins, date-range
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    return (
      
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Reports</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px' }} ><h2>Report</h2></Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Reports</Breadcrumb.Item>
              <Breadcrumb.Item>Message Receipts &amp; Optins</Breadcrumb.Item>
            </Breadcrumb>
            {/* First block that contains Date Range, Switch Options */}
            <Report />
          </Content>
          <Footer style={{ textAlign: 'center' }}>ShopMessage ©2018</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardApp;