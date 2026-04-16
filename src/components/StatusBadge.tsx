type Props = {
    status: "idle" | "active" | "done" | "pending";
};

function StatusBadge({ status }: Props) {
    let className = "status-badge";
    let text = "";

    if (status === "idle") {
        className += " status-badge--idle";
        text = "Ожидает";
    }

    if (status === "active") {
        className += " status-badge--active";
        text = "Активен";
    }

    if (status === "done") {
        className += " status-badge--done";
        text = "Готово";
    }

    if (status === "pending") {
        className += " status-badge--idle";
        text = "Ожидает";
    }

    return <span className={className}>{text}</span>;
}

export default StatusBadge;