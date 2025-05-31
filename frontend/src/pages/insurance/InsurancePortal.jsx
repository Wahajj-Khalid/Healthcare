import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  SafetyCertificateOutlined,
  FileProtectOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Eligibility from "./sections/Eligibility";
import Claims from "./sections/Claims";
import DoctorPanels from "./sections/DoctorPanels";
import "./InsurancePortal.css";

const { Sider, Content } = Layout;

const InsurancePortal = () => {
  const [selectedKey, setSelectedKey] = useState("eligibility");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "eligibility",
      icon: <SafetyCertificateOutlined />,
      label: "Eligibility",
    },
    { key: "claims", icon: <FileProtectOutlined />, label: "Claims" },
    { key: "doctor-panels", icon: <TeamOutlined />, label: "Doctor Panels" },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "eligibility":
        return <Eligibility />;
      case "claims":
        return <Claims />;
      case "doctor-panels":
        return <DoctorPanels />;
      default:
        return <Eligibility />;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        width={200}
        collapsedWidth={80}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#129990",
        }}
      >
        <div className="p-4 text-center flex items-center justify-between">
          <h1
            className={`text-xl font-bold text-[#FFFBDE] ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Insurance Portal
          </h1>
          <button
            className="text-[#FFFBDE] p-2 hover:text-[#90D1CA]"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
          className="border-r-0"
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Content className="p-6 bg-[#FFFBDE] min-h-screen">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default InsurancePortal;
