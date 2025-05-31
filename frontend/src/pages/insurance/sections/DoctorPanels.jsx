import React, { useState } from "react";
import { Form, Input, Button, Card, List, Modal, message } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const DoctorPanels = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([
    {
      id: "DOC001",
      name: "Dr. Sarah Wilson",
      specialization: "Cardiology",
      panelStatus: "Active",
    },
    {
      id: "DOC002",
      name: "Dr. Michael Chen",
      specialization: "Orthopedics",
      panelStatus: "Active",
    },
    {
      id: "DOC003",
      name: "Dr. Emily Brown",
      specialization: "Pediatrics",
      panelStatus: "Active",
    },
  ]);

  const onFinish = (values) => {
    const newDoctor = {
      id: `DOC${String(doctors.length + 1).padStart(3, "0")}`,
      name: values.name,
      specialization: values.specialization,
      panelStatus: "Active",
    };
    setDoctors([...doctors, newDoctor]);
    message.success("Doctor added to panel successfully!");
    form.resetFields();
  };

  const handleRemoveDoctor = (doctor) => {
    Modal.confirm({
      title: "Remove Doctor",
      content: `Are you sure you want to remove ${doctor.name} from the panel?`,
      onOk() {
        setDoctors(doctors.filter((d) => d.id !== doctor.id));
        message.success("Doctor removed from panel successfully!");
      },
    });
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card title="Add Doctor to Panel" className="max-w-3xl mx-auto">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Doctor Name"
              name="name"
              rules={[{ required: true, message: "Please input doctor name!" }]}
            >
              <Input placeholder="Enter doctor name" />
            </Form.Item>

            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[
                { required: true, message: "Please input specialization!" },
              ]}
            >
              <Input placeholder="Enter specialization" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="w-full md:w-auto"
            >
              Add to Panel
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Doctor Panel List" className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Search
            placeholder="Search doctors by name or specialization"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <List
          itemLayout="horizontal"
          dataSource={filteredDoctors}
          renderItem={(doctor) => (
            <List.Item
              actions={[
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveDoctor(doctor)}
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={doctor.name}
                description={
                  <div>
                    <p>ID: {doctor.id}</p>
                    <p>Specialization: {doctor.specialization}</p>
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

export default DoctorPanels;
