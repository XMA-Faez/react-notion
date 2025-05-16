"use client";
import React, { useState } from "react";
import NotionLayout from "../notion-layout";
import BlockEditor from "../../components/BlockEditor";
import ViewSwitcher from "../../components/ViewSwitcher";
import { useNotion } from "../context/NotionContext";
import { 
  ChevronDown, 
  ChevronRight, 
  Share2, 
  Edit,
  Filter, 
  Plus,
  User,
  Calendar,
  Trello
} from "lucide-react";

export default function ClientPipeline() {
  const { 
    clients, 
    selectedClient, 
    setSelectedClient,
    viewType,
    setViewType,
    clientView,
    setClientView,
    clientTasks
  } = useNotion();

  // Client page-specific state
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Client Pipeline", type: "heading" },
    { id: 2, content: "Track client projects and their status through our pipeline stages.", type: "paragraph" },
  ]);
  const [showProperties, setShowProperties] = useState(false);
  const [showClientDetail, setShowClientDetail] = useState(false);
  
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
    { name: "Status", value: "In Progress" },
    { name: "Created by", value: "CEO" },
    { name: "Last edited", value: "May 15, 2025" },
    { name: "Tags", value: "Pipeline, Clients, Projects" }
  ];
  
  // Mock pipeline data for phases
  const pipelineData = {
    "Phase 1: Onboarding": [
      { id: "123", name: "Onboarding Call", assignee: "Customer Success", dueDate: "2025-05-02", status: "In Pipeline", client: "Al Manzil Hotels" },
      { id: "124", name: "Upload Business Assets", assignee: "Customer Success", dueDate: "2025-05-03", status: "In Pipeline", client: "Al Manzil Hotels" },
      { id: "125", name: "Share access to platforms", assignee: "Customer Success", dueDate: "2025-05-03", status: "In Pipeline", client: "Al Manzil Hotels" },
    ],
    "Phase 2: Pre-Production & Setup": [
      { id: "126", name: "CRM Setup", assignee: "Developer", dueDate: "2025-05-04", status: "In Pipeline", client: "Al Manzil Hotels" },
      { id: "127", name: "8 Video Scripts", assignee: "Videographer 1", dueDate: "2025-05-04", status: "In Pipeline", client: "Metaphase Global" },
      { id: "128", name: "Pre-Production Call", assignee: "CMO", dueDate: "2025-05-06", status: "In Pipeline", client: "Metaphase Global" },
    ],
    "Phase 3: Production": [
      { id: "129", name: "10 Graphics Creation", assignee: "Graphic Designer", dueDate: "2025-05-15", status: "In Pipeline", client: "Metaphase Global" },
      { id: "130", name: "Video Shoot", assignee: "Videographer 1", dueDate: "2025-05-14", status: "In Pipeline", client: "Metaphase Global" },
    ],
    "Phase 4: Campaign Setup & Launch": [
      { id: "131", name: "Pre-Launch Call", assignee: "Customer Success", dueDate: "2025-05-28", status: "In Pipeline", client: "Dubai Luxury Real Estate" },
      { id: "132", name: "Campaign Setup", assignee: "CMO", dueDate: "2025-05-28", status: "In Pipeline", client: "Dubai Luxury Real Estate" },
    ],
  };
  
  // Filter tasks by selected client
  const getClientTasks = (clientName) => {
    const filteredTasks = {};
    
    Object.keys(pipelineData).forEach(phase => {
      const clientPhaseTasks = pipelineData[phase].filter(task => 
        task.client === clientName
      );
      
      if (clientPhaseTasks.length > 0) {
        filteredTasks[phase] = clientPhaseTasks;
      }
    });
    
    return filteredTasks;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "In Production": return "#EF4444";
      case "Pre-Launch": return "#3B82F6";
      case "Onboarding": return "#10B981";
      default: return "#8B5CF6";
    }
  };
  
  // Get phase color
  const getPhaseColor = (phase) => {
    if (phase.includes("Phase 1")) return "#10B981";
    if (phase.includes("Phase 2")) return "#F59E0B";
    if (phase.includes("Phase 3")) return "#EF4444";
    if (phase.includes("Phase 4")) return "#3B82F6";
    return "#8B5CF6";
  };
  
  // Render page properties panel
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
  
  // Render client overview section
  const renderClientOverview = () => {
    return (
      <div style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "24px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "500" }}>All Clients</h3>
          <button
            style={{
              padding: "6px 12px",
              backgroundColor: colors.accent,
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <Plus size={14} />
            New Client
          </button>
        </div>
        
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
                }}>Client</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                }}>Status</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                }}>Current Phase</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                }}>Account Manager</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr 
                  key={index}
                  style={{
                    backgroundColor: selectedClient === client.name ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: colors.accent,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}>
                        {client.name.substring(0, 2)}
                      </div>
                      {client.name}
                    </div>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      backgroundColor: `${getStatusColor(client.status)}25`,
                      color: getStatusColor(client.status),
                    }}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      backgroundColor: `${getPhaseColor(client.phase)}25`,
                      color: getPhaseColor(client.phase),
                    }}>
                      {client.phase}
                    </span>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
                    {client.id === "cl1" || client.id === "cl3" ? "Customer Success" : 
                     client.id === "cl2" ? "CMO" : "CEO"}
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}>
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
                      onClick={() => {
                        setSelectedClient(client.name);
                        setShowClientDetail(true);
                      }}
                    >
                      View Pipeline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Render client details and pipeline
  const renderClientDetail = () => {
    const client = clients.find(c => c.name === selectedClient);
    if (!client) return null;
    
    const clientTasks = getClientTasks(selectedClient);
    
    return (
      <>
        {/* Client header */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px"
        }}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px"}}>
            <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: colors.textSecondary,
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  marginRight: "4px",
                }}
                onClick={() => setShowClientDetail(false)}
              >
                ← Back to All Clients
              </button>
              <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: colors.accent,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold"
              }}>
                {selectedClient.substring(0, 2)}
              </div>
              <div>
                <div style={{fontWeight: "500", fontSize: "16px"}}>{selectedClient}</div>
                <div style={{color: colors.textSecondary, fontSize: "12px"}}>
                  {client.status} • {client.phase}
                </div>
              </div>
            </div>
            
            <div style={{display: "flex", gap: "8px"}}>
              <button style={{
                padding: "6px 12px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "4px",
                color: colors.text,
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              }}>
                <Share2 size={14} />
                Share
              </button>
              
              <button style={{
                padding: "6px 12px",
                backgroundColor: colors.accent,
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              }}>
                <Edit size={14} />
                Edit Details
              </button>
            </div>
          </div>
          
          <div style={{display: "flex", gap: "16px"}}>
            <div style={{flex: 1}}>
              <div style={{fontSize: "12px", color: colors.textSecondary, marginBottom: "4px"}}>
                CONTACT
              </div>
              <div style={{fontSize: "14px"}}>
                contact@{selectedClient.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>
            
            <div style={{flex: 1}}>
              <div style={{fontSize: "12px", color: colors.textSecondary, marginBottom: "4px"}}>
                START DATE
              </div>
              <div style={{fontSize: "14px"}}>
                April 30, 2025
              </div>
            </div>
            
            <div style={{flex: 1}}>
              <div style={{fontSize: "12px", color: colors.textSecondary, marginBottom: "4px"}}>
                ACCOUNT MANAGER
              </div>
              <div style={{fontSize: "14px"}}>
                {client.id === "cl1" || client.id === "cl3" ? "Customer Success" : 
                 client.id === "cl2" ? "CMO" : "CEO"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Client selector and view toggle */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
            {clientView && (
              <div style={{backgroundColor: "rgba(239, 68, 68, 0.2)", color: colors.accent, padding: "4px 8px", borderRadius: "4px", fontSize: "12px"}}>
                Client-Facing View Active
              </div>
            )}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: colors.textSecondary,
              cursor: "pointer",
            }}>
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
                    backgroundColor: clientView ? colors.accent : "rgba(255,255,255,0.1)",
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
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {clients.map((client, index) => (
              <option key={index} value={client.name}>{client.name}</option>
            ))}
          </select>
        </div>

        {/* View switcher */}
        <ViewSwitcher viewType={viewType} setViewType={setViewType} />

        {/* Kanban view with client-facing toggle */}
        <div style={{
          display: "flex",
          gap: "16px",
          overflow: "auto",
          padding: "4px 0 16px 0",
        }}>
          {Object.entries(pipelineData).map(([phaseName, tasks]) => {
            // Filter tasks for the current client
            const clientTasks = tasks.filter(task => task.client === selectedClient);
            
            // Skip empty phases
            if (clientTasks.length === 0) return null;
            
            return (
              <div key={phaseName} style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                padding: "12px",
                flex: 1,
                minWidth: "250px",
              }}>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <span>{phaseName}</span>
                  <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
                    {clientTasks.length}
                  </span>
                </div>

                {clientTasks.map((task, index) => (
                  <div key={index} style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "6px",
                    padding: "12px",
                    marginBottom: "8px",
                    fontSize: "13px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                  }}>
                    <div style={{
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}>{task.name}</div>
                    {!clientView && (
                      <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                        {task.assignee}
                      </div>
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: colors.textSecondary,
                      fontSize: "12px",
                      marginTop: "8px",
                    }}>
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
            );
          })}
        </div>
      </>
    );
  };

  return (
    <NotionLayout pageTitle="Client Pipeline" pageIcon="🚀">
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
      
      {/* Conditional rendering for client overview or details */}
      {showClientDetail ? renderClientDetail() : renderClientOverview()}
    </NotionLayout>
  );
}