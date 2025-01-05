import { Row } from "./Row.jsx";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export function Table({ table, activeRow }) {
  return (
    <section className="table">
      <h4>{`Table ${table.tableName}`}</h4>
      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>Text</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <SortableContext
            items={table.rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            {table.rows.map((row) => {
              // Render an empty row if it's the active row
              if (activeRow && activeRow.id === row.id) {
                return (
                  <tr
                    key={row.id}
                    style={{ height: "40px", visibility: "hidden" }} // Adjust height to match your row height
                  ></tr>
                );
              }
              return (
                <Row
                  key={row.id}
                  id={row.id}
                  tableName={table.tableName}
                  row={row}
                />
              );
            })}
          </SortableContext>
        </tbody>
      </table>
    </section>
  );
}