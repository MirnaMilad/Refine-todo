import { useUpdate } from "@refinedev/core";

export default function TodoEdit({ id, is_done }: any) {
  const { mutate } = useUpdate();
  return (
    <button
      onClick={() =>
        mutate({ resource: "todos", id, values: { is_done: !is_done } })
      }
    >
      Toggle
    </button>
  );
}
