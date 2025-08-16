import React, { useState, useEffect } from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-2 rounded-md shadow-sm border cursor-grab touch-none"
    >
      {text}
    </div>
  );
};

const DroppableCategory = ({ id, title, items }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "#eef2ff" : "#f9fafb",
    borderColor: isOver ? "#818cf8" : "#e5e7eb",
  };

  return (
    <div className="flex-1 flex flex-col">
      <h4 className="font-semibold text-center mb-2 text-gray-700">{title}</h4>
      <div
        ref={setNodeRef}
        style={style}
        className="min-h-[150px] bg-gray-50 border-2 border-dashed rounded-lg p-3 space-y-2 transition-colors"
      >
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} text={item.text} />
        ))}
      </div>
    </div>
  );
};

const CategorizeViewer = ({ question, onAnswerChange }) => {
  const { data = {}, _id: questionId } = question;
  const rawItems = data.items || [];
  const categories = data.categories || [];
  const title = data.title || "Categorize Question";

  const normalizedItems = rawItems.map((item) => {
    if (typeof item === "string") {
      return { id: item, text: item };
    }
    if (item && typeof item === "object") {
      const text = Object.values(item)
        .filter((v) => typeof v === "string")
        .join("");
      return { id: item.id || text, text };
    }
    return { id: String(item), text: String(item) };
  });

  const [itemPlacements, setItemPlacements] = useState(() => {
    const initialPlacements = { unassigned: normalizedItems };
    categories.forEach((cat) => {
      initialPlacements[cat] = [];
    });
    return initialPlacements;
  });

  useEffect(() => {
    if (typeof onAnswerChange === "function") {
      const finalAnswers = { ...itemPlacements };
      delete finalAnswers.unassigned;
      onAnswerChange(questionId, finalAnswers);
    }
  }, [itemPlacements, questionId, onAnswerChange]);

  const handleDragEnd = ({ active, over }) => {
    if (over) {
      setItemPlacements((prev) => {
        const newPlacements = JSON.parse(JSON.stringify(prev));
        let draggedItem = null;

        for (const category in newPlacements) {
          const itemIndex = newPlacements[category].findIndex(
            (item) => item.id === active.id
          );
          if (itemIndex > -1) {
            [draggedItem] = newPlacements[category].splice(itemIndex, 1);
            break;
          }
        }

        if (draggedItem) {
          newPlacements[over.id].push(draggedItem);
        }

        return newPlacements;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4">
            <DroppableCategory
              id="unassigned"
              title="Items"
              items={itemPlacements.unassigned}
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {categories.map((cat) => (
              <DroppableCategory
                key={cat}
                id={cat}
                title={cat}
                items={itemPlacements[cat]}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default CategorizeViewer;

// import React, { useState, useEffect } from "react";
// import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";

// // 🟢 Draggable Item
// const DraggableItem = ({ id, text }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } =
//     useDraggable({ id });
//   const style = {
//     transform: CSS.Translate.toString(transform),
//     opacity: isDragging ? 0.5 : 1,
//     zIndex: isDragging ? 10 : "auto",
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className="bg-white p-2 rounded-md shadow-sm border cursor-grab touch-none"
//     >
//       {text}
//     </div>
//   );
// };

// // 🟢 Droppable Category
// const DroppableCategory = ({ id, title, items }) => {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const style = {
//     backgroundColor: isOver ? "#eef2ff" : "#f9fafb",
//     borderColor: isOver ? "#818cf8" : "#e5e7eb",
//   };

//   return (
//     <div className="flex-1 flex flex-col">
//       <h4 className="font-semibold text-center mb-2 text-gray-700">{title}</h4>
//       <div
//         ref={setNodeRef}
//         style={style}
//         className="min-h-[150px] bg-gray-50 border-2 border-dashed rounded-lg p-3 space-y-2 transition-colors"
//       >
//         {items.map((item) => (
//           <DraggableItem key={item.id} id={item.id} text={item.text} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // 🟢 Main Viewer
// const CategorizeViewer = ({ question, onAnswerChange }) => {
//   const { data = {}, _id: questionId, id: qId } = question;

//   // Normalize funky AI items into { id, text }
//   const normalizeItems = (rawItems = []) =>
//     rawItems.map((item) => {
//       if (typeof item === "object" && !item.text) {
//         // AI gives {0:'M',1:'a',...} → join into "Mars"
//         const text = Object.values(item)
//           .filter((v) => typeof v === "string")
//           .join("");
//         return { id: item.id || Date.now() + Math.random(), text };
//       }
//       return item.text
//         ? item
//         : { id: item.id || Date.now(), text: String(item) };
//     });

//   const items = normalizeItems(data.items);
//   const categories = data.categories || [];
//   const title = data.title || "Categorize Question";

//   // Initial placements
//   const [itemPlacements, setItemPlacements] = useState(() => {
//     const initialPlacements = { unassigned: items };
//     categories.forEach((cat) => {
//       initialPlacements[cat] = [];
//     });
//     return initialPlacements;
//   });

//   // Report back answers
//   useEffect(() => {
//     if (typeof onAnswerChange === "function") {
//       const finalAnswers = { ...itemPlacements };
//       delete finalAnswers.unassigned;
//       onAnswerChange(questionId || qId, finalAnswers);
//     }
//   }, [itemPlacements, questionId, qId, onAnswerChange]);

//   // Handle drag-drop
//   const handleDragEnd = ({ active, over }) => {
//     if (over) {
//       setItemPlacements((prev) => {
//         const newPlacements = JSON.parse(JSON.stringify(prev)); // deep copy
//         let draggedItem = null;

//         // Remove from old category
//         for (const category in newPlacements) {
//           const idx = newPlacements[category].findIndex(
//             (item) => item.id === active.id
//           );
//           if (idx > -1) {
//             [draggedItem] = newPlacements[category].splice(idx, 1);
//             break;
//           }
//         }

//         // Add to new category
//         if (draggedItem) {
//           newPlacements[over.id].push(draggedItem);
//         }

//         return newPlacements;
//       });
//     }
//   };

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       <div className="bg-white p-6 rounded-lg shadow-sm border">
//         <h3 className="text-xl font-semibold mb-4">{title}</h3>
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Unassigned bucket */}
//           <div className="md:w-1/4">
//             <DroppableCategory
//               id="unassigned"
//               title="Items"
//               items={itemPlacements.unassigned}
//             />
//           </div>

//           {/* Categories */}
//           <div className="flex-1 flex flex-col md:flex-row gap-4">
//             {categories.map((cat) => (
//               <DroppableCategory
//                 key={cat}
//                 id={cat}
//                 title={cat}
//                 items={itemPlacements[cat]}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </DndContext>
//   );
// };

// export default CategorizeViewer;
