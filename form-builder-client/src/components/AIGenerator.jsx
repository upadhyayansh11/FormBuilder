import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

const AIGenerator = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState("");

  const handleGenerateClick = () => {
    console.log("AIGenerator button clicked!");

    if (topic.trim()) {
      onGenerate(topic);
    } else {
      console.log("Topic is empty, not generating.");
    }
  };

  return (
    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h3 className="font-bold text-md mb-2 flex items-center text-indigo-800">
        <Sparkles size={18} className="mr-2" />
        Generate with AI
      </h3>
      <p className="text-xs text-indigo-600 mb-3">
        Enter a topic and let AI create questions for you.
      </p>
      <div className="space-y-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Coffee shop feedback"
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateClick}
          disabled={isLoading || !topic.trim()}
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>
      </div>
    </div>
  );
};

export default AIGenerator;
