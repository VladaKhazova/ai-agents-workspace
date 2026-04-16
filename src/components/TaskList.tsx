import type { Subtask } from "../types/task";
import StatusBadge from "./StatusBadge";

type Props = {
    subtasks: Subtask[];
};

function TaskList({ subtasks }: Props) {
    return (
        <section className="panel">
            <h2 className="section-title">Подзадачи</h2>

            {subtasks.length === 0 ? (
                <p className="empty-text">После запуска здесь появятся шаги задачи</p>
            ) : (
                <div className="stack">
                    {subtasks.map((subtask) => (
                        <article key={subtask.id} className="item-card">
                            <div className="item-card__header">
                                <div>
                                    <h3 className="item-card__title">{subtask.title}</h3>
                                    <p className="item-card__subtitle">{subtask.owner}</p>
                                </div>
                                <StatusBadge status={subtask.status} />
                            </div>

                            {subtask.result && (
                                <p className="item-card__text">{subtask.result}</p>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default TaskList;