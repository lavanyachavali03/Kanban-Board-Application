import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar } from 'lucide-react';
import { Task } from '../types/kanban';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const date = new Date(task.createdAt).toLocaleDateString();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 shadow-sm 
            hover:shadow-md transition-all duration-200
            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}
        >
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {task.description}
          </p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{date}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}