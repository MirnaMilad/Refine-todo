import { Create } from "@refinedev/antd";
import { useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Invited", value: "invited" },
  { label: "Blocked", value: "blocked" },
];

const TYPE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Viewer", value: "viewer" },
];

export default function UsersCreate() {
  const { formProps, saveButtonProps } = useForm({
    resource: "users",
  });

  return (
    <Create saveButtonProps={saveButtonProps} title="Add User">
      <Form {...formProps} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue="invited">
          <Select options={STATUS_OPTIONS} />
        </Form.Item>
        <Form.Item name="type" label="Type" initialValue="member">
          <Select options={TYPE_OPTIONS} />
        </Form.Item>
      </Form>
    </Create>
  );
}
