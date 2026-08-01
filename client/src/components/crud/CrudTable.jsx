function CrudTable({
  columns,
  data,
  onEdit,
  onDelete,
}) {
  const showActions =
    typeof onEdit === "function" ||
    typeof onDelete === "function";

  const tableColumns = Array.isArray(columns)
    ? columns.map((column) =>
        typeof column === "string"
          ? { key: column, label: column }
          : column
      )
    : [];

  const tableData = Array.isArray(data) ? data : [];

  const renderCell = (item, column) => {
    switch (column.type) {
      case "link":
        return (
          <a
            href={item[column.key]}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open
          </a>
        );

      case "image":
        return (
          <img
            src={item[column.key]}
            alt=""
            className="h-14 w-14 rounded object-cover"
          />
        );

      case "badge":
        return (
          <span className="rounded bg-green-100 px-2 py-1 text-green-700">
            {item[column.key]}
          </span>
        );

      default:
        return item[column.key];
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            {tableColumns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left"
              >
                {column.label}
              </th>
            ))}

            {showActions && (
              <th className="px-4 py-3">
                Actions
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {tableData.length === 0 ? (

            <tr>

              <td
                colSpan={tableColumns.length + (showActions ? 1 : 0)}
                className="py-8 text-center text-gray-500"
              >
                No Records Found
              </td>

            </tr>

          ) : (

            tableData.map((item) => (

              <tr
                key={item._id || item.id || JSON.stringify(item)}
                className="border-t"
              >

                {tableColumns.map((column) => (

                  <td
                    key={column.key}
                    className="px-4 py-3"
                  >
                    {renderCell(item, column)}
                  </td>

                ))}

                {showActions && (
                  <td className="space-x-2 px-4 py-3">

                    {typeof onEdit === "function" && (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white"
                      >
                        Edit
                      </button>
                    )}

                    {typeof onDelete === "function" && (
                      <button
                        type="button"
                        onClick={() => onDelete(item._id || item.id)}
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Delete
                      </button>
                    )}

                  </td>
                )}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default CrudTable;