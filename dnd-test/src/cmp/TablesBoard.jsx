import { Table } from "./Table.jsx"
import { useState } from "react"

import { closestCorners, DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export function TablesBoard() {
  
  // storage
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

  
  const onDragEnd = (event) => {
    console.log(event)
    const { active, over } = event
  
    if (!over || active.id === over.id) return
  
    const sourceTable = tables.find(table =>
      table.rows.some(row => row.id === active.id))
  
    const destinationTable = tables.find(table =>
      table.rows.some(row => row.id === over.id))

    if(sourceTable && destinationTable){

      // Dragging within the same table
      if(sourceTable.tableName === destinationTable.tableName){

        const sourceTableIndex = tables.findIndex(
          table => table.tableName === sourceTable.tableName)

        const oldRowIndex = sourceTable.rows.findIndex(row =>
           row.id === active.id)

        const newRowIndex = destinationTable.rows.findIndex(row =>
           row.id === over.id)
    
        setTables(prevTables =>
          prevTables.map((table, index) =>
            index === sourceTableIndex 
            ? {...table, rows: arrayMove(
              table.rows, oldRowIndex, newRowIndex)}
            : table
          )
        )
      }
    }
  }

  return (
    <div className="table-board">
      <h3>SAR Board</h3>
      {
        tables.map(table=>
          <DndContext 
          key={table.tableName}
          collisionDetection={closestCorners} 
          onDragEnd={onDragEnd}>

            <Table table={table} />

          </DndContext>
        )
      }
      
    </div>
  )
}

