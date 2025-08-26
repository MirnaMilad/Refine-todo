import {
  List,
  EditButton,
  DeleteButton,
  CreateButton,
  useTable,
} from "@refinedev/antd";
import { Table, Form, Input, Select, Space } from "antd";
import { HttpError, useNavigation } from "@refinedev/core";

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

export default function UsersList() {
  const { show } = useNavigation();

  // useTable wires sorting + pagination to Supabase provider
  const { tableProps, filters, setFilters } = useTable<
    any,
    HttpError,
    {
      q?: string;
      status?: string;
      type?: string;
    }
  >({
    resource: "users",
    initialSorter: [{ field: "inserted_at", order: "desc" }],
    initialPageSize: 10,
    // map our search form to refine filters
    onSearch: (values) => {
      const { q, status, type } = values;
      return [
        // text search on name OR email (Supabase: ilike)
        q ? { field: "name", operator: "ilike", value: `%${q}%` } : undefined,
        q ? { field: "email", operator: "ilike", value: `%${q}%` } : undefined,
        status ? { field: "status", operator: "eq", value: status } : undefined,
        type ? { field: "type", operator: "eq", value: type } : undefined,
      ].filter(Boolean) as any;
    },
  });

  // simple filter form above the table
  const [form] = Form.useForm();
  return (
    <List
      headerProps={{
        extra: <CreateButton>New User</CreateButton>,
      }}
    >
      <Form
        form={form}
        layout="inline"
        onFinish={() => setFilters(form.getFieldsValue(), "replace")}
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="q">
          <Input allowClear placeholder="Search name or email" />
        </Form.Item>
        <Form.Item name="status">
          <Select
            allowClear
            placeholder="Status"
            options={STATUS_OPTIONS}
            style={{ minWidth: 140 }}
          />
        </Form.Item>
        <Form.Item name="type">
          <Select
            allowClear
            placeholder="Type"
            options={TYPE_OPTIONS}
            style={{ minWidth: 140 }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <button className="ant-btn ant-btn-primary" type="submit">
              Filter
            </button>
            <button
              className="ant-btn"
              type="button"
              onClick={() => {
                form.resetFields();
                setFilters([], "replace"); // <-- use [] not {}
              }}
            >
              Reset
            </button>
          </Space>
        </Form.Item>
      </Form>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="type" title="Type" />
        <Table.Column dataIndex="inserted_at" title="Created" />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <EditButton size="small" hideText recordItemId={record.id} />
              <DeleteButton size="small" hideText recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
