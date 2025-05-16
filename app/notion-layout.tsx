"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronDown, ChevronRight, Search, Plus, Settings, 
  Star, Menu, MessageSquare, Share2
} from "lucide-react";

// Sidebar component
const Sidebar = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  // Brand colors
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

  // Mock favorites
  const favorites = [
    { id: "1", title: "Dashboard", icon: "📊", path: "/dashboard" },
    { id: "2", title: "Client Pipeline", icon: "🚀", path: "/clients" },
  ];
  
  return (
    <div style={{
      width: collapsed ? "60px" : "240px",
      backgroundColor: colors.sidebar,
      color: colors.text,
      height: "100vh",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.2s ease",
      overflow: "hidden",
      borderRight: `1px solid ${colors.border}`,
    }}>
      {/* Workspace Name */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          color: colors.textSecondary,
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          marginBottom: "8px",
        }} 
        onClick={() => setCollapsed(!collapsed)}
      >
        {!collapsed && (
          <>
            <div style={{ marginRight: "8px" }}><span style={{ color: colors.accent }}>XMA</span></div>
            <span>Agency</span>
            <Menu size={16} style={{ marginLeft: "auto" }} />
          </>
        )}
        {collapsed && <Menu size={20} />}
      </div>

      {/* Search bar */}
      {!collapsed && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "4px",
          margin: "8px",
          cursor: "pointer",
        }}>
          <Search size={14} color={colors.textSecondary} />
          <span style={{ color: colors.textSecondary, fontSize: "13px" }}>Quick Find</span>
          <span style={{ marginLeft: "auto", fontSize: "12px", color: colors.textSecondary }}>⌘K</span>
        </div>
      )}

      {/* Sidebar navigation */}
      <div style={{ marginTop: "8px" }}>
        {!collapsed && <div style={{ 
          fontSize: "12px",
          color: colors.textSecondary,
          padding: "8px",
          textTransform: "uppercase",
          fontWeight: "500",
          letterSpacing: "0.05em",
          marginTop: "12px",
          marginBottom: "4px",
        }}>MAIN</div>}
        
        <Link href="/dashboard">
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "2px",
              fontSize: "14px",
              backgroundColor: isActive("/dashboard") ? "rgba(255,255,255,0.06)" : "transparent",
              color: isActive("/dashboard") ? colors.text : colors.textSecondary,
            }}
          >
            <span style={{ marginRight: "8px" }}>📊</span>
            {!collapsed && "Dashboard"}
          </div>
        </Link>
        
        <Link href="/clients">
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "2px",
              fontSize: "14px",
              backgroundColor: isActive("/clients") ? "rgba(255,255,255,0.06)" : "transparent",
              color: isActive("/clients") ? colors.text : colors.textSecondary,
            }}
          >
            <span style={{ marginRight: "8px" }}>🚀</span>
            {!collapsed && "Client Pipeline"}
          </div>
        </Link>
        
        <Link href="/video">
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "2px",
              fontSize: "14px",
              backgroundColor: isActive("/video") ? "rgba(255,255,255,0.06)" : "transparent",
              color: isActive("/video") ? colors.text : colors.textSecondary,
            }}
          >
            <span style={{ marginRight: "8px" }}>🎬</span>
            {!collapsed && "Video Production"}
          </div>
        </Link>
        
        <Link href="/documents">
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "2px",
              fontSize: "14px",
              backgroundColor: isActive("/documents") ? "rgba(255,255,255,0.06)" : "transparent",
              color: isActive("/documents") ? colors.text : colors.textSecondary,
            }}
          >
            <span style={{ marginRight: "8px" }}>📁</span>
            {!collapsed && "Documents"}
          </div>
        </Link>
        
        <Link href="/tasks">
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "2px",
              fontSize: "14px",
              backgroundColor: isActive("/tasks") ? "rgba(255,255,255,0.06)" : "transparent",
              color: isActive("/tasks") ? colors.text : colors.textSecondary,
            }}
          >
            <span style={{ marginRight: "8px" }}>✅</span>
            {!collapsed && "Team Tasks"}
          </div>
        </Link>
      </div>

      {/* Favorites section */}
      {!collapsed && (
        <>
          <div style={{ 
            fontSize: "12px",
            color: colors.textSecondary,
            padding: "8px",
            textTransform: "uppercase",
            fontWeight: "500",
            letterSpacing: "0.05em",
            marginTop: "12px",
            marginBottom: "4px",
          }}>FAVORITES</div>
          {favorites.map(item => (
            <Link key={item.id} href={item.path}>
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "2px",
                fontSize: "14px",
                color: colors.textSecondary,
              }}>
                <span style={{ marginRight: "8px" }}>{item.icon}</span>
                {item.title}
                <Star size={14} style={{ marginLeft: "auto" }} color={colors.accent} />
              </div>
            </Link>
          ))}
        </>
      )}

      {/* Recent pages */}
      {!collapsed && (
        <>
          <div style={{ 
            fontSize: "12px",
            color: colors.textSecondary,
            padding: "8px",
            textTransform: "uppercase",
            fontWeight: "500",
            letterSpacing: "0.05em",
            marginTop: "12px",
            marginBottom: "4px",
          }}>RECENT</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "2px",
            fontSize: "14px",
            color: colors.textSecondary,
          }}>
            <span style={{ marginRight: "8px" }}>📝</span>
            Client Meeting Notes
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "2px",
            fontSize: "14px",
            color: colors.textSecondary,
          }}>
            <span style={{ marginRight: "8px" }}>📊</span>
            Campaign Analytics
          </div>
        </>
      )}

      {/* Settings button at bottom */}
      <div style={{ marginTop: "auto", padding: "8px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          color: colors.textSecondary,
        }}>
          <Settings size={16} />
          {!collapsed && <span style={{ marginLeft: "8px" }}>Settings</span>}
        </div>
      </div>
    </div>
  );
};

// Page header component
const PageHeader = ({ title, icon, sidebarCollapsed, setSidebarCollapsed, showComments, setShowComments }) => {
  const colors = {
    background: "#111111",
    surface: "#222222",
    accent: "#EF4444",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "rgba(255,255,255,0.1)",
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      backgroundColor: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: colors.textSecondary }}>
        <span style={{ cursor: "pointer" }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </span>
        <span>XMA Agency</span>
        <span>/</span>
        <span style={{ fontWeight: "500" }}>{title}</span>
      </div>
      
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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

// NotionLayout component
export default function NotionLayout({ children, pageTitle = "Workspace", pageIcon = "📊" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const commentsRef = useRef(null);
  
  // Colors for styling
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
    const handleClickOutside = (event) => {
      if (showComments && commentsRef.current && !commentsRef.current.contains(event.target) && !event.target.closest(".comments-button")) {
        setShowComments(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComments]);
  
  // Comments panel
  const renderCommentsPanel = () => {
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
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            onClick={() => setShowComments(false)}
          >
            X
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
  
  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      backgroundColor: colors.background,
      color: colors.text,
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      {/* Main content */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        overflow: "hidden"
      }}>
        {/* Page header with breadcrumbs */}
        <PageHeader 
          title={pageTitle}
          icon={pageIcon}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          showComments={showComments}
          setShowComments={setShowComments}
        />
        
        {/* Content container */}
        <div style={{ 
          flex: 1, 
          padding: "16px 24px", 
          backgroundColor: colors.background,
          overflow: "auto",
        }}>
          {children}
        </div>
      </div>
      
      {/* Comments panel */}
      {renderCommentsPanel()}
    </div>
  );
}