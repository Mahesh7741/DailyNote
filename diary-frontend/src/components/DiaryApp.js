import React, { useState, useEffect } from 'react';

const DiaryApp = () => {
    const [diaries, setDiaries] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Fetch all diaries
    useEffect(() => {
        fetchDiaries();
    }, []);

    const fetchDiaries = async () => {
        try {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();
            setDiaries(data);
        } catch (error) {
            console.error('Error fetching diaries:', error);
        }
    };

    // Handle form submission for both creating and updating
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editing
            ? `http://localhost:8080/update/${currentId}`
            : 'http://localhost:8080/add';

        try {
            const response = await fetch(url, {
                method: editing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchDiaries();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving diary:', error);
        }
    };

    // Handle deletion
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/delete/${id}`, {
                method: 'DELETE',
            });
            fetchDiaries();
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    // Set up form for editing
    const handleEdit = (diary) => {
        setEditing(true);
        setCurrentId(diary.id);
        setFormData({
            title: diary.title,
            content: diary.content,
            date: diary.date
        });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0]
        });
        setEditing(false);
        setCurrentId(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{editing ? 'Edit Diary Entry' : 'Add New Diary Entry'}</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <textarea
                        placeholder="Content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        style={{ width: '100%', padding: '8px', height: '100px', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
                    {editing ? 'Update' : 'Add'}
                </button>
                {editing && (
                    <button type="button" onClick={resetForm} style={{ padding: '8px 16px' }}>
                        Cancel
                    </button>
                )}
            </form>

            <h2>Diary Entries</h2>
            <div>
                {diaries.map((diary) => (
                    <div key={diary.id} style={{
                        border: '1px solid #ddd',
                        padding: '15px',
                        marginBottom: '10px',
                        borderRadius: '4px'
                    }}>
                        <h3>{diary.title}</h3>
                        <p><small>{diary.date}</small></p>
                        <p>{diary.content}</p>
                        <button
                            onClick={() => handleEdit(diary)}
                            style={{ marginRight: '10px', padding: '5px 10px' }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(diary.id)}
                            style={{ padding: '5px 10px' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiaryApp;