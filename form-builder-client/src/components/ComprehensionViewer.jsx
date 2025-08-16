import React, { useState, useEffect } from "react";

const ComprehensionViewer = ({ question, onAnswerChange }) => {
  const { data, _id: questionId } = question;
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    onAnswerChange(questionId, answers);
  }, [answers, questionId, onAnswerChange]);

  const handleOptionChange = (mcqId, value) => {
    setAnswers((prev) => ({ ...prev, [mcqId]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold mb-4">{data.title}</h3>
      <div className="prose max-w-none p-4 bg-gray-50 rounded-md mb-4">
        <p>{data.passage}</p>
      </div>
      <div className="space-y-4">
        {data.mcqs.map((mcq) => (
          <div key={mcq.id || mcq._id}>
            <p className="font-semibold">{mcq.question}</p>
            <div className="mt-2 space-y-1">
              {mcq.options.map((opt, i) => (
                <label key={i} className="flex items-center">
                  <input
                    type="radio"
                    name={mcq.id || mcq._id}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(mcq.id || mcq._id, e.target.value)
                    }
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComprehensionViewer;
