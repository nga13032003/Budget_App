import React, { useState } from 'react';
import {
  DollarCircleFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import BudgetTable from './components/BudgetTable/BudgetTable';
import './App.css'; 

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('2'); // Default to 'Budget'
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuKey(key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <HomeFilled />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <DollarCircleFilled />,
              label: 'Budget',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Budget ss2',
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
          {selectedMenuKey === '2' && <BudgetTable />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
