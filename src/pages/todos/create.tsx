import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

export default function TodoCreate() {
  const { formProps, saveButtonProps } = useForm({ resource: "todos" });

  return (
    <Create saveButtonProps={saveButtonProps} title="Add Todo">
      <Form {...formProps} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="e.g., Buy milk" />
        </Form.Item>
        <Form.Item
          name="is_done"
          label="Done?"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}