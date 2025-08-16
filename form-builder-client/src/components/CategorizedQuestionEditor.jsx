import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import Input from "./Input";

const CategorizeQuestionEditor = ({ data = {}, onUpdate }) => {
  const [title, setTitle] = useState(data.title || "");
  const [categories, setCategories] = useState(data.categories || []);
  const [items, setItems] = useState(data.items || []);

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    onUpdate({ title, categories, items });
  }, [title, categories, items]);

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem.trim() }]);
      setNewItem("");
    }
  };

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));
  const removeCategory = (cat) =>
    setCategories(categories.filter((c) => c !== cat));

  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Question Title"
      />

      <div className="p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {cat}
              <button
                onClick={() => removeCategory(cat)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold mb-2">Items</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {items.map((item) => (
            <span
              key={item.id}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {item.text}
              <button
                onClick={() => removeItem(item.id)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item"
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorizeQuestionEditor;
