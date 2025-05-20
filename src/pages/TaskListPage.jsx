import { useState, useMemo, useContext, useRef, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRowComponent from "../components/common/TaskRowComponent.jsx";

const STATUS_ORDER = {
    "To do": 0,
    "Doing": 1,
    "Done": 2,
};

export default function TaskListPage() {
    const { data } = useContext(GlobalContext);

    // Stato per ordinamento
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    // Stato per la ricerca
    const [searchQuery, setSearchQuery] = useState("");
    const debounceTimeout = useRef(null);

    // Funzione debounce per la ricerca
    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setSearchQuery(value);
        }, 400);
    }, []);

    // Gestione click sulle intestazioni
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    };

    // Memo per filtrare e ordinare i task
    const sortedTasks = useMemo(() => {
        if (!data) return [];
        let filtered = data;
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }
        const tasksCopy = [...filtered];
        tasksCopy.sort((a, b) => {
            let result = 0;
            if (sortBy === "title") {
                result = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                result = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            } else if (sortBy === "createdAt") {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return result * sortOrder;
        });
        return tasksCopy;
    }, [data, sortBy, sortOrder, searchQuery]);

    return (
        <section>
            <h1>LISTA TASK</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    className="form-control"
                    onChange={handleSearch}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
                            Titolo {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("createdAt")}>
                            Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map((task) => (
                        <TaskRowComponent key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
            <p className="pt-3">Clicca su un Task per visualizzare i Dettagli</p>
        </section>
    );
}