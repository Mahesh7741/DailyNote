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
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        fetchDiaries();
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const fetchDiaries = async () => {
        try {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();
            setDiaries(data);
        } catch (error) {
            console.error('Error fetching diaries:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            alert('Title and content are required!');
            return;
        }

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

    const handleEdit = (diary) => {
        setEditing(true);
        setCurrentId(diary.id);
        setFormData({
            title: diary.title,
            content: diary.content,
            date: diary.date
        });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0]
        });
        setEditing(false);
        setCurrentId(null);
    };

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="theme-toggle">
                <button onClick={toggleDarkMode} className="toggle-button">
                    {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
            <div className="main-content">
                <div className="form-container">
                    <h1 className="form-title">
                        {editing ? '✏️ Edit Diary Entry' : '📝 Add New Diary Entry'}
                    </h1>
                    <form onSubmit={handleSubmit} className="entry-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Entry Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Write your thoughts..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="textarea-field"
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="submit-button">
                                {editing ? 'Update Entry' : 'Add Entry'}
                            </button>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="entries-container">
                    <h2 className="entries-title">📔 Your Diary Entries</h2>
                    {diaries.map((diary) => (
                        <div key={diary.id} className="diary-card">
                            <div className="diary-header">
                                <div>
                                    <h3 className="diary-title">{diary.title}</h3>
                                    <p className="diary-date">📅 {diary.date}</p>
                                </div>
                                <div className="diary-actions">
                                    <button
                                        onClick={() => handleEdit(diary)}
                                        className="edit-button"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(diary.id)}
                                        className="delete-button"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                            <p className="diary-content">{diary.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .app-container {
                    min-height: 100vh;
                    padding: 2rem;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .app-container.light {
                    background: #f5f7ff;
                    color: #333;
                }

                .app-container.dark {
                    background: #121212;
                    color: #f5f5f5;
                }

                .theme-toggle {
                    text-align: right;
                    margin-bottom: 1rem;
                }

                .toggle-button {
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    background: #4f46e5;
                    color: white;
                    border: none;
                    transition: background 0.3s ease;
                }

                .toggle-button:hover {
                    background: #4338ca;
                }

                .main-content {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .form-container {
                    flex: 1;
                    min-width: 320px;
                    max-width: 500px;
                    background: #2f2f2f;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .form-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    color: #f5f5f5;
                    text-align: center;
                }

                .entry-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .input-field, .textarea-field {
                    padding: 0.75rem;
                    border: 1px solid #e1e1e1;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                .input-field:focus, .textarea-field:focus {
                    outline: none;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
                }

                .textarea-field {
                    min-height: 150px;
                    resize: vertical;
                }

                .button-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .submit-button, .cancel-button {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .submit-button {
                    background: #4f46e5;
                    color: white;
                    border: none;
                }

                .submit-button:hover {
                    background: #4338ca;
                }

                .cancel-button {
                    background: white;
                    color: #4f46e5;
                    border: 1px solid #4f46e5;
                }

                .cancel-button:hover {
                    background: #f5f5f5;
                }

                .entries-container {
                    flex: 2;
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .entries-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    text-align: center;
                    color: #f5f5f5;
                }

                .diary-card {
                    background: #2f2f2f;
                    border-radius: 12px;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: box-shadow 0.3s ease;
                }

                .diary-card:hover {
                    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
                }

                .diary-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .diary-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #f5f5f5;
                }

                .diary-date {
                    color: #777;
                }

                .diary-actions button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #4f46e5;
                    font-size: 1rem;
                    margin-left: 0.5rem;
                    transition: color 0.3s ease;
                }

                .diary-actions button:hover {
                    color: #4338ca;
                }

                .diary-content {
                    color: #f5f5f5;
                }
            `}</style>
        </div>
    );
};

export default DiaryApp;
