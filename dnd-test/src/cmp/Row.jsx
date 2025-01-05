import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Row({ id, tableName, row }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const isInvisible = id === "invisible-top" || id === "invisible-bottom";

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="row">
      <td className='tableName'>{tableName}</td>
      <td className='text'>{row.text}</td>
      <td className='number'>{row.number}</td>
    </tr>
  );
}