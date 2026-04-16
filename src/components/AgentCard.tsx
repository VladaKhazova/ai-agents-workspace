import type { Agent } from "../types/agent";
import StatusBadge from "./StatusBadge";

type Props = {
    agent: Agent;
};

function AgentCard({ agent }: Props) {
    return (
        <article className="card">
            <div className="card__header">
                <div>
                    <h3 className="card__title">{agent.name}</h3>
                    <p className="card__subtitle">{agent.role}</p>
                </div>
                <StatusBadge status={agent.status} />
            </div>

            <p className="card__text">{agent.description}</p>
        </article>
    );
}

export default AgentCard;