import React, { useState } from "react";
import {
  Calendar,
  Card,
  TimePicker,
  Form,
  Input,
  Button,
  Select,
  Table,
  Modal,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const AppointmentScheduling = () => {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      key: "1",
      patient: "John Doe",
      doctor: "Dr. Sarah Wilson",
      date: "2024-03-20",
      time: "09:00",
      type: "General Checkup",
      status: "Scheduled",
    },
    {
      key: "2",
      patient: "Jane Smith",
      doctor: "Dr. Michael Chen",
      date: "2024-03-20",
      time: "10:30",
      type: "Follow-up",
      status: "Scheduled",
    },
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
    setEditingAppointment(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingAppointment(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      time: dayjs(record.time, "HH:mm"),
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Cancel Appointment",
      content: "Are you sure you want to cancel this appointment?",
      onOk() {
        setAppointments(appointments.filter((apt) => apt.key !== record.key));
        message.success("Appointment cancelled successfully");
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        date: selectedDate?.format("YYYY-MM-DD") || editingAppointment?.date,
        time: values.time.format("HH:mm"),
        key: editingAppointment?.key || String(appointments.length + 1),
        status: "Scheduled",
      };

      if (editingAppointment) {
        setAppointments(
          appointments.map((apt) =>
            apt.key === editingAppointment.key ? formattedValues : apt
          )
        );
        message.success("Appointment updated successfully");
      } else {
        setAppointments([...appointments, formattedValues]);
        message.success("Appointment scheduled successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const dateCellRender = (date) => {
    const dayAppointments = appointments.filter(
      (apt) => apt.date === date.format("YYYY-MM-DD")
    );
    return (
      <ul className="events">
        {dayAppointments.map((apt) => (
          <li key={apt.key} className="text-xs text-[#129990]">
            {apt.time} - {apt.patient}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <Card title="Calendar">
        <Calendar onSelect={handleDateSelect} cellRender={dateCellRender} />
      </Card>

      <Card title="Appointments">
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedDate(dayjs());
              setIsModalVisible(true);
              setEditingAppointment(null);
              form.resetFields();
            }}
          >
            New Appointment
          </Button>
        </div>
        <Table columns={columns} dataSource={appointments} />
      </Card>

      <Modal
        title={editingAppointment ? "Edit Appointment" : "New Appointment"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="patient"
            label="Patient Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="doctor" label="Doctor" rules={[{ required: true }]}>
            <Select>
              <Option value="Dr. Sarah Wilson">Dr. Sarah Wilson</Option>
              <Option value="Dr. Michael Chen">Dr. Michael Chen</Option>
              <Option value="Dr. Emily Brown">Dr. Emily Brown</Option>
            </Select>
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Appointment Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="General Checkup">General Checkup</Option>
              <Option value="Follow-up">Follow-up</Option>
              <Option value="Consultation">Consultation</Option>
              <Option value="Emergency">Emergency</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentScheduling;
