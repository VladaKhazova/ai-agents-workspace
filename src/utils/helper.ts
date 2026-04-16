import type { Agent, AgentId, AgentStatus } from "../types/agent";
import type { EventItem } from "../types/event";
import type { Subtask } from "../types/task";

export function setAgentStatus(agents: Agent[], agentId: AgentId, status: AgentStatus): Agent[] {
    return agents.map((agent) =>
        agent.id === agentId ? { ...agent, status } : agent
    );
}

export function resetAgents(agents: Agent[]): Agent[] {
    return agents.map((agent) => ({ ...agent, status: "idle" }));
}

export function createEvent(agentId: AgentId, title: string, description: string): EventItem {
    return {
        id: `${Date.now()}-${Math.random()}`,
        agentId,
        title,
        description,
    };
}

export function createSubtasks(plan: string[]): Subtask[] {
    return plan.map((title, index) => ({
        id: `subtask-${index + 1}`,
        title,
        owner: index === plan.length - 1 ? "reviewer" : "worker",
        status: "pending",
        result: "",
    }));
}

export function fillSubtaskResults(subtasks: Subtask[], results: string[]): Subtask[] {
    return subtasks.map((subtask, index) => ({
        ...subtask,
        status: "done",
        result: results[index] || "",
    }));
}