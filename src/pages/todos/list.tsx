import { List } from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export default function TodoList() {
  const { tableProps } = useTable({
    resource: "todos",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="is_done"
          title="Done?"
          render={(value: boolean) => (value ? "✅" : "❌")}
        />
        <Table.Column dataIndex="inserted_at" title="Created At" />
      </Table>
    </List>
  );
}
