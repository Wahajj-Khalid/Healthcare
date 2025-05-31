import React, { useState } from "react";
import { Form, Input, Button, Card, List, Modal, message } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const InsuranceManagement = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [providers, setProviders] = useState([
    {
      id: "INS001",
      name: "Blue Cross Blue Shield",
      contact: "+1 (555) 123-4567",
      email: "contact@bcbs.com",
      address: "123 Insurance Ave, Healthcare City, HC 12345",
      status: "Active",
    },
    {
      id: "INS002",
      name: "Aetna",
      contact: "+1 (555) 234-5678",
      email: "support@aetna.com",
      address: "456 Health Street, Medical Town, MT 67890",
      status: "Active",
    },
    {
      id: "INS003",
      name: "UnitedHealthcare",
      contact: "+1 (555) 345-6789",
      email: "info@uhc.com",
      address: "789 Care Road, Wellness City, WC 13579",
      status: "Active",
    },
  ]);

  const onFinish = (values) => {
    const newProvider = {
      id: `INS${String(providers.length + 1).padStart(3, "0")}`,
      ...values,
      status: "Active",
    };
    setProviders([...providers, newProvider]);
    message.success("Insurance provider added successfully!");
    form.resetFields();
  };

  const handleRemoveProvider = (provider) => {
    Modal.confirm({
      title: "Remove Provider",
      content: `Are you sure you want to remove ${provider.name}?`,
      onOk() {
        setProviders(providers.filter((p) => p.id !== provider.id));
        message.success("Insurance provider removed successfully!");
      },
    });
  };

  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchText.toLowerCase()) ||
      provider.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card title="Add Insurance Provider" className="max-w-3xl mx-auto">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Provider Name"
              name="name"
              rules={[
                { required: true, message: "Please input provider name!" },
              ]}
            >
              <Input placeholder="Enter provider name" />
            </Form.Item>

            <Form.Item
              label="Contact Number"
              name="contact"
              rules={[
                { required: true, message: "Please input contact number!" },
              ]}
            >
              <Input placeholder="Enter contact number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input address!" }]}
            >
              <Input placeholder="Enter provider address" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="w-full md:w-auto"
            >
              Add Provider
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Insurance Providers" className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Search
            placeholder="Search providers by name or ID"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <List
          itemLayout="horizontal"
          dataSource={filteredProviders}
          renderItem={(provider) => (
            <List.Item
              actions={[
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveProvider(provider)}
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center space-x-2">
                    <span>{provider.name}</span>
                    <span className="text-sm text-gray-500">
                      ({provider.id})
                    </span>
                  </div>
                }
                description={
                  <div className="space-y-1">
                    <p className="flex items-center">
                      <PhoneOutlined className="mr-2" />
                      {provider.contact}
                    </p>
                    <p className="flex items-center">
                      <MailOutlined className="mr-2" />
                      {provider.email}
                    </p>
                    <p>{provider.address}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default InsuranceManagement;
