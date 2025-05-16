"use client";
import React from "react";
import { 
  ChevronDown, ChevronRight, Search, Plus, Settings, 
  Star, Menu 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  handleTabClick: (tab: string) => void;
  favorites: { id: string; title: string; icon: string }[];
  colors: any;
  styles: any;
  setShowSearch: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  handleTabClick,
  favorites,
  colors,
  styles,
  setShowSearch
}) => {
  return (
    <div style={styles.sidebar}>
      {/* Workspace Name */}
      <div style={styles.sidebarHeader} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        {!sidebarCollapsed && (
          <>
            <div style={styles.pageIcon}><span style={{color: colors.accent}}>XMA</span></div>
            <span>Agency</span>
            <Menu size={16} style={{marginLeft: "auto"}} />
          </>
        )}
        {sidebarCollapsed && <Menu size={20} />}
      </div>

      {/* Search bar */}
      {!sidebarCollapsed && (
        <div style={styles.searchBar} onClick={() => setShowSearch(true)}>
          <Search size={14} color={colors.textSecondary} />
          <span style={{color: colors.textSecondary, fontSize: "13px"}}>Quick Find</span>
          <span style={{marginLeft: "auto", fontSize: "12px", color: colors.textSecondary}}>⌘K</span>
        </div>
      )}

      {/* Sidebar navigation */}
      <div style={{marginTop: "8px"}}>
        {!sidebarCollapsed && <div style={styles.sidebarSection}>MAIN</div>}
        
        <div 
          style={{
            ...styles.sidebarItem, 
            backgroundColor: activeTab === "dashboard" ? colors.hover : "transparent"
          }}
          onClick={() => handleTabClick("dashboard")}
        >
          <span style={styles.pageIcon}>📊</span>
          {!sidebarCollapsed && "Dashboard"}
        </div>
        
        <div 
          style={{
            ...styles.sidebarItem, 
            backgroundColor: activeTab === "pipeline" ? colors.hover : "transparent"
          }}
          onClick={() => handleTabClick("pipeline")}
        >
          <span style={styles.pageIcon}>🚀</span>
          {!sidebarCollapsed && "Client Pipeline"}
        </div>
        
        <div 
          style={{
            ...styles.sidebarItem, 
            backgroundColor: activeTab === "video" ? colors.hover : "transparent"
          }}
          onClick={() => handleTabClick("video")}
        >
          <span style={styles.pageIcon}>🎬</span>
          {!sidebarCollapsed && "Video Production"}
        </div>
        
        <div 
          style={{
            ...styles.sidebarItem, 
            backgroundColor: activeTab === "documents" ? colors.hover : "transparent"
          }}
          onClick={() => handleTabClick("documents")}
        >
          <span style={styles.pageIcon}>📁</span>
          {!sidebarCollapsed && "Documents"}
        </div>
        
        <div 
          style={{
            ...styles.sidebarItem, 
            backgroundColor: activeTab === "tasks" ? colors.hover : "transparent"
          }}
          onClick={() => handleTabClick("tasks")}
        >
          <span style={styles.pageIcon}>✅</span>
          {!sidebarCollapsed && "My Tasks"}
        </div>
      </div>

      {/* Favorites section */}
      {!sidebarCollapsed && (
        <>
          <div style={styles.sidebarSection}>FAVORITES</div>
          {favorites.map(item => (
            <div key={item.id} style={styles.sidebarItem}>
              <span style={styles.pageIcon}>{item.icon}</span>
              {item.title}
              <Star size={14} style={{marginLeft: "auto"}} color={colors.accent} />
            </div>
          ))}
        </>
      )}

      {/* Recent pages */}
      {!sidebarCollapsed && (
        <>
          <div style={styles.sidebarSection}>RECENT</div>
          <div style={styles.sidebarItem}>
            <span style={styles.pageIcon}>📝</span>
            Client Meeting Notes
          </div>
          <div style={styles.sidebarItem}>
            <span style={styles.pageIcon}>📊</span>
            Campaign Analytics
          </div>
          <div style={styles.sidebarItem}>
            <span style={styles.pageIcon}>🚀</span>
            Dubai Luxury Real Estate
          </div>
        </>
      )}

      {/* Settings button at bottom */}
      <div style={styles.sidebarFooter}>
        <div style={styles.sidebarItem}>
          <Settings size={16} />
          {!sidebarCollapsed && <span style={{marginLeft: "8px"}}>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;