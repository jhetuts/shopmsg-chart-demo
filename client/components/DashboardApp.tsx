"use strict";
import * as React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Card, DatePicker, Switch, Row, Col } from 'antd';

import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

require('antd/dist/antd.less');
export default class DashboardApp extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  onChange = (checked) => {
    console.log(`switch to ${checked}`);
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
              <Breadcrumb.Item>Message Receipts & Optins</Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ margin: '0 0 20px 0'}}>
              <Row style={{padding: '10px 0' }}>
                <Col span={2}>Date Range:</Col>
                <Col span={22}>
                  <RangePicker
                    defaultValue={[moment('2018/11/01', dateFormat),
                    moment('2018/11/08', dateFormat)]}
                    format={dateFormat}
                  />
                </Col>
              </Row>
              <Row style={{padding: '10px 0' }}>
                <Col span={2}>Show Options:</Col>
                <Col span={22}>
                  <Switch defaultChecked onChange={this.onChange} />
                </Col>
              </Row>
              <Row style={{padding: '10px 0' }}>
                <Col span={2}>Show Recipients:</Col>
                <Col span={22}>
                  <Switch defaultChecked onChange={this.onChange} />
                </Col>
              </Row>
            </Card>
            <Card>

            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ShopMessage ©2018</Footer>
        </Layout>
      </Layout>
    );
  }
}