import React from "react";
import { Trash2 } from "lucide-react";

import CategorizeQuestionEditor from "./CategorizedQuestionEditor";
import ClozeQuestionEditor from "./ClozeQuestionEditor";
import ComprehensionQuestionEditor from "./ComprehensionQuestionEditor";

const QuestionEditor = ({ question, onRemove, onUpdate }) => {
  const renderQuestionType = () => {
    switch (question.type || question.questionType) {
      case "Categorize":
        return (
          <CategorizeQuestionEditor data={question.data} onUpdate={onUpdate} />
        );
      case "Cloze":
        return <ClozeQuestionEditor data={question.data} onUpdate={onUpdate} />;
      case "Comprehension":
        return (
          <ComprehensionQuestionEditor
            data={question.data}
            onUpdate={onUpdate}
          />
        );
      default:
        console.error("Unsupported or malformed question received:", question);
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative group">
      <button
        onClick={() => onRemove(question.id)}
        className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 z-10"
      >
        <Trash2 size={16} />
      </button>
      {renderQuestionType()}
    </div>
  );
};

export default QuestionEditor;
