import React from "react";
import { Form, Input, Select, Button, Card, Typography, message } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Profile values:", values);
    message.success("Profile updated successfully!");
  };

  const initialValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    gender: "male",
    bloodGroup: "O+",
    age: "30",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-md">
        <Title level={2} className="text-[#129990] mb-6">
          Profile Information
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="bloodGroup"
              label="Blood Group"
              rules={[
                { required: true, message: "Please select your blood group" },
              ]}
            >
              <Select size="large">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <Input size="large" type="number" />
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ background: "#129990" }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
