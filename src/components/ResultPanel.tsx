type Props = {
    result: string;
};

function ResultPanel({ result }: Props) {
    return (
        <section className="panel">
            <h2 className="section-title">Итоговый результат</h2>

            {result ? (
                <pre className="result-box">{result}</pre>
            ) : (
                <p className="empty-text">Финальный результат появится после запуска</p>
            )}
        </section>
    );
}

export default ResultPanel;