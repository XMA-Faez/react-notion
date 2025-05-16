"use client";
import React, { useState } from "react";
import NotionLayout from "../notion-layout";
import BlockEditor from "../../components/BlockEditor";
import ViewSwitcher from "../../components/ViewSwitcher";
import { useNotion } from "../context/NotionContext";
import { 
  ChevronDown, ChevronRight, File, Search, 
  FolderOpen, Download, Share2, FileText, 
  MoreHorizontal, Grid, Clock
} from "lucide-react";

export default function Documents() {
  const { 
    clients,
    viewType,
    setViewType,
  } = useNotion();
  
  // Documents page-specific state
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Documents", type: "heading" },
    { id: 2, content: "Central repository for all agency and client files.", type: "paragraph" },
  ]);
  const [showProperties, setShowProperties] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("All Documents");
  
  // Document folders
  const folders = [
    { id: "f1", name: "All Documents", count: 18 },
    { id: "f2", name: "Client Assets", count: 7 },
    { id: "f3", name: "Templates", count: 4 },
    { id: "f4", name: "Contracts", count: 5 },
    { id: "f5", name: "Branding", count: 2 },
  ];
  
  // Document data
  const documents = [
    { 
      id: "doc1", 
      name: "Marketing Service Agreement", 
      type: "PDF",
      size: "1.2 MB",
      lastModified: "2025-05-12",
      owner: "CEO",
      folder: "Contracts",
      iconColor: "#EF4444"
    },
    { 
      id: "doc2", 
      name: "Client Onboarding Checklist", 
      type: "DOCX", 
      size: "0.8 MB",
      lastModified: "2025-05-10",
      owner: "Customer Success",
      folder: "Templates",
      iconColor: "#3B82F6"
    },
    { 
      id: "doc3", 
      name: "Social Media Calendar Template", 
      type: "XLSX",
      size: "1.5 MB",
      lastModified: "2025-05-05",
      owner: "CMO",
      folder: "Templates",
      iconColor: "#10B981"
    },
    { 
      id: "doc4", 
      name: "Metaphase Global Brand Guide", 
      type: "PDF",
      size: "4.2 MB",
      lastModified: "2025-04-28",
      owner: "Graphic Designer",
      folder: "Client Assets",
      client: "Metaphase Global",
      iconColor: "#8B5CF6"
    },
    { 
      id: "doc5", 
      name: "Video Production SOPs", 
      type: "DOCX",
      size: "2.1 MB",
      lastModified: "2025-04-20",
      owner: "Videographer 1",
      folder: "Templates",
      iconColor: "#EC4899"
    },
    { 
      id: "doc6", 
      name: "XMA Agency Branding Kit", 
      type: "ZIP",
      size: "8.5 MB",
      lastModified: "2025-04-15",
      owner: "Graphic Designer",
      folder: "Branding",
      iconColor: "#F59E0B"
    },
    { 
      id: "doc7", 
      name: "Dubai Luxury Real Estate Photos", 
      type: "ZIP",
      size: "12.3 MB",
      lastModified: "2025-05-08",
      owner: "Videographer 2",
      folder: "Client Assets",
      client: "Dubai Luxury Real Estate",
      iconColor: "#2563EB"
    },
    { 
      id: "doc8", 
      name: "NDAs", 
      type: "PDF",
      size: "0.6 MB",
      lastModified: "2025-04-10",
      owner: "COO",
      folder: "Contracts",
      iconColor: "#DC2626"
    },
  ];
  
  // Filter documents by current folder
  const filteredDocuments = currentFolder === "All Documents" 
    ? documents 
    : documents.filter(doc => doc.folder === currentFolder);
  
  // Colors
  const colors = {
    background: "#111111",
    surface: "#222222",
    accent: "#EF4444",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "rgba(255,255,255,0.1)",
  };
  
  // Properties panel
  const pageProperties = [
    { name: "Status", value: "Active" },
    { name: "Created by", value: "CEO" },
    { name: "Last edited", value: "May 15, 2025" },
    { name: "Tags", value: "Documents, Files, Repository" }
  ];
  
  const renderPropertiesPanel = () => {
    if (!showProperties) return null;
    
    return (
      <div style={{
        padding: "12px",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: "4px",
        marginBottom: "24px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px"
        }}>
          <div style={{fontWeight: "500"}}>Properties</div>
          <div style={{display: "flex", gap: "8px"}}>
            <span style={{cursor: "pointer"}}>Edit</span>
            <span style={{cursor: "pointer"}} onClick={() => setShowProperties(false)}>X</span>
          </div>
        </div>
        
        {pageProperties.map((prop, idx) => (
          <div key={idx} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <div style={{fontSize: "13px", color: colors.textSecondary}}>{prop.name}</div>
            <div style={{fontSize: "13px"}}>{prop.value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <NotionLayout pageTitle="Documents" pageIcon="📁">
      {/* Properties toggle button */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          color: colors.textSecondary,
          cursor: "pointer",
          marginBottom: "16px",
        }} 
        onClick={() => setShowProperties(!showProperties)}
      >
        {showProperties ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>Properties</span>
      </div>
      
      {/* Properties panel */}
      {renderPropertiesPanel()}
      
      {/* Block editor */}
      <BlockEditor blocks={blocks} setBlocks={setBlocks} />
      
      {/* Document browser layout */}
      <div style={{
        display: "flex",
        gap: "24px",
        marginTop: "16px",
      }}>
        {/* Sidebar for folders */}
        <div style={{
          width: "220px",
          flexShrink: 0,
        }}>
          <div style={{
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "6px",
            gap: "8px",
            color: colors.textSecondary,
          }}>
            <Search size={14} />
            <span style={{ fontSize: "13px" }}>Search documents</span>
          </div>
          
          <h4 style={{ 
            fontSize: "11px", 
            textTransform: "uppercase", 
            letterSpacing: "0.05em", 
            color: colors.textSecondary,
            marginBottom: "8px",
            padding: "0 8px",
          }}>
            Browse
          </h4>
          
          <div style={{ marginBottom: "24px" }}>
            {folders.map(folder => (
              <div 
                key={folder.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginBottom: "2px",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: currentFolder === folder.name 
                    ? "rgba(255,255,255,0.08)" 
                    : "transparent",
                  color: currentFolder === folder.name 
                    ? colors.text 
                    : colors.textSecondary,
                }}
                onClick={() => setCurrentFolder(folder.name)}
              >
                <FolderOpen size={16} style={{ marginRight: "8px" }} />
                <span>{folder.name}</span>
                <span style={{ marginLeft: "auto", fontSize: "12px" }}>
                  {folder.count}
                </span>
              </div>
            ))}
          </div>
          
          <h4 style={{ 
            fontSize: "11px", 
            textTransform: "uppercase", 
            letterSpacing: "0.05em", 
            color: colors.textSecondary,
            marginBottom: "8px",
            padding: "0 8px",
          }}>
            Client Files
          </h4>
          
          <div>
            {clients.map((client, index) => (
              <div 
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginBottom: "2px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: colors.textSecondary,
                }}
              >
                <span style={{ 
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "white",
                  marginRight: "8px",
                }}>
                  {client.name.substring(0, 2)}
                </span>
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content - documents */}
        <div style={{ flex: 1 }}>
          {/* Actions bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}>
            <h3 style={{ fontSize: "18px" }}>
              {currentFolder}
            </h3>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{
                padding: "6px 12px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "4px",
                color: colors.text,
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <Download size={14} />
                Upload
              </button>
              
              <button style={{
                padding: "6px 12px",
                backgroundColor: colors.accent,
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <File size={14} />
                New Document
              </button>
            </div>
          </div>
          
          {/* View switcher */}
          <ViewSwitcher viewType={viewType} setViewType={setViewType} />
          
          {/* Grid view */}
          {viewType === "kanban" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "16px",
            }}>
              {filteredDocuments.map(doc => (
                <div key={doc.id} style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{
                    width: "42px",
                    height: "52px",
                    backgroundColor: doc.iconColor,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}>
                    <FileText size={24} color="white" />
                  </div>
                  
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}>
                    {doc.name}
                  </div>
                  
                  <div style={{
                    fontSize: "12px",
                    color: colors.textSecondary,
                    marginBottom: "8px",
                  }}>
                    {doc.type} • {doc.size}
                  </div>
                  
                  <div style={{
                    fontSize: "12px",
                    color: colors.textSecondary,
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span>{doc.owner}</span>
                    <span>{doc.lastModified.split('-')[2]}/{doc.lastModified.split('-')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Table view */}
          {viewType === "table" && (
            <div style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{
                overflowX: "auto",
              }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                      }}>Name</th>
                      <th style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                      }}>Type</th>
                      <th style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                      }}>Size</th>
                      <th style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                      }}>Last Modified</th>
                      <th style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                      }}>Owner</th>
                      <th style={{
                        textAlign: "center",
                        padding: "12px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: colors.textSecondary,
                        fontWeight: "500",
                        position: "sticky",
                        top: 0,
                        width: "80px",
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id}>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                              width: "28px",
                              height: "28px",
                              backgroundColor: doc.iconColor,
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <FileText size={14} color="white" />
                            </div>
                            {doc.name}
                          </div>
                        </td>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}>{doc.type}</td>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}>{doc.size}</td>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}>{doc.lastModified}</td>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}>{doc.owner}</td>
                        <td style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          textAlign: "center",
                        }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(255,255,255,0.05)",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              color: colors.textSecondary,
                            }}>
                              <Share2 size={14} />
                            </button>
                            <button style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(255,255,255,0.05)",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              color: colors.textSecondary,
                            }}>
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* List view */}
          {viewType === "list" && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "16px",
            }}>
              {filteredDocuments.map(doc => (
                <div key={doc.id} style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: doc.iconColor,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <FileText size={18} color="white" />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "4px" }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                      {doc.folder} • {doc.type} • {doc.owner}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ fontSize: "12px", color: colors.textSecondary, display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} />
                      {doc.lastModified}
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        color: colors.textSecondary,
                      }}>
                        <Share2 size={14} />
                      </button>
                      <button style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        color: colors.textSecondary,
                      }}>
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Gallery view */}
          {viewType === "calendar" && (
            <div style={{
              marginTop: "16px",
            }}>
              <div style={{ fontSize: "14px", color: colors.textSecondary, marginBottom: "16px", textAlign: "center" }}>
                Gallery view
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}>
                {filteredDocuments.map(doc => (
                  <div key={doc.id} style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    aspectRatio: "4/3",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: doc.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                    }}>
                      {doc.type === "PDF" && <FileText size={40} color="white" />}
                      {doc.type === "DOCX" && <FileText size={40} color="white" />}
                      {doc.type === "XLSX" && <Grid size={40} color="white" />}
                      {doc.type === "ZIP" && <Download size={40} color="white" />}
                    </div>
                    
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "8px 12px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(4px)",
                    }}>
                      <div style={{ fontSize: "12px", fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: "10px", color: colors.textSecondary }}>
                        {doc.owner} • {doc.lastModified}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </NotionLayout>
  );
}