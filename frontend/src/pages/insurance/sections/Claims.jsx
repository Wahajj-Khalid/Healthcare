import React, { useState } from "react";
import { Table, Button, Input, Modal, Card, Tag, message } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Claims = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    {
      key: "1",
      claimId: "CLM001",
      patient: "John Doe",
      amount: "$1,500",
      status: "Pending",
      date: "2024-03-15",
      description: "Annual physical examination",
    },
    {
      key: "2",
      claimId: "CLM002",
      patient: "Jane Smith",
      amount: "$2,800",
      status: "Pending",
      date: "2024-03-14",
      description: "MRI scan",
    },
    {
      key: "3",
      claimId: "CLM003",
      patient: "Robert Johnson",
      amount: "$750",
      status: "Approved",
      date: "2024-03-13",
      description: "Prescription medication",
    },
  ]);

  const handleStatusChange = (record, newStatus) => {
    Modal.confirm({
      title: `Confirm ${newStatus}`,
      content: `Are you sure you want to ${newStatus.toLowerCase()} claim ${
        record.claimId
      }?`,
      onOk() {
        setData(
          data.map((item) =>
            item.key === record.key ? { ...item, status: newStatus } : item
          )
        );
        message.success(
          `Claim ${record.claimId} has been ${newStatus.toLowerCase()}`
        );
      },
    });
  };

  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claimId",
      key: "claimId",
      sorter: (a, b) => a.claimId.localeCompare(b.claimId),
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      sorter: (a, b) => a.patient.localeCompare(b.patient),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.localeCompare(b.amount),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "success"
              : status === "Denied"
              ? "error"
              : "warning"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Pending" && (
          <div className="space-x-2">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleStatusChange(record, "Approved")}
              className="bg-[#129990]"
            >
              Approve
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => handleStatusChange(record, "Denied")}
            >
              Deny
            </Button>
          </div>
        ),
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.claimId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.patient.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card title="Insurance Claims" className="overflow-x-auto">
      <div className="mb-4">
        <Search
          placeholder="Search claims by ID or patient name"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
};

export default Claims;
