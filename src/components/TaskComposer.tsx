type Props = {
    value: string;
    examples: string[];
    disabled: boolean;
    onChange: (value: string) => void;
    onRun: () => void;
    onReset: () => void;
};

function TaskComposer({value, examples, disabled, onChange, onRun, onReset,}: Props) {
    return (
        <section className="panel">
            <h2 className="section-title">Новая задача</h2>

            <label className="label" htmlFor="task-input">
                Опишите задачу для системы агентов
            </label>

            <textarea
                id="task-input"
                className="textarea"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Например: составь структуру статьи про AI-агентов"
                rows={5}
            />

            <div className="button-row">
                <button className="button button--primary" onClick={onRun} disabled={disabled}>
                    Запустить
                </button>

                <button className="button button--secondary" onClick={onReset}>
                    Сбросить
                </button>
            </div>

            <div className="examples">
                <p className="examples__title">Примеры задач:</p>

                <div className="examples__list">
                    {examples.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="example-chip"
                            onClick={() => onChange(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TaskComposer;