import React from 'react';
import { Menu, Dropdown } from 'antd';

const ContextMenu = ({ onApplyToAll }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onApplyToAll}>
        Apply to all
      </Menu.Item>
    </Menu>
  );

  return <Dropdown overlay={menu} trigger={['contextMenu']} />;
};

export default ContextMenu;
