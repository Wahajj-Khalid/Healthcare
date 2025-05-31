import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import AppointmentScheduling from "./sections/AppointmentScheduling";
import StatisticalReports from "./sections/StatisticalReports";
import InsuranceManagement from "./sections/InsuranceManagement";
import "./HospitalPortal.css";

const { Sider, Content } = Layout;

const HospitalPortal = () => {
  const [selectedKey, setSelectedKey] = useState("appointments");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: "Appointment Scheduling",
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Statistical Reports",
    },
    {
      key: "insurance",
      icon: <SafetyCertificateOutlined />,
      label: "Insurance Management",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "appointments":
        return <AppointmentScheduling />;
      case "reports":
        return <StatisticalReports />;
      case "insurance":
        return <InsuranceManagement />;
      default:
        return <AppointmentScheduling />;
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
            Hospital Portal
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

export default HospitalPortal;
