import React from "react";
import { Form, Input, Button, Card, InputNumber, message } from "antd";

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Profile updated successfully!");
  };

  return (
    <Card title="Doctor Profile" className="max-w-3xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          specialization: "Cardiology",
          licenseNumber: "MD12345",
          yearsExperience: 10,
          address: "123 Medical Center Dr, Healthcare City, HC 12345",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[
              { required: true, message: "Please input your specialization!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="License Number"
            name="licenseNumber"
            rules={[
              { required: true, message: "Please input your license number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Years of Experience"
            name="yearsExperience"
            rules={[
              {
                required: true,
                message: "Please input your years of experience!",
              },
            ]}
          >
            <InputNumber min={0} max={50} className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full md:w-auto">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Profile;
