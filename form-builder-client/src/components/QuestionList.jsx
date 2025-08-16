import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import SortableItem from "./SortableItem";

const QuestionList = ({ questions, onRemoveQuestion, onUpdateQuestion }) => {
  const questionIds = questions.map((q) => q.id);

  return (
    <SortableContext items={questionIds} strategy={verticalListSortingStrategy}>
      <div className="space-y-6">
        <AnimatePresence>
          {questions.map((q) => (
            <SortableItem
              key={q.id}
              question={q}
              onRemove={() => onRemoveQuestion(q.id)}
              onUpdate={(newData) => onUpdateQuestion(q.id, newData)}
            />
          ))}
        </AnimatePresence>
      </div>
    </SortableContext>
  );
};

export default QuestionList;
