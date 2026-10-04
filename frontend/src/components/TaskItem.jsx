import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const isCompleted = task.status === 'completed';

  const toggleStatus = () => {
    onUpdate(task._id, { status: isCompleted ? 'pending' : 'completed' });
  };

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">
          {task.title}
        </h3>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>
      <div className="task-actions">
        <button
          className={`icon-btn complete-btn ${isCompleted ? 'active' : ''}`}
          onClick={toggleStatus}
          title={isCompleted ? "Mark pending" : "Mark completed"}
        >
          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        <button
          className="icon-btn delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
