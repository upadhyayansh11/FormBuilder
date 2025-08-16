import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import QuestionEditor from "./QuestionEditor";

const SortableItem = ({ question, onRemove, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="relative"
    >
      <QuestionEditor
        question={question}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />

      <div
        {...attributes}
        {...listeners}
        className="absolute top-1/2 -left-8 -translate-y-1/2 p-2 text-gray-400 cursor-grab hover:text-gray-600 transition-colors"
      >
        <GripVertical />
      </div>
    </motion.div>
  );
};

export default SortableItem;
