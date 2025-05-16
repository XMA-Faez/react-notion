"use client";
import React from "react";
import { ChevronDown, ChevronRight, Share2, MessageSquare } from "lucide-react";

interface PageHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  currentPage: { title: string; icon: string };
  setShowComments: (show: boolean) => void;
  showComments: boolean;
  colors: any;
  styles: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  currentPage,
  setShowComments,
  showComments,
  colors,
  styles
}) => {
  return (
    <div style={styles.header}>
      <div style={styles.breadcrumbs}>
        <span style={{...styles.pageIcon, cursor: "pointer"}} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </span>
        <span>XMA Agency</span>
        <span>/</span>
        <span style={{fontWeight: "500"}}>{currentPage.title}</span>
      </div>
      
      <div style={styles.headerActions}>
        <button 
          style={{
            padding: "6px 12px",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: colors.text,
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <Share2 size={14} />
          Share
        </button>
        
        <button 
          style={{
            padding: "6px 12px",
            backgroundColor: showComments ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.05)",
            color: showComments ? colors.accent : colors.text,
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          onClick={() => setShowComments(!showComments)}
          className="comments-button"
        >
          <MessageSquare size={14} />
          Comments
        </button>
        
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          CM
        </div>
      </div>
    </div>
  );
};

export default PageHeader;