"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronDown, ChevronRight, ChevronLeft, Search, Plus, Settings, User, Calendar, 
  FileText, Database, Globe, Menu, X, MessageSquare, MoreHorizontal,
  CheckSquare, Clock, Star, Trash, Share2, Edit, Filter,
  LayoutKanban, List as ListIcon, LayoutGrid
} from "lucide-react";

// Import components
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import BlockEditor from "../components/BlockEditor";
import ViewSwitcher from "../components/ViewSwitcher";
import CommentsPanel from "../components/CommentsPanel";
import SearchOverlay from "../components/SearchOverlay";
import PropertiesPanel from "../components/PropertiesPanel";

const XMANotionWorkspace = () => {
  // Main state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clientView, setClientView] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState("CEO");
  
  // Notion-specific state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPageProperties, setShowPageProperties] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [viewType, setViewType] = useState("kanban"); // kanban, table, calendar, list
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Welcome to XMA Agency Workspace", type: "heading" },
    { id: 2, content: "Use this workspace to manage client projects, team tasks, and resources.", type: "paragraph" },
    { id: 3, content: "Quick links:", type: "paragraph" },
  ]);
  
  // Refs
  const searchInputRef = useRef(null);
  const commentsRef = useRef(null);
  const propertiesRef = useRef(null);
  
  // Additional state
  const [currentPage, setCurrentPage] = useState({ title: "XMA Agency Workspace", icon: "📊" });
  const [showProperties, setShowProperties] = useState(false);
  const [blockContent, setBlockContent] = useState("Welcome to the XMA Agency Notion Workspace. This is a block-based editor. Click on this text to edit it.");
  const [favorites, setFavorites] = useState([
    { id: "1", title: "Dashboard", icon: "📊" },
    { id: "2", title: "Client Pipeline", icon: "🚀" },
  ]);
  
  // XMA brand colors
  const colors = {
    background: "#111111",
    surface: "#222222",
    accent: "#EF4444",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    sidebar: "#191919",
    hover: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
  };

  // Styles
  const styles = {
    container: {
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif",
      display: "flex",
    },
    sidebar: {
      width: sidebarCollapsed ? "60px" : "250px",
      backgroundColor: colors.sidebar,
      color: colors.text,
      height: "100vh",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.2s ease",
      overflow: "hidden",
      borderRight: `1px solid ${colors.border}`,
    },
    sidebarHeader: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      color: colors.textSecondary,
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      marginBottom: "8px",
    },
    sidebarItem: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
      marginBottom: "2px",
      fontSize: "14px",
      transition: "background-color 0.1s ease",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    sidebarSection: {
      fontSize: "12px",
      color: colors.textSecondary,
      padding: "8px",
      textTransform: "uppercase",
      fontWeight: "500",
      letterSpacing: "0.05em",
      marginTop: "12px",
      marginBottom: "4px",
    },
    sidebarFooter: {
      marginTop: "auto",
      padding: "8px",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      backgroundColor: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
    },
    breadcrumbs: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: colors.textSecondary,
    },
    pageIcon: {
      marginRight: "8px",
      fontSize: "18px",
    },
    pageTitle: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: "4px",
      margin: "8px",
      cursor: "pointer",
    },
    headerActions: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    content: {
      flex: 1,
      padding: "16px 24px",
      backgroundColor: colors.background,
      overflow: "auto",
    },
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    block: {
      padding: "8px 0",
      cursor: "text",
      borderRadius: "4px",
      transition: "background-color 0.1s",
      marginBottom: "4px",
      position: "relative",
    },
    blockActive: {
      backgroundColor: "rgba(255,255,255,0.03)",
    },
    blockHandle: {
      position: "absolute",
      left: "-20px", 
      top: "8px",
      color: colors.textSecondary,
      opacity: 0,
      transition: "opacity 0.1s",
    },
    menuToggle: {
      backgroundColor: "transparent",
      border: "none",
      color: colors.textSecondary,
      cursor: "pointer",
      padding: "4px",
      borderRadius: "4px",
    },
    blockMenu: {
      position: "absolute",
      left: "-40px",
      top: "0",
      padding: "4px",
      color: colors.textSecondary,
    },
    commentsPanel: {
      width: showComments ? "300px" : "0",
      backgroundColor: colors.surface,
      borderLeft: showComments ? `1px solid ${colors.border}` : "none",
      transition: "width 0.3s ease",
      overflow: "hidden",
    },
    comment: {
      padding: "12px",
      borderBottom: `1px solid ${colors.border}`,
    },
    propertiesPanel: {
      padding: "12px",
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: "4px",
      marginBottom: "24px",
      display: showProperties ? "block" : "none",
    },
    property: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: `1px solid ${colors.border}`,
    },
    toggle: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: colors.textSecondary,
      cursor: "pointer",
      marginBottom: "16px",
    },
    viewSelector: {
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
    },
    viewOption: {
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    viewOptionActive: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      color: colors.accent,
    },
    // Original styles preserved
    logo: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    accent: {
      color: colors.accent,
    },
    nav: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      padding: "0 16px",
    },
    navItem: {
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    navItemActive: {
      backgroundColor: colors.accent,
      color: "white",
    },
    contentContainer: {
      backgroundColor: colors.surface,
      borderRadius: "8px",
      padding: "16px",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "16px",
      marginTop: "24px",
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: "8px",
      padding: "16px",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    pill: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
      backgroundColor: colors.accent,
      color: "white",
      marginRight: "8px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: colors.accent,
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
    },
    phaseColumn: {
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: "8px",
      padding: "12px",
      flex: 1,
    },
    phaseTitle: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "12px",
      display: "flex",
      justifyContent: "space-between",
    },
    task: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: "6px",
      padding: "12px",
      marginBottom: "8px",
      fontSize: "13px",
      border: "1px solid rgba(255,255,255,0.08)",
      cursor: "pointer",
    },
    taskTitle: {
      fontWeight: "500",
      marginBottom: "4px",
    },
    taskMeta: {
      display: "flex",
      justifyContent: "space-between",
      color: colors.textSecondary,
      fontSize: "12px",
      marginTop: "8px",
    },
    pipelineContainer: {
      display: "flex",
      gap: "16px",
      overflow: "auto",
      padding: "4px 0 16px 0",
    },
    tableContainer: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    th: {
      textAlign: "left",
      padding: "12px 16px",
      backgroundColor: "rgba(255,255,255,0.05)",
      color: colors.textSecondary,
      fontWeight: "500",
      position: "sticky",
      top: 0,
    },
    td: {
      padding: "12px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    subNav: {
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
    },
    subNavItem: {
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    subNavItemActive: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      color: colors.accent,
    },
  };

  // Mock data
  const team = [
    { name: "CEO", role: "Executive", tasks: 4, email: "ceo@xmaagency.com" },
    { name: "CMO", role: "Executive", tasks: 6, email: "cmo@xmaagency.com" },
    { name: "COO", role: "Executive", tasks: 8, email: "coo@xmaagency.com" },
    { name: "Developer", role: "Tech Team", tasks: 5, email: "dev@xmaagency.com" },
    { name: "Videographer 1", role: "Video Team", tasks: 9, email: "video1@xmaagency.com" },
    { name: "Videographer 2", role: "Video Team", tasks: 7, email: "video2@xmaagency.com" },
    { name: "Graphic Designer", role: "Graphics Team", tasks: 12, email: "design@xmaagency.com" },
    { name: "Customer Success", role: "Client Success Team", tasks: 10, email: "success@xmaagency.com" },
  ];

  const clients = [
    { name: "Metaphase Global", status: "In Production", phase: "Phase 3: Production" },
    { name: "Dubai Luxury Real Estate", status: "Pre-Launch", phase: "Phase 4: Campaign Setup & Launch" },
    { name: "Al Manzil Hotels", status: "Onboarding", phase: "Phase 1: Onboarding" },
    { name: "Sheikh Investment Group", status: "In Production", phase: "Phase 3: Production" },
  ];

  const pipelineTasks = [
    { id: "1210123797702395", name: "Onboarding Call", phase: "Phase 1: Onboarding", assignee: "Customer Success", dueDate: "2025-04-30", status: "In Pipeline" },
    // ... more tasks
  ];

  const phases = {
    "Phase 1: Onboarding": pipelineTasks.filter(task => task.phase === "Phase 1: Onboarding"),
    "Phase 2: Pre-Production & Setup": pipelineTasks.filter(task => task.phase === "Phase 2: Pre-Production & Setup"),
    "Phase 3: Production": pipelineTasks.filter(task => task.phase === "Phase 3: Production"),
    "Phase 4: Campaign Setup & Launch": pipelineTasks.filter(task => task.phase === "Phase 4: Campaign Setup & Launch"),
  };

  const personalTasks = [
    { id: 1, task: "Review campaign metrics", dueDate: "2025-05-02", priority: "High", assigned: "CEO" },
    // ... more tasks
  ];

  const comments = [
    { id: 1, user: "CEO", text: "Let's make sure these metrics are reviewed by the end of the week.", timestamp: "2025-05-15 10:23 AM" },
    { id: 2, user: "CMO", text: "The client requested changes to the video script. @Videographer 1 can you update it?", timestamp: "2025-05-15 11:42 AM", mentions: ["Videographer 1"] },
    { id: 3, user: "Customer Success", text: "Client onboarding call has been scheduled for tomorrow at 2 PM.", timestamp: "2025-05-15 02:15 PM" }
  ];

  const pageProperties = [
    { name: "Status", value: "Active" },
    { name: "Created by", value: "CEO" },
    { name: "Last edited", value: "May 15, 2025" },
    { name: "Tags", value: "Agency, Dashboard, Overview" }
  ];

  // Handle keyboard shortcuts and click outside events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      
      // Esc to close panels
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowComments(false);
        setShowPageProperties(false);
      }
    };
    
    // Handle click outside of panels
    const handleClickOutside = (event) => {
      if (commentsRef.current && !commentsRef.current.contains(event.target) && !event.target.closest(".comments-button")) {
        setShowComments(false);
      }
      
      if (propertiesRef.current && !propertiesRef.current.contains(event.target) && !event.target.closest(".properties-button")) {
        setShowPageProperties(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle tab navigation clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch(tab) {
      case "dashboard":
        setCurrentPage({ title: "XMA Agency Workspace", icon: "📊" });
        break;
      case "pipeline":
        setCurrentPage({ title: "Client Pipeline", icon: "🚀" });
        break;
      case "video":
        setCurrentPage({ title: "Video Production", icon: "🎬" });
        break;
      case "documents":
        setCurrentPage({ title: "Document Library", icon: "📁" });
        break;
      case "tasks":
        setCurrentPage({ title: "My Tasks", icon: "✅" });
        break;
      default:
        setCurrentPage({ title: "XMA Agency Workspace", icon: "📊" });
    }
  };

  // Render dashboard content
  const renderDashboard = () => (
    <div>
      {/* Properties panel */}
      <PropertiesPanel 
        showProperties={showProperties}
        setShowProperties={setShowProperties}
        pageProperties={pageProperties}
        colors={colors}
        styles={styles}
      />

      {/* Quick stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div style={styles.card}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Active Clients
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            4
          </div>
        </div>
        <div style={styles.card}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Projects In Production
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            2
          </div>
        </div>
        <div style={styles.card}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Upcoming Deadlines
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            8
          </div>
        </div>
        <div style={styles.card}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Team Capacity
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            76%
          </div>
        </div>
      </div>

      {/* Client overview */}
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
        Client Overview
      </h3>
      <div style={styles.card}>
        {/* Client table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Current Phase</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td style={styles.td}>{client.name}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.pill,
                        backgroundColor:
                          client.status === "In Production"
                            ? "#EF4444"
                            : client.status === "Pre-Launch"
                              ? "#3B82F6"
                              : "#10B981",
                      }}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td style={styles.td}>{client.phase}</td>
                  <td style={styles.td}>
                    <button
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "transparent",
                        color: colors.accent,
                        border: `1px solid ${colors.accent}`,
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team tasks */}
      <h3 style={{ marginTop: "24px", marginBottom: "16px", fontSize: "18px" }}>
        Team Tasks
      </h3>
      <div style={styles.grid}>
        {team.map((member, index) => (
          <div key={index} style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={styles.cardTitle}>{member.name}</div>
              <span
                style={{
                  ...styles.pill,
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  color: colors.accent,
                }}
              >
                {member.tasks} Tasks
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                marginBottom: "12px",
              }}
            >
              {member.role}
            </div>
            {personalTasks
              .filter((task) => task.assigned === member.name)
              .slice(0, 1)
              .map((task, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRadius: "4px",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ marginBottom: "4px" }}>{task.task}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: colors.textSecondary,
                    }}
                  >
                    <span>Due: {task.dueDate}</span>
                    <span
                      style={{
                        color: task.priority === "High" ? "#EF4444" : "#F59E0B",
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            <button
              style={{
                width: "100%",
                padding: "6px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "4px",
                color: colors.text,
                fontSize: "12px",
                cursor: "pointer",
                marginTop: "8px",
              }}
              onClick={() => {
                setActiveTab("tasks");
                setSelectedTeamMember(member.name);
              }}
            >
              View All Tasks
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Render client pipeline
  const renderClientPipeline = () => (
    <div>
      {/* Properties panel */}
      <PropertiesPanel 
        showProperties={showProperties}
        setShowProperties={setShowProperties}
        pageProperties={pageProperties}
        colors={colors}
        styles={styles}
      />
      
      {/* Block editor */}
      <BlockEditor
        blocks={blocks}
        setBlocks={setBlocks}
        editingBlockId={editingBlockId}
        setEditingBlockId={setEditingBlockId}
        colors={colors}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
          {clientView && (
            <div style={{backgroundColor: "rgba(239, 68, 68, 0.2)", color: colors.accent, padding: "4px 8px", borderRadius: "4px", fontSize: "12px"}}>
              Client-Facing View Active
            </div>
          )}
          <div style={styles.toggle}>
            <span>Client View</span>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "40px",
                height: "20px",
              }}
            >
              <input
                type="checkbox"
                checked={clientView}
                onChange={() => setClientView(!clientView)}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: clientView
                    ? colors.accent
                    : "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    height: "16px",
                    width: "16px",
                    left: clientView ? "22px" : "2px",
                    bottom: "2px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.3s",
                  }}
                ></span>
              </span>
            </label>
          </div>
        </div>
        
        <select
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: colors.text,
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          <option>Metaphase Global</option>
          <option>Dubai Luxury Real Estate</option>
          <option>Al Manzil Hotels</option>
          <option>Sheikh Investment Group</option>
        </select>
      </div>

      {/* View selector */}
      <ViewSwitcher 
        viewType={viewType}
        setViewType={setViewType}
        colors={colors}
      />

      {/* Kanban view with client-facing toggle */}
      <div style={styles.pipelineContainer}>
        {Object.entries(phases).map(([phaseName, tasks]) => (
          <div key={phaseName} style={styles.phaseColumn}>
            <div style={styles.phaseTitle}>
              <span>{phaseName}</span>
              <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
                {tasks.length}
              </span>
            </div>

            {tasks.map((task, index) => (
              <div key={index} style={styles.task}>
                <div style={styles.taskTitle}>{task.name}</div>
                {!clientView && (
                  <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                    {task.assignee}
                  </div>
                )}
                <div style={styles.taskMeta}>
                  {!clientView && <span>#{task.id.slice(-4)}</span>}
                  <span>Due: {task.dueDate}</span>
                  {clientView && (
                    <span style={{
                      color: "#10B981",
                    }}>
                      {task.status === "In Pipeline" ? "Scheduled" : task.status}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {clientView ? (
              // Client view shows progress only
              <div style={{
                marginTop: "8px",
                padding: "8px",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "4px",
                fontSize: "12px",
                color: colors.textSecondary
              }}>
                Phase Progress: {Math.floor(Math.random() * 100)}%
              </div>
            ) : (
              // Internal view allows adding tasks
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "none",
                  borderRadius: "4px",
                  color: colors.textSecondary,
                  fontSize: "13px",
                  cursor: "pointer",
                  marginTop: "8px",
                  textAlign: "left",
                }}
              >
                + Add Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Other rendering methods...
  // renderVideoProduction, renderDocuments, renderPersonalTasks, etc.

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        handleTabClick={handleTabClick}
        favorites={favorites}
        colors={colors}
        styles={styles}
        setShowSearch={setShowSearch}
      />

      {/* Main content */}
      <div style={styles.mainContent}>
        {/* Page header with breadcrumbs */}
        <PageHeader 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          currentPage={currentPage}
          setShowComments={setShowComments}
          showComments={showComments}
          colors={colors}
          styles={styles}
        />

        {/* Content container */}
        <div style={styles.content}>
          {/* Show block editor for dashboard */}
          {activeTab === "dashboard" && (
            <>
              <BlockEditor
                blocks={blocks}
                setBlocks={setBlocks}
                editingBlockId={editingBlockId}
                setEditingBlockId={setEditingBlockId}
                colors={colors}
              />
              {renderDashboard()}
            </>
          )}
          {activeTab === "pipeline" && renderClientPipeline()}
          {/* Additional tabs */}
        </div>
      </div>

      {/* Comments panel */}
      <CommentsPanel 
        showComments={showComments}
        setShowComments={setShowComments}
        comments={comments}
        commentsRef={commentsRef}
        colors={colors}
      />
      
      {/* Search overlay */}
      <SearchOverlay 
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
        colors={colors}
      />
    </div>
  );
};

export default XMANotionWorkspace;