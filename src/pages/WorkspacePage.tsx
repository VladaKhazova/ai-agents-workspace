import { useState } from "react";
import TaskComposer from "../components/TaskComposer";
import AgentCard from "../components/AgentCard";
import TaskList from "../components/TaskList";
import EventLog from "../components/EventLog";
import ResultPanel from "../components/ResultPanel";
import { initialAgents } from "../data/agents";
import { demoTasks } from "../data/demoTasks";
import type { Agent } from "../types/agent";
import type { EventItem } from "../types/event";
import type { Subtask } from "../types/task";
import { fetchFinalResult, fetchPlan, fetchSubtaskResult } from "../api/mockApi";
import {createEvent, createSubtasks, fillSubtaskResults, resetAgents, setAgentStatus,} from "../utils/helper";

function WorkspacePage() {
    const [task, setTask] = useState(demoTasks[0]);
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [events, setEvents] = useState<EventItem[]>([]);
    const [result, setResult] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const handleReset = () => {
        setTask("");
        setAgents(resetAgents(initialAgents));
        setSubtasks([]);
        setEvents([]);
        setResult("");
        setIsRunning(false);
    };

    const handleRun = async () => {
        if (!task.trim() || isRunning) {
            return;
        }

        setIsRunning(true);
        setResult("");
        setSubtasks([]);
        setEvents([]);
        setAgents(resetAgents(initialAgents));

        let nextAgents = setAgentStatus(initialAgents, "rulerProcess", "active");
        setAgents(nextAgents);

        const nextEvents: EventItem[] = [
            createEvent("rulerProcess", "Задача принята", `Пользователь отправил задачу: ${task}`),
        ];
        setEvents(nextEvents);

        nextAgents = setAgentStatus(nextAgents, "rulerProcess", "done");
        nextAgents = setAgentStatus(nextAgents, "planner", "active");
        setAgents(nextAgents);

        const plan = await fetchPlan(task);

        nextEvents.unshift(
            createEvent("planner", "План получен", `Система выделила ${plan.length} шага(ов).`)
        );
        setEvents([...nextEvents]);

        let nextSubtasks = createSubtasks(plan);
        setSubtasks(nextSubtasks);

        nextAgents = setAgentStatus(nextAgents, "planner", "done");
        nextAgents = setAgentStatus(nextAgents, "worker", "active");
        setAgents(nextAgents);

        const subtaskResults: string[] = [];

        for (const subtask of nextSubtasks) {
            if (subtask.owner === "reviewer") {
                subtaskResults.push("Финальная сборка будет выполнена Reviewer.");
                continue;
            }

            const subtaskResult = await fetchSubtaskResult(subtask.title);
            subtaskResults.push(subtaskResult);

            nextEvents.unshift(
                createEvent("worker", "Подзадача обработана", `${subtask.title}: ${subtaskResult}`)
            );
            setEvents([...nextEvents]);
        }

        nextSubtasks = fillSubtaskResults(nextSubtasks, subtaskResults);
        setSubtasks(nextSubtasks);

        nextAgents = setAgentStatus(nextAgents, "worker", "done");
        nextAgents = setAgentStatus(nextAgents, "reviewer", "active");
        setAgents(nextAgents);

        const workerOnlyResults = subtaskResults.filter(
            (item) => item !== "Cборка будет выполнена Reviewer."
        );

        const finalText = await fetchFinalResult(task, workerOnlyResults);

        nextEvents.unshift(
            createEvent("reviewer", "Результат собран", "Reviewer подготовил итоговый ответ")
        );
        setEvents([...nextEvents]);

        setResult(finalText);

        nextAgents = setAgentStatus(nextAgents, "reviewer", "done");
        setAgents(nextAgents);
        setIsRunning(false);
    };

    return (
        <main className="page">
            <header className="hero">
                <p className="hero__eyebrow">AI Agents Workspace</p>
                <h1 className="hero__title">Система простого взаимодействия нескольких AI-агентов</h1>
                <p className="hero__text">
                    Пользователь вводит задачу, после чего агенты принимают её, разбивают на шаги,
                    обрабатывают данные и формируют единый итоговый результат
                </p>
            </header>

            <TaskComposer
                value={task}
                examples={demoTasks}
                disabled={isRunning}
                onChange={setTask}
                onRun={handleRun}
                onReset={handleReset}
            />

            <section className="panel" aria-busy={isRunning}>
                <h2 className="section-title">Агенты</h2>

                <div className="agents-grid">
                    {agents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </section>

            <div className="content-grid">
                <TaskList subtasks={subtasks} />
                <EventLog events={events} />
            </div>

            <ResultPanel result={result} />
        </main>
    );
}

export default WorkspacePage;