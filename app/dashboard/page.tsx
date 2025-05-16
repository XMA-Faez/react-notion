"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NotionLayout from "../notion-layout";
import BlockEditor from "../../components/BlockEditor";
import { useNotion } from "../context/NotionContext";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { clients, team, personalTasks, setSelectedClient, setSelectedTeamMember } = useNotion();
  
  // Dashboard-specific state
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Welcome to XMA Agency Workspace", type: "heading" },
    { id: 2, content: "Use this workspace to manage client projects, team tasks, and resources.", type: "paragraph" },
    { id: 3, content: "Quick links:", type: "paragraph" },
  ]);
  const [showProperties, setShowProperties] = useState(false);
  
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
    { name: "Tags", value: "Agency, Dashboard, Overview" }
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
    <NotionLayout pageTitle="Dashboard" pageIcon="📊">
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

      {/* Quick stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Active Clients
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            {clients.length}
          </div>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Projects In Production
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            {clients.filter(c => c.status === "In Production").length}
          </div>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Upcoming Deadlines
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>
            8
          </div>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
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
      <div style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        marginBottom: "24px",
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
                }}>Client</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                  position: "sticky",
                  top: 0,
                }}>Status</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                  position: "sticky",
                  top: 0,
                }}>Current Phase</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: colors.textSecondary,
                  fontWeight: "500",
                  position: "sticky",
                  top: 0,
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>{client.name}</td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor: client.status === "In Production" ? "#EF4444" : 
                                      client.status === "Pre-Launch" ? "#3B82F6" : "#10B981",
                      color: "white",
                      marginRight: "8px",
                    }}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>{client.phase}</td>
                  <td style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
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
                        router.push("/clients");
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
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
        marginTop: "24px",
      }}>
        {team.map((member, index) => (
          <div key={index} style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "8px",
              }}>{member.name}</div>
              <span style={{
                display: "inline-block",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: colors.accent,
              }}>
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
            {/* Show tasks assigned to this team member */}
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
            
            {/* Display a message if no tasks are assigned */}
            {personalTasks.filter((task) => task.assigned === member.name).length === 0 && (
              <div style={{
                padding: "8px",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "4px",
                fontSize: "13px",
                color: colors.textSecondary,
                textAlign: "center",
              }}>
                No tasks assigned
              </div>
            )}
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
                setSelectedTeamMember(member.name);
                router.push("/tasks");
              }}
            >
              View All Tasks
            </button>
          </div>
        ))}
      </div>
    </NotionLayout>
  );
}