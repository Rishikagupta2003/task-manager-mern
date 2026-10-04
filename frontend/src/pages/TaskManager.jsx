import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import FilterBar from '../components/FilterBar';

const TaskManager = () => {
  const { filter } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate filter route
  useEffect(() => {
    if (!['all', 'pending', 'completed'].includes(filter)) {
      navigate('/tasks/all');
    }
  }, [filter, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.getTasks(filter);
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleAddTask = async (taskData) => {
    try {
      const res = await api.createTask(taskData);
      // Only add locally if it matches current filter (all or pending)
      if (filter === 'all' || filter === 'pending') {
        setTasks([res.data, ...tasks]);
      }
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const res = await api.updateTask(id, updates);
      
      // If it no longer matches the filter, remove it, else update it
      if (
        (filter === 'pending' && res.data.status === 'completed') ||
        (filter === 'completed' && res.data.status === 'pending')
      ) {
        setTasks(tasks.filter(t => t._id !== id));
      } else {
        setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      }
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleFilterChange = (newFilter) => {
    navigate(`/tasks/${newFilter}`);
  };

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />
      
      <FilterBar 
        currentFilter={filter || 'all'} 
        onFilterChange={handleFilterChange} 
      />

      {error && <div style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

      <div className="task-list">
        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            No tasks found. {filter === 'all' ? 'Add one above!' : `You have no ${filter} tasks.`}
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onUpdate={handleUpdateTask} 
              onDelete={handleDeleteTask} 
            />
          ))
        )}
      </div>
    </>
  );
};

export default TaskManager;
