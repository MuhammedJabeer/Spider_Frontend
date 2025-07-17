import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Authcontext';
import axios from '../axios/axios';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [showData, setShowData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Logout Successfully');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;

    try {
      if (isEditing) {
        const res = await axios.put(`/Update/${editingId}`, {
          ...formData,
          userId
        });
        toast.success(res.data.message);
      } else {
        const res = await axios.post('/Add', { ...formData, userId });
        toast.success(res.data.message );
      }

     
      setFormData({ title: "", description: "" ,status: "pending"});
      setIsEditing(false);
      setEditingId(null);
      fetchData(); 

    } catch (error) {
      console.log("Error submitting task:", error);
    }
  };

  
  const fetchData = async () => {
    try {
      const res = await axios.get(`/Read/${user.id}`);
      setShowData(res.data.Data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  
  const handleEdit = (task) => {
    setFormData({ title: task.title, description: task.description ,status: task.status});
    setEditingId(task._id);
    setIsEditing(true);
  };

const handleDelete=async(task)=>{
    try{
         const DeleteId=task._id   
        const res=await axios.delete(`/Delete/${DeleteId}`)
        toast.success(res.data.message)
        fetchData()
    }catch(error){

    }
        
}

  return (
    <>
      <header className="header">
        <h1 className="logo">ToDo List</h1>
        <p className="subtitle">Manage your tasks efficiently</p>
        <div className="btns">
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Enter task description"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
          <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
        </form>
      </header>

      <div className="todo-app">
        <main className="todo-main">
          {showData.length > 0 ? (
            showData.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  
                  <p className="task-desc">{task.description}</p>
                  <p className={`task-status ${task.status === 'completed' ? 'green' : 'red'}`}>
                     {task.status}
                     </p>
                </div>
                <div className="task-actions">
                  <button className="edit" onClick={() => handleEdit(task)}>Edit</button>
                   <button className="Delete" onClick={() => handleDelete(task)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>© 2025 ToDo App. Made with ❤️</p>
      </footer>
    </>
  );
}

export default Home;
