"use client";
import React, { useState } from "react";
import NotionLayout from "../notion-layout";
import BlockEditor from "../../components/BlockEditor";
import ViewSwitcher from "../../components/ViewSwitcher";
import { useNotion } from "../context/NotionContext";
import { 
  ChevronDown, ChevronRight, CheckCircle, Circle, 
  Clock, AlertCircle, CalendarDays, Filter, Plus,
  Tag, User
} from "lucide-react";

export default function Tasks() {
  const { 
    team,
    personalTasks,
    selectedTeamMember,
    setSelectedTeamMember,
    viewType,
    setViewType,
  } = useNotion();
  
  // Tasks page-specific state
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Team Tasks", type: "heading" },
    { id: 2, content: "Track and manage tasks and deadlines across the team.", type: "paragraph" },
  ]);
  const [showProperties, setShowProperties] = useState(false);
  
  // Task status categories
  const taskStatuses = {
    "To Do": personalTasks.filter(task => 
      (selectedTeamMember === "All" || task.assigned === selectedTeamMember) &&
      !task.status),
    "In Progress": personalTasks.filter(task => 
      (selectedTeamMember === "All" || task.assigned === selectedTeamMember) &&
      task.status === "In Progress"),
    "Done": personalTasks.filter(task => 
      (selectedTeamMember === "All" || task.assigned === selectedTeamMember) &&
      task.status === "Done"),
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
    { name: "Created by", value: "CEO" },
    { name: "Last edited", value: "May 15, 2025" },
    { name: "Tags", value: "Tasks, Todo, Management" }
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
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "#EF4444";
      case "Medium": return "#F59E0B";
      case "Low": return "#10B981";
      default: return colors.textSecondary;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case "Done": return <CheckCircle size={16} color="#10B981" />;
      case "In Progress": return <Clock size={16} color="#F59E0B" />;
      default: return <Circle size={16} color={colors.textSecondary} />;
    }
  };

  return (
    <NotionLayout pageTitle="Team Tasks" pageIcon="✅">
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
      
      {/* Team member selector */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        marginTop: "16px",
      }}>
        <h3 style={{ fontSize: "18px" }}>
          {selectedTeamMember === "All" ? "All Team Tasks" : `${selectedTeamMember}'s Tasks`}
        </h3>
        
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ fontSize: "14px", color: colors.textSecondary }}>
            Viewing tasks for:
          </div>
          <select
            value={selectedTeamMember}
            onChange={(e) => setSelectedTeamMember(e.target.value)}
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: colors.text,
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          >
            <option value="All">All Team Members</option>
            {team.map((member) => (
              <option key={member.name} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* View switcher */}
      <ViewSwitcher viewType={viewType} setViewType={setViewType} />
      
      {/* Kanban view */}
      {viewType === "kanban" && (
        <div style={{
          display: "flex",
          gap: "16px",
          overflow: "auto",
          padding: "4px 0 16px 0",
        }}>
          {Object.entries(taskStatuses).map(([status, tasks]) => (
            <div key={status} style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              padding: "12px",
              minWidth: "280px",
              flex: 1,
            }}>
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}>
                <span>{status}</span>
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
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "8px",
                  }}>
                    <div style={{ paddingTop: "2px" }}>
                      {getStatusIcon(task.status)}
                    </div>
                    <div style={{
                      fontWeight: "500",
                      flex: 1,
                    }}>{task.task}</div>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: colors.textSecondary,
                    fontSize: "12px",
                  }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <User size={12} />
                        {task.assigned}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} />
                        {task.dueDate}
                      </span>
                    </div>
                    
                    <span style={{
                      display: "flex",
                      alignItems: "center", 
                      gap: "4px",
                      color: getPriorityColor(task.priority),
                    }}>
                      <AlertCircle size={12} />
                      {task.priority}
                    </span>
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
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Plus size={14} />
                Add Task
              </button>
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
                    width: "32px",
                  }}></th>
                  <th style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.textSecondary,
                    fontWeight: "500",
                    position: "sticky",
                    top: 0,
                  }}>Task</th>
                  <th style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.textSecondary,
                    fontWeight: "500",
                    position: "sticky",
                    top: 0,
                  }}>Assigned To</th>
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
                  }}>Priority</th>
                  <th style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.textSecondary,
                    fontWeight: "500",
                    position: "sticky",
                    top: 0,
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {personalTasks
                  .filter(task => selectedTeamMember === "All" || task.assigned === selectedTeamMember)
                  .map((task, idx) => (
                    <tr key={task.id}>
                      <td style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        textAlign: "center",
                      }}>
                        {getStatusIcon(task.status)}
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}>{task.task}</td>
                      <td style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <User size={14} color={colors.textSecondary} />
                          {task.assigned}
                        </div>
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <CalendarDays size={14} color={colors.textSecondary} />
                          {task.dueDate}
                        </div>
                      </td>
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
                          backgroundColor: `${getPriorityColor(task.priority)}20`,
                          color: getPriorityColor(task.priority),
                        }}>
                          {task.priority}
                        </span>
                      </td>
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
                          backgroundColor: task.status === "Done" 
                            ? "rgba(16, 185, 129, 0.2)" 
                            : task.status === "In Progress" 
                              ? "rgba(245, 158, 11, 0.2)" 
                              : "rgba(255, 255, 255, 0.1)",
                          color: task.status === "Done" 
                            ? "#10B981" 
                            : task.status === "In Progress" 
                              ? "#F59E0B" 
                              : colors.textSecondary,
                        }}>
                          {task.status || "To Do"}
                        </span>
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
          {personalTasks
            .filter(task => selectedTeamMember === "All" || task.assigned === selectedTeamMember)
            .map((task) => (
              <div key={task.id} style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <div style={{ 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                }}>
                  {getStatusIcon(task.status)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "4px" }}>
                    {task.task}
                  </div>
                  <div style={{ fontSize: "13px", color: colors.textSecondary }}>
                    Assigned to {task.assigned}
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "13px", color: colors.textSecondary, display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} />
                    {task.dueDate}
                  </div>
                  
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: `${getPriorityColor(task.priority)}20`,
                    color: getPriorityColor(task.priority),
                  }}>
                    {task.priority}
                  </span>
                  
                  {task.status && (
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor: task.status === "Done" 
                        ? "rgba(16, 185, 129, 0.2)" 
                        : "rgba(245, 158, 11, 0.2)",
                      color: task.status === "Done" 
                        ? "#10B981" 
                        : "#F59E0B",
                    }}>
                      {task.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
          {/* Add new task button */}
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "none",
            borderRadius: "8px",
            color: colors.textSecondary,
            fontSize: "14px",
            cursor: "pointer",
            marginTop: "8px",
          }}>
            <Plus size={16} />
            Add a new task
          </button>
        </div>
      )}
      
      {/* Calendar view */}
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
              const tasksOnDay = personalTasks.filter(task => 
                (selectedTeamMember === "All" || task.assigned === selectedTeamMember) &&
                task.dueDate === `2025-05-${day.toString().padStart(2, '0')}`
              );
              
              return (
                <div key={i} style={{
                  padding: "8px",
                  height: "80px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  opacity: isCurrentMonth ? 1 : 0.5,
                  overflow: "hidden",
                }}>
                  <div style={{ fontSize: "12px", marginBottom: "4px" }}>
                    {isCurrentMonth ? day : ""}
                  </div>
                  
                  {tasksOnDay.map(task => (
                    <div key={task.id} style={{
                      backgroundColor: getPriorityColor(task.priority),
                      color: "white",
                      fontSize: "10px",
                      padding: "2px 4px",
                      borderRadius: "2px",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {task.task}
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