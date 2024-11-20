import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Column as ColumnType } from '../types/kanban';
import { useKanbanStore } from '../store/kanbanStore';

interface ColumnProps {
  column: ColumnType;
  tasks: any[];
}

export function Column({ column, tasks }: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const addTask = useKanbanStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addTask(column.id, newTitle, newDescription);
      setNewTitle('');
      setNewDescription('');
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 w-80">
      <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
        {column.title}
      </h2>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                     hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600
                         transition-colors duration-200"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900
                         dark:hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}