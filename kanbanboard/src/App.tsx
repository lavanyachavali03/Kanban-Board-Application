import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Column } from './components/Column';
import { useKanbanStore } from './store/kanbanStore';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { tasks, columns, columnOrder, moveTask } = useKanbanStore();

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(source, destination);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Kanban Board
        </h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 justify-center flex-wrap">
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);
              return <Column key={column.id} column={column} tasks={columnTasks} />;
            })}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;