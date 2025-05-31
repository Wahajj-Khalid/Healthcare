import React, { useState } from "react";
import { Card, Select, DatePicker, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const { RangePicker } = DatePicker;
const { Option } = Select;

const StatisticalReports = () => {
  const [department, setDepartment] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  // Chart configurations
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Chart data
  const patientData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Patients",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#129990",
      },
      {
        label: "Follow-ups",
        data: [45, 50, 60, 65, 45, 50],
        backgroundColor: "#90D1CA",
      },
    ],
  };

  const insuranceData = {
    labels: ["Private", "Medicare", "Medicaid", "Self-Pay"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#129990", "#90D1CA", "#096B68", "#FFFBDE"],
        borderColor: ["#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const departmentData = {
    labels: [
      "Cardiology",
      "Orthopedics",
      "Pediatrics",
      "Neurology",
      "Oncology",
    ],
    datasets: [
      {
        label: "Patient Distribution",
        data: [300, 250, 200, 150, 100],
        backgroundColor: "#129990",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <Card title="Report Filters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            placeholder="Select Department"
            className="w-full"
            onChange={setDepartment}
            defaultValue="all"
          >
            <Option value="all">All Departments</Option>
            <Option value="cardiology">Cardiology</Option>
            <Option value="orthopedics">Orthopedics</Option>
            <Option value="pediatrics">Pediatrics</Option>
            <Option value="neurology">Neurology</Option>
            <Option value="oncology">Oncology</Option>
          </Select>
          <RangePicker
            className="w-full"
            onChange={(dates) => setDateRange(dates)}
          />
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Patient Visits Trend">
            <div className="chart-container" style={{ height: "400px" }}>
              <Bar data={patientData} options={options} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Insurance Distribution">
            <div className="chart-container" style={{ height: "400px" }}>
              <Pie data={insuranceData} options={pieOptions} />
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Department-wise Patient Distribution">
        <div className="chart-container" style={{ height: "400px" }}>
          <Bar data={departmentData} options={options} />
        </div>
      </Card>

      <Card title="Key Metrics" className="text-center">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="p-4 bg-[#FFFBDE] rounded-lg">
              <h3 className="text-xl font-bold text-[#129990]">2,500</h3>
              <p>Total Patients</p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="p-4 bg-[#FFFBDE] rounded-lg">
              <h3 className="text-xl font-bold text-[#129990]">85%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="p-4 bg-[#FFFBDE] rounded-lg">
              <h3 className="text-xl font-bold text-[#129990]">45 mins</h3>
              <p>Avg. Wait Time</p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="p-4 bg-[#FFFBDE] rounded-lg">
              <h3 className="text-xl font-bold text-[#129990]">98%</h3>
              <p>Insurance Claims</p>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StatisticalReports;
