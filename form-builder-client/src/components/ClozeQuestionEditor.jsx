import React, { useState, useEffect } from "react";
import Input from "./Input";

const ClozeQuestionEditor = ({ data = {}, onUpdate }) => {
  const [title, setTitle] = useState(data.title || "");
  const [sentence, setSentence] = useState(data.sentence || "");

  useEffect(() => {
    onUpdate({ title, sentence });
  }, [title, sentence]);

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
          Sentence
        </label>
        <textarea
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows="4"
          placeholder="Enter sentence..."
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          Use double underscores to create blanks, e.g., `The quick brown
          __fox__`.
        </p>
      </div>
    </div>
  );
};

export default ClozeQuestionEditor;
