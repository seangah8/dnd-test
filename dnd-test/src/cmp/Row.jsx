import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Row({ id, tableName, row }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const isInvisible = id === "invisible-top" || id === "invisible-bottom";

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    height: isInvisible ? "0px" : undefined,
    visibility: isInvisible ? "hidden" : undefined,
    background: isInvisible ? "none" : undefined,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="row">
      <td>{tableName}</td>
      <td>{row.text}</td>
      <td>{row.number}</td>
    </tr>
  );
}
