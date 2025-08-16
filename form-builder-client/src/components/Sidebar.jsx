import React from "react";

import AIGenerator from "./AIGenerator";

const Sidebar = ({ onAddQuestion, onGenerate, isAiLoading }) => (
  <aside className="col-span-12 md:col-span-3 lg:col-span-2">
    <div className="sticky top-8">
      <h2 className="font-bold text-lg mb-4">Add Question</h2>
      <div className="space-y-3">
        <button
          onClick={() => onAddQuestion("Categorize")}
          className="w-full flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Categorize
        </button>
        <button
          onClick={() => onAddQuestion("Cloze")}
          className="w-full flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Cloze
        </button>
        <button
          onClick={() => onAddQuestion("Comprehension")}
          className="w-full flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Comprehension
        </button>
      </div>
      <AIGenerator onGenerate={onGenerate} isLoading={isAiLoading} />
    </div>
  </aside>
);

export default Sidebar;
