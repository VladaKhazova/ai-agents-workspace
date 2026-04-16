export type AgentId = "rulerProcess" | "planner" | "worker" | "reviewer";

export type AgentStatus = "idle" | "active" | "done";

export interface Agent {
    id: AgentId;
    name: string;
    role: string;
    description: string;
    status: AgentStatus;
}
