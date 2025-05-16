"use client";
import React from "react";
import {
  Database, Calendar, Filter, Plus,
  List as ListIcon, Trello
} from "lucide-react";

interface ViewSwitcherProps {
  viewType: string;
  setViewType: (viewType: string) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewType, setViewType }) => {
  // Colors
  const colors = {
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    accent: "#EF4444",
  };
  
  return (
    <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "4px", padding: "2px" }}>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: viewType === "table" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            color: viewType === "table" ? colors.text : colors.textSecondary,
          }}
          onClick={() => setViewType("table")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Database size={14} />
            <span>Table</span>
          </span>
        </div>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: viewType === "kanban" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            color: viewType === "kanban" ? colors.text : colors.textSecondary,
          }}
          onClick={() => setViewType("kanban")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Trello size={14} />
            <span>Kanban</span>
          </span>
        </div>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: viewType === "calendar" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            color: viewType === "calendar" ? colors.text : colors.textSecondary,
          }}
          onClick={() => setViewType("calendar")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} />
            <span>Calendar</span>
          </span>
        </div>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: viewType === "list" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            color: viewType === "list" ? colors.text : colors.textSecondary,
          }}
          onClick={() => setViewType("list")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ListIcon size={14} />
            <span>List</span>
          </span>
        </div>
      </div>
      
      <div
        style={{
          marginLeft: "auto",
          padding: "6px 12px",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          fontSize: "13px",
          cursor: "pointer",
          color: colors.textSecondary,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <Filter size={14} />
        <span>Filter</span>
      </div>
      
      <div
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          fontSize: "13px",
          cursor: "pointer",
          color: colors.textSecondary,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        <span>New</span>
      </div>
    </div>
  );
};

export default ViewSwitcher;