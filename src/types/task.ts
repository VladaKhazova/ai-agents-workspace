import type { AgentId } from "./agent";

export type SubtaskStatus = "pending" | "done";

export interface Subtask {
    id: string;
    title: string;
    owner: AgentId;
    status: SubtaskStatus;
    result: string;
}
