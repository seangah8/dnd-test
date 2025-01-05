import { Table } from "./Table.jsx"
import { Row } from "./Row.jsx"
import { useState } from "react"

import { closestCorners, rectIntersection , DndContext, DragOverlay } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export function TablesBoard() {
  
  // Storage
  const [tables, setTables] = useState([
    { tableName: "SAR1",
      rows: [
        { id: 't1r1', text: "table1 row1 column1", number: 11 },
        { id: 't1r2', text: "table1 row2 column1", number: 12 },
        { id: 't1r3', text: "table1 row3 column1", number: 13 }
      ]
    },

    { tableName: "SAR2",
      rows: [
        { id: 't2r1', text: "table2 row1 column1", number: 21 },
        { id: 't2r2', text: "table2 row2 column1", number: 22 },
        { id: 't2r3', text: "table2 row3 column1", number: 23 }
      ]
    },

    { tableName: "SAR3",
      rows: [
        { id: 't3r1', text: "table3 row1 column1", number: 31 },
        { id: 't3r2', text: "table3 row2 column1", number: 32 },
        { id: 't3r3', text: "table3 row3 column1", number: 33 }
      ]
    },
  ])

  const [activeRow, setActiveRow] = useState(null) // the row you currently drag 

  const onDragStart = event => {
    const { active } = event
    const sourceTable = tables.find(table =>
      table.rows.some(row => row.id === active.id))

    if (sourceTable) {
      const activeRow = sourceTable.rows.find(row =>
         row.id === active.id)
      setActiveRow(activeRow)
    }
  }

  const onDragOver = event => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) return;
  
    const sourceTableIndex = tables.findIndex(table =>
      table.rows.some(row => row.id === active.id)
    );
  
    const destinationTableIndex = tables.findIndex(table =>
      table.rows.some(row => row.id === over.id)
    );
  
    if (sourceTableIndex !== -1 && destinationTableIndex !== -1) {
      const sourceRowIndex = tables[sourceTableIndex].rows.findIndex(
        row => row.id === active.id
      );
  
      const destinationRowIndex = tables[destinationTableIndex].rows.findIndex(
        row => row.id === over.id
      );
  
      // If the destination is the same table, let the current behavior handle it
      if (sourceTableIndex === destinationTableIndex) return;
  
      const movedRow = tables[sourceTableIndex].rows[sourceRowIndex];
  
      setTables(prevTables => {
        const newTables = [...prevTables];
  
        // Remove row from source table
        newTables[sourceTableIndex] = {
          ...newTables[sourceTableIndex],
          rows: newTables[sourceTableIndex].rows.filter(
            row => row.id !== active.id
          ),
        };
  
        // Insert row into destination table dynamically
        newTables[destinationTableIndex] = {
          ...newTables[destinationTableIndex],
          rows: [
            ...newTables[destinationTableIndex].rows.slice(0, destinationRowIndex),
            movedRow,
            ...newTables[destinationTableIndex].rows.slice(destinationRowIndex),
          ],
        };
  
        return newTables;
      });
    }
  };

  const onDragEnd = event => {
    console.log(event)
    const { active, over } = event
    setActiveRow(null) // Clear the active row when drag ends
  
    if (!over || active.id === over.id) return
  
    const sourceTableIndex = tables.findIndex(table =>
      table.rows.some(row => row.id === active.id))
  
    const destinationTableIndex = tables.findIndex(table =>
      table.rows.some(row => row.id === over.id))

    if (sourceTableIndex !== -1 && destinationTableIndex !== -1) {

      const sourceRowIndex = tables[sourceTableIndex].rows.findIndex(row =>
         row.id === active.id)

      const destinationRowIndex = tables[destinationTableIndex].rows.findIndex(row =>
         row.id === over.id)

      const movedRow = tables[sourceTableIndex].rows[sourceRowIndex]

      setTables(prevTables => {
        const newTables = [...prevTables]

        // Remove row from source table
        newTables[sourceTableIndex] = {
          ...newTables[sourceTableIndex],
          rows: newTables[sourceTableIndex].rows.filter(row => row.id !== active.id)
        }

        // Add row to destination table
        newTables[destinationTableIndex] = {
          ...newTables[destinationTableIndex],
          rows: [
            ...newTables[destinationTableIndex].rows.slice(0, destinationRowIndex),
            movedRow,
            ...newTables[destinationTableIndex].rows.slice(destinationRowIndex)
          ]
        }

        return newTables
      })
    }
  }

  return (
    <div className="table-board">
      <h3>SAR Board</h3>
      <DndContext
        key="table-board"
        collisionDetection={rectIntersection} // that thing that solve the bottom-top problem
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >

      {
        tables.map(table=>
          <Table key={table.tableName} table={table} activeRow={activeRow} />)
      }

      {/* DragOverlay */}
      <DragOverlay>
        {activeRow ? (
          <table>
            <tbody>
              <Row
                id={activeRow.id}
                tableName={'hello'}
                row={activeRow}/>
            </tbody>
          </table>
        ) : null}
      </DragOverlay>

      </DndContext>
    </div>
  )
}