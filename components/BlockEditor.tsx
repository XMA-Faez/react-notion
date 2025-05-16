"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";

interface Block {
  id: number;
  content: string;
  type: string;
}

interface BlockEditorProps {
  title?: string;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ title, blocks, setBlocks }) => {
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
  
  // Colors
  const colors = {
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
  };
  
  const handleBlockClick = (id: number) => {
    setEditingBlockId(id);
  };
  
  const handleBlockChange = (id: number, newContent: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content: newContent } : block
    ));
  };

  const addNewBlock = () => {
    const newId = Math.max(...blocks.map(b => b.id), 0) + 1;
    setBlocks([...blocks, { id: newId, content: "New block", type: "paragraph" }]);
    setEditingBlockId(newId);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      {title && (
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
          {title}
        </h1>
      )}
      
      {blocks.map(block => (
        <div 
          key={block.id} 
          style={{
            marginBottom: "12px",
            padding: "8px",
            borderRadius: "4px",
            cursor: "text",
            ...(editingBlockId === block.id ? { backgroundColor: "rgba(255, 255, 255, 0.05)" } : {})  
          }}
          onClick={() => handleBlockClick(block.id)}
        >
          {editingBlockId === block.id ? (
            <textarea
              value={block.content}
              onChange={(e) => handleBlockChange(block.id, e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: colors.text,
                fontFamily: block.type === "heading" ? "\"Inter\", sans-serif" : "\"Inter\", sans-serif",
                fontSize: block.type === "heading" ? "24px" : "16px",
                fontWeight: block.type === "heading" ? "bold" : "normal",
                lineHeight: "1.5",
                padding: "0",
                margin: "0",
                resize: "none",
              }}
              autoFocus
              onBlur={() => setEditingBlockId(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setEditingBlockId(null);
                }
              }}
            />
          ) : (
            <div style={{
              fontFamily: block.type === "heading" ? "\"Inter\", sans-serif" : "\"Inter\", sans-serif",
              fontSize: block.type === "heading" ? "24px" : "16px",
              fontWeight: block.type === "heading" ? "bold" : "normal",
              lineHeight: "1.5",
            }}>
              {block.content}
            </div>
          )}
        </div>
      ))}
      
      {/* Add new block button */}
      <div 
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: colors.textSecondary,
          fontSize: "14px",
          cursor: "pointer",
        }}
        onClick={addNewBlock}
      >
        <Plus size={16} />
        <span>Add a block</span>
      </div>
    </div>
  );
};

export default BlockEditor;