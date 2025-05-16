"use client";
import React from "react";
import { Search } from "lucide-react";

interface SearchOverlayProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  colors: any;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  colors
}) => {
  if (!showSearch) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "120px 0",
    }}>
      <div style={{
        width: "600px",
        backgroundColor: colors.background,
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
      }}>
        <div style={{
          padding: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <Search size={16} color={colors.textSecondary} />
          <input 
            ref={searchInputRef}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: colors.text,
              fontSize: "16px",
              width: "100%",
            }}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSearch(false);
              }
            }}
            autoFocus
          />
          <div style={{
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: colors.textSecondary,
            fontSize: "12px",
          }}>
            ESC
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {searchQuery ? (
            <div style={{ color: colors.textSecondary, fontSize: "14px", textAlign: "center" }}>
              {`No results found for "${searchQuery}"`}
            </div>
          ) : (
            <div style={{ fontSize: "14px", color: colors.textSecondary, textAlign: "center" }}>
              Type to search across pages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;