import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Eligibility = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        status: "Approved",
        coverage: "Full Coverage",
        deductible: "$500",
        copay: "$20",
      };
      message.success("Eligibility check completed!");
      setEligibilityResult(mockResponse);
    }, 1000);
  };

  const [eligibilityResult, setEligibilityResult] = React.useState(null);

  return (
    <div className="space-y-6">
      <Card title="Insurance Eligibility Check" className="max-w-3xl mx-auto">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Patient ID"
              name="patientId"
              rules={[{ required: true, message: "Please input patient ID!" }]}
            >
              <Input placeholder="Enter patient ID" />
            </Form.Item>

            <Form.Item
              label="Insurance ID"
              name="insuranceId"
              rules={[
                { required: true, message: "Please input insurance ID!" },
              ]}
            >
              <Input placeholder="Enter insurance ID" />
            </Form.Item>

            <Form.Item
              label="Group Number"
              name="groupNumber"
              rules={[
                { required: true, message: "Please input group number!" },
              ]}
            >
              <Input placeholder="Enter group number" />
            </Form.Item>

            <Form.Item
              label="Provider ID"
              name="providerId"
              rules={[{ required: true, message: "Please input provider ID!" }]}
            >
              <Input placeholder="Enter provider ID" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full md:w-auto"
            >
              Check Eligibility
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {eligibilityResult && (
        <Card
          title="Eligibility Results"
          className="max-w-3xl mx-auto"
          extra={
            eligibilityResult.status === "Approved" ? (
              <CheckCircleOutlined className="text-[#129990] text-xl" />
            ) : (
              <CloseCircleOutlined className="text-[#FF7F50] text-xl" />
            )
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Status</p>
              <p
                className={`text-${
                  eligibilityResult.status === "Approved"
                    ? "[#129990]"
                    : "[#FF7F50]"
                }`}
              >
                {eligibilityResult.status}
              </p>
            </div>
            <div>
              <p className="font-semibold">Coverage</p>
              <p>{eligibilityResult.coverage}</p>
            </div>
            <div>
              <p className="font-semibold">Deductible</p>
              <p>{eligibilityResult.deductible}</p>
            </div>
            <div>
              <p className="font-semibold">Copay</p>
              <p>{eligibilityResult.copay}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Eligibility;
