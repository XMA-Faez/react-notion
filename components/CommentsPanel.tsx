"use client";
import React from "react";
import { X } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
  mentions?: string[];
}

interface CommentsPanelProps {
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  comments: Comment[];
  commentsRef: React.RefObject<HTMLDivElement>;
  colors: any;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({
  showComments,
  setShowComments,
  comments,
  commentsRef,
  colors
}) => {
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
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} style={{
              padding: "12px",
              borderBottom: `1px solid ${colors.border}`,
              marginBottom: "8px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px"
              }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px"
                }}>
                  {comment.user.substring(0, 2)}
                </div>
                <div style={{fontWeight: "500", fontSize: "14px"}}>{comment.user}</div>
                <div style={{fontSize: "12px", color: colors.textSecondary, marginLeft: "auto"}}>
                  {comment.timestamp}
                </div>
              </div>
              
              <div style={{fontSize: "14px", paddingLeft: "32px"}}>
                {comment.text.split(' ').map((word, i) => 
                  word.startsWith('@') ? 
                    <span key={i} style={{color: colors.accent, fontWeight: "500"}}>{word} </span> : 
                    word + ' '
                )}
              </div>
              
              <div style={{
                display: "flex", 
                gap: "12px", 
                paddingLeft: "32px", 
                marginTop: "8px", 
                fontSize: "12px",
                color: colors.textSecondary
              }}>
                <span style={{cursor: "pointer"}}>Reply</span>
                <span style={{cursor: "pointer"}}>React</span>
                <span style={{cursor: "pointer"}}>Resolve</span>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            color: colors.textSecondary, 
            fontSize: "14px", 
            textAlign: "center", 
            marginTop: "40px" 
          }}>
            No comments yet
          </div>
        )}
      </div>

      <div style={{ padding: "16px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{
          padding: "8px 12px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
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