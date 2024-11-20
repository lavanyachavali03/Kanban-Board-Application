import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KanbanState, DragSource, DragDestination } from '../types/kanban';

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'Create project structure',
          description: 'Set up initial files and configurations',
          createdAt: new Date().toISOString(),
        },
        'task-2': {
          id: 'task-2',
          title: 'Implement drag and drop',
          description: 'Add DnD functionality to the board',
          createdAt: new Date().toISOString(),
        },
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To Do',
          taskIds: ['task-1'],
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: ['task-2'],
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3'],
      addTask: (columnId, title, description) =>
        set((state) => {
          const newTaskId = `task-${Date.now()}`;
          const newTask = {
            id: newTaskId,
            title,
            description,
            createdAt: new Date().toISOString(),
          };

          return {
            tasks: { ...state.tasks, [newTaskId]: newTask },
            columns: {
              ...state.columns,
              [columnId]: {
                ...state.columns[columnId],
                taskIds: [...state.columns[columnId].taskIds, newTaskId],
              },
            },
          };
        }),
      moveTask: (source: DragSource, destination: DragDestination) =>
        set((state) => {
          if (!destination) return state;

          const sourceColumn = state.columns[source.droppableId];
          const destColumn = state.columns[destination.droppableId];
          const newTaskIds = Array.from(sourceColumn.taskIds);
          const [removed] = newTaskIds.splice(source.index, 1);
          
          if (source.droppableId === destination.droppableId) {
            newTaskIds.splice(destination.index, 0, removed);
            return {
              columns: {
                ...state.columns,
                [source.droppableId]: {
                  ...sourceColumn,
                  taskIds: newTaskIds,
                },
              },
            };
          }

          const destTaskIds = Array.from(destColumn.taskIds);
          destTaskIds.splice(destination.index, 0, removed);

          return {
            columns: {
              ...state.columns,
              [source.droppableId]: {
                ...sourceColumn,
                taskIds: newTaskIds,
              },
              [destination.droppableId]: {
                ...destColumn,
                taskIds: destTaskIds,
              },
            },
          };
        }),
    }),
    {
      name: 'kanban-storage',
    }
  )
);