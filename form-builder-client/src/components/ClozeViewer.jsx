import React, { useState, useEffect } from "react";

const ClozeViewer = ({ question, onAnswerChange }) => {
  const { data, _id: questionId } = question;
  const [blanks, setBlanks] = useState({});

  useEffect(() => {
    onAnswerChange(questionId, blanks);
  }, [blanks, questionId, onAnswerChange]);

  const handleInputChange = (index, value) => {
    setBlanks((prev) => ({ ...prev, [`blank_${index}`]: value }));
  };

  let blankIndex = 0;
  const parts = data.sentence.split(/(__.*?__)/g).map((part, i) => {
    if (part.startsWith("__") && part.endsWith("__")) {
      const currentIndex = blankIndex;
      blankIndex++;
      return (
        <input
          key={i}
          className="border-b-2 border-gray-400 focus:border-indigo-500 outline-none w-24 mx-1 bg-transparent"
          onChange={(e) => handleInputChange(currentIndex, e.target.value)}
        />
      );
    }
    return part;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
      <p className="text-gray-700 leading-8">{parts}</p>
    </div>
  );
};

export default ClozeViewer;
