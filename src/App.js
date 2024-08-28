import React, { useState } from 'react';
import {
  DollarCircleFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import BudgetTable from './components/BudgetTable'; 
import './App.css'; 

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer},
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeFilled />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <DollarCircleFilled/>,
              label: 'Budget',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            
          />
        </Header>
        <Content>
          <BudgetTable/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
