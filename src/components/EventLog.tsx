import type { EventItem } from "../types/event";

type Props = {
    events: EventItem[];
};

function EventLog({ events }: Props) {
    return (
        <section className="panel" aria-live="polite">
            <h2 className="section-title">Журнал событий</h2>

            {events.length === 0 ? (
                <p className="empty-text">События пока не появились</p>
            ) : (
                <div className="stack">
                    {events.map((event) => (
                        <article key={event.id} className="item-card">
                            <h3 className="item-card__title">{event.title}</h3>
                            <p className="item-card__subtitle">Агент: {event.agentId}</p>
                            <p className="item-card__text">{event.description}</p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default EventLog;