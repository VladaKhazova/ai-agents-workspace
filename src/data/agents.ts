import type { Agent } from "../types/agent";

export const initialAgents: Agent[] = [
    {
        id: "rulerProcess",
        name: "RulerProcess",
        role: "Управляет процессом",
        description: "Принимает задачу и запускает работу системы",
        status: "idle",
    },
    {
        id: "planner",
        name: "Planner",
        role: "Планирует",
        description: "Делит задачу на понятные подзадачи",
        status: "idle",
    },
    {
        id: "worker",
        name: "Worker",
        role: "Выполняет",
        description: "Обрабатывает подзадачи и возвращает результаты",
        status: "idle",
    },
    {
        id: "reviewer",
        name: "Reviewer",
        role: "Проверяет",
        description: "Собирает итоговый результат для пользователя",
        status: "idle",
    },
];