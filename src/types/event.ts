import type { AgentId } from "./agent";

export interface EventItem {
    id: string;
    agentId: AgentId;
    title: string;
    description: string;
}
