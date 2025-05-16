"use client";
import React from "react";
import { ChevronDown, ChevronRight, Edit, X } from "lucide-react";

interface Property {
  name: string;
  value: string;
}

interface PropertiesPanelProps {
  showProperties: boolean;
  setShowProperties: (show: boolean) => void;
  pageProperties: Property[];
  colors: any;
  styles: any;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  showProperties,
  setShowProperties,
  pageProperties,
  colors,
  styles
}) => {
  return (
    <>
      {/* Properties toggle button */}
      <div 
        style={styles.toggle} 
        onClick={() => setShowProperties(!showProperties)}
        className="properties-button"
      >
        {showProperties ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>Properties</span>
      </div>
      
      {/* Properties panel */}
      {showProperties && (
        <div style={styles.propertiesPanel}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}>
            <div style={{fontWeight: "500"}}>Properties</div>
            <div style={{display: "flex", gap: "8px"}}>
              <Edit size={14} style={{cursor: "pointer"}} />
              <X size={14} style={{cursor: "pointer"}} onClick={() => setShowProperties(false)} />
            </div>
          </div>
          
          {pageProperties.map((prop, idx) => (
            <div key={idx} style={styles.property}>
              <div style={{fontSize: "13px", color: colors.textSecondary}}>{prop.name}</div>
              <div style={{fontSize: "13px"}}>{prop.value}</div>
            </div>
          ))}
          
          <button
            style={{
              width: "100%",
              padding: "8px 0",
              marginTop: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: colors.text,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Add a property
          </button>
        </div>
      )}
    </>
  );
};

export default PropertiesPanel;