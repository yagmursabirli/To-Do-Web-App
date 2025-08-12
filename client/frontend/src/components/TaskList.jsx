// src/components/TaskList.jsx
import { useEffect, useState } from "react";
import { Box } from "@mui/material"; 
import Cards from "./Cards";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then(res => {
                if (!res.ok) throw new Error("data fetch error");
                return res.json();
            })
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading
                (false);
            });
    }, []);

    // loading page koy
    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;

    return (
        <Box 
            sx={{ 
                display: "flex", 
                flexWrap: "wrap"
            }}
        >
            {tasks.map(task => (
                <Cards
                    key={task.id}
                    task={task}
                    onDelete={(id) => handleDelete(id)}
                    onStatusChange={(id, newStatus) => handleStatusChange(id, newStatus)}
                />
            ))}
        </Box>
    );

   
    function handleDelete(id) {
        fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("Silme hatası");
                setTasks(prev => prev.filter(t => t.id !== id));
            })
            .catch(err => console.error(err));
    }

    function handleStatusChange(id, newStatus) {
        fetch(`http://localhost:5000/api/tasks/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => {
                if (!res.ok) throw new Error("Güncelleme hatası");
                setTasks(prev =>
                    prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
                );
            })
            .catch(err => console.error(err));
    }
}