export function fetchPlan(task: string): Promise<string[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const text = task.toLowerCase();

            if (text.includes("поезд") || text.includes("Ijevsk") || text.includes("ижевск")) {
                resolve([
                    "Определить цель поездки",
                    "Собрать список основных расходов",
                    "Подготовить список вещей",
                    "Сделать короткий план по дням",
                ]);
                return;
            }

            if (text.includes("стать") || text.includes("article") || text.includes("структур")) {
                resolve([
                    "Определить тему и цель материала",
                    "Разбить тему на блоки",
                    "Собрать тезисы по каждому блоку",
                    "Сделать итоговый outline",
                ]);
                return;
            }

            resolve([
                "Уточнить цель задачи",
                "Разбить задачу на шаги",
                "Подготовить промежуточные результаты",
                "Собрать итоговый ответ",
            ]);
        }, 600);
    });
}

export function fetchSubtaskResult(subtaskTitle: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Результат для шага: ${subtaskTitle}.`);
        }, 400);
    });
}

export function fetchFinalResult(task: string, results: string[]): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lines = results.map((item, index) => `${index + 1}. ${item}`).join("\n");

            resolve(
                `Задача: ${task}\n\nИтог:\n${lines}\n\nЗадача обработана системой агентов и собрана в единый результат.`
            );
        }, 600);
    });
}
