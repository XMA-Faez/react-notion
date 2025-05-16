"use client";
import React, { useState } from "react";
import NotionLayout from "../notion-layout";
import BlockEditor from "../../components/BlockEditor";
import ViewSwitcher from "../../components/ViewSwitcher";
import { useNotion } from "../context/NotionContext";
import { ChevronDown, ChevronRight, Filter, FileVideo, Clock, Film } from "lucide-react";

export default function VideoProduction() {
  const { 
    team,
    personalTasks,
    viewType,
    setViewType,
  } = useNotion();
  
  // Video page-specific state
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Video Production Hub", type: "heading" },
    { id: 2, content: "Track videos through the production lifecycle.", type: "paragraph" },
  ]);
  const [showProperties, setShowProperties] = useState(false);
  
  // Video projects data
  const videoProjects = [
    { 
      id: "v1", 
      title: "Metaphase Global Product Showcase", 
      status: "In Production", 
      dueDate: "2025-05-18", 
      assignedTo: "Videographer 1",
      client: "Metaphase Global",
      thumbnailBg: "#E11D48"
    },
    { 
      id: "v2", 
      title: "Dubai Luxury Real Estate Tour", 
      status: "Planning", 
      dueDate: "2025-05-22", 
      assignedTo: "Videographer 2",
      client: "Dubai Luxury Real Estate",
      thumbnailBg: "#2563EB"
    },
    { 
      id: "v3", 
      title: "Al Manzil Hotels Promotional", 
      status: "Concept", 
      dueDate: "2025-05-25", 
      assignedTo: "Videographer 1",
      client: "Al Manzil Hotels",
      thumbnailBg: "#059669"
    },
    { 
      id: "v4", 
      title: "Sheikh Investment Group Testimonials", 
      status: "Editing", 
      dueDate: "2025-05-19", 
      assignedTo: "Videographer 2",
      client: "Sheikh Investment Group",
      thumbnailBg: "#7C3AED"
    },
  ];

  // Video team members
  const videoTeam = team.filter(m => m.role === "Video Team");
  
  // Video production stages
  const productionStages = {
    "Concept": [
      { id: "vt1", name: "Concept Brief Creation", client: "Al Manzil Hotels", assignee: "Videographer 1", dueDate: "2025-05-18" },
      { id: "vt2", name: "Storyboard Development", client: "Al Manzil Hotels", assignee: "Videographer 1", dueDate: "2025-05-20" },
    ],
    "Planning": [
      { id: "vt3", name: "Location Scouting", client: "Dubai Luxury Real Estate", assignee: "Videographer 2", dueDate: "2025-05-17" },
      { id: "vt4", name: "Equipment Prep", client: "Dubai Luxury Real Estate", assignee: "Videographer 2", dueDate: "2025-05-18" },
    ],
    "In Production": [
      { id: "vt5", name: "Product Shoot Day 1", client: "Metaphase Global", assignee: "Videographer 1", dueDate: "2025-05-16" },
      { id: "vt6", name: "Product Shoot Day 2", client: "Metaphase Global", assignee: "Videographer 1", dueDate: "2025-05-17" },
    ],
    "Editing": [
      { id: "vt7", name: "Rough Cut Editing", client: "Sheikh Investment Group", assignee: "Videographer 2", dueDate: "2025-05-19" },
      { id: "vt8", name: "Client Feedback Review", client: "Sheikh Investment Group", assignee: "Videographer 2", dueDate: "2025-05-20" },
    ],
    "Delivery": [],
  };
  
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
    { name: "Created by", value: "Videographer 1" },
    { name: "Last edited", value: "May 15, 2025" },
    { name: "Tags", value: "Video, Production, Content" }
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
    <NotionLayout pageTitle="Video Production" pageIcon="🎬">
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
      
      {/* Video team stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {videoTeam.map((member) => (
          <div key={member.name} style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            flex: 1,
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "8px" 
            }}>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>{member.name}</div>
              <div style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: colors.accent,
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "12px",
              }}>
                {member.tasks} Tasks
              </div>
            </div>
            <div style={{ fontSize: "14px", color: colors.textSecondary, marginBottom: "12px" }}>
              {member.email}
            </div>
            
            {/* Progress bar */}
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "12px", marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
                <span>Production Load</span>
                <span>{Math.floor(65 + Math.random() * 25)}%</span>
              </div>
              <div style={{ 
                width: "100%", 
                height: "4px", 
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "2px",
              }}>
                <div style={{ 
                  width: `${Math.floor(65 + Math.random() * 25)}%`, 
                  height: "100%", 
                  backgroundColor: colors.accent,
                  borderRadius: "2px",
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>Video Projects</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: "13px",
            cursor: "pointer",
            color: colors.textSecondary,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <Filter size={14} />
            <span>Filter</span>
          </div>
        </div>
      </div>
      
      <ViewSwitcher viewType={viewType} setViewType={setViewType} />
      
      {/* Kanban view for video projects */}
      {viewType === "kanban" && (
        <div style={{
          display: "flex",
          gap: "16px",
          overflow: "auto",
          padding: "4px 0 16px 0",
        }}>
          {Object.entries(productionStages).map(([stageName, tasks]) => (
            <div key={stageName} style={{
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
                <span>{stageName}</span>
                <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
                  {tasks.length}
                </span>
              </div>

              {tasks.map((task, index) => (
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
                  <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                    {task.client}
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: colors.textSecondary,
                    fontSize: "12px",
                    marginTop: "8px",
                  }}>
                    <span>{task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              ))}

              {/* Add task button */}
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
            </div>
          ))}
        </div>
      )}
      
      {/* Grid view for video projects */}
      {viewType === "table" && (
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
                  }}>Project</th>
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
                  }}>Due Date</th>
                  <th style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.textSecondary,
                    fontWeight: "500",
                    position: "sticky",
                    top: 0,
                  }}>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {videoProjects.map((project) => (
                  <tr key={project.id}>
                    <td style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: project.thumbnailBg,
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <FileVideo size={16} color="white" />
                        </div>
                        {project.title}
                      </div>
                    </td>
                    <td style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>{project.client}</td>
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
                        backgroundColor: 
                          project.status === "In Production" ? "#EF4444" : 
                          project.status === "Editing" ? "#3B82F6" : 
                          project.status === "Planning" ? "#F59E0B" :
                          project.status === "Concept" ? "#8B5CF6" : "#10B981",
                        color: "white",
                      }}>
                        {project.status}
                      </span>
                    </td>
                    <td style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Clock size={14} color={colors.textSecondary} />
                        {project.dueDate}
                      </div>
                    </td>
                    <td style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>{project.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* List view for video projects */}
      {viewType === "list" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          {videoProjects.map((project) => (
            <div key={project.id} style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: project.thumbnailBg,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Film size={20} color="white" />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "4px" }}>
                  {project.title}
                </div>
                <div style={{ fontSize: "13px", color: colors.textSecondary }}>
                  {project.client}
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: colors.textSecondary }}>
                  Due: {project.dueDate}
                </div>
                
                <span style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: 
                    project.status === "In Production" ? "#EF4444" : 
                    project.status === "Editing" ? "#3B82F6" : 
                    project.status === "Planning" ? "#F59E0B" :
                    project.status === "Concept" ? "#8B5CF6" : "#10B981",
                  color: "white",
                }}>
                  {project.status}
                </span>
                
                <div style={{ fontSize: "13px" }}>
                  {project.assignedTo}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Calendar view (simplified) */}
      {viewType === "calendar" && (
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "16px", fontSize: "16px", fontWeight: "500" }}>
            May 2025
          </div>
          
          <div style={{ textAlign: "center", color: colors.textSecondary, marginBottom: "24px" }}>
            Calendar view would display video projects by due date
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px",
          }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} style={{ 
                textAlign: "center", 
                fontSize: "12px", 
                fontWeight: "500", 
                color: colors.textSecondary,
                padding: "8px 0"
              }}>
                {day}
              </div>
            ))}
            
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 3; // May 2025 starts on a Thursday (index 4)
              const isCurrentMonth = day > 0 && day <= 31;
              const hasEvent = isCurrentMonth && videoProjects.some(p => 
                p.dueDate === `2025-05-${day.toString().padStart(2, '0')}`
              );
              
              return (
                <div key={i} style={{
                  padding: "8px",
                  height: "80px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  opacity: isCurrentMonth ? 1 : 0.5,
                }}>
                  <div style={{ fontSize: "12px", marginBottom: "4px" }}>
                    {isCurrentMonth ? day : ""}
                  </div>
                  
                  {isCurrentMonth && videoProjects.filter(p => 
                    p.dueDate === `2025-05-${day.toString().padStart(2, '0')}`
                  ).map(project => (
                    <div key={project.id} style={{
                      backgroundColor: project.thumbnailBg,
                      color: "white",
                      fontSize: "10px",
                      padding: "2px 4px",
                      borderRadius: "2px",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {project.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </NotionLayout>
  );
}