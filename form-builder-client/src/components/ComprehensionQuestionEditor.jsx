import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import Input from "./Input";

const ComprehensionQuestionEditor = ({ data = {}, onUpdate }) => {
  const [title, setTitle] = useState(data.title || "");
  const [passage, setPassage] = useState(data.passage || "");
  const [mcqs, setMcqs] = useState(data.mcqs || []);

  useEffect(() => {
    onUpdate({ title, passage, mcqs });
  }, [title, passage, mcqs]);

  const addMcq = () => {
    setMcqs([
      ...mcqs,
      { id: Date.now(), question: "", options: ["", ""], answer: "" },
    ]);
  };

  const removeMcq = (id) => {
    setMcqs(mcqs.filter((m) => m.id !== id));
  };

  const updateMcq = (id, field, value) => {
    setMcqs(mcqs.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const updateMcqOption = (mcqId, optionIndex, value) => {
    setMcqs(
      mcqs.map((m) => {
        if (m.id === mcqId) {
          const newOptions = [...m.options];
          newOptions[optionIndex] = value;
          return { ...m, options: newOptions };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Question Title"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Passage
        </label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows="6"
          placeholder="Enter passage..."
        ></textarea>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold mb-2">Questions for Passage</h3>
        <div className="space-y-4">
          {mcqs.map((mcq, index) => (
            <div key={mcq.id} className="p-3 bg-white rounded border relative">
              <button
                onClick={() => removeMcq(mcq.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
              <Input
                value={mcq.question}
                onChange={(e) => updateMcq(mcq.id, "question", e.target.value)}
                placeholder={`Question ${index + 1}`}
                className="mb-2"
              />
              <div className="space-y-1">
                {mcq.options.map((opt, i) => (
                  <Input
                    key={i}
                    value={opt}
                    onChange={(e) => updateMcqOption(mcq.id, i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addMcq}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 text-sm flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Question
        </button>
      </div>
    </div>
  );
};

export default ComprehensionQuestionEditor;
