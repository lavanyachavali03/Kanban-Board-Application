export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
  addTask: (columnId: string, title: string, description: string) => void;
  moveTask: (source: DragSource, destination: DragDestination) => void;
}

export interface DragSource {
  droppableId: string;
  index: number;
}

export interface DragDestination {
  droppableId: string;
  index: number;
}