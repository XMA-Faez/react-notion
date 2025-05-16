"use client";
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface CommentsPanelProps {
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({ 
  showComments, 
  setShowComments 
}) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  
  // Colors
  const colors = {
    background: "#111111",
    surface: "#222222",
    accent: "#EF4444",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "rgba(255,255,255,0.1)",
  };
  
  // Handle click outside of comments panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showComments && 
        commentsRef.current && 
        !commentsRef.current.contains(event.target as Node) && 
        !(event.target as Element).closest(".comments-button")
      ) {
        setShowComments(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComments, setShowComments]);
  
  if (!showComments) return null;
  
  return (
    <div 
      ref={commentsRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        backgroundColor: colors.background,
        borderLeft: `1px solid ${colors.border}`,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        padding: "16px",
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ fontWeight: "500", fontSize: "16px" }}>Comments</div>
        <div 
          style={{
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: colors.textSecondary,
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          }}
          onClick={() => setShowComments(false)}
        >
          <X size={16} />
        </div>
      </div>

      <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
        <div style={{ color: colors.textSecondary, fontSize: "14px", textAlign: "center", marginTop: "40px" }}>
          No comments yet
        </div>
      </div>

      <div style={{ padding: "16px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{
          padding: "8px 12px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "4px",
          color: colors.textSecondary,
          fontSize: "14px",
          cursor: "text",
        }}>
          Add a comment...
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;