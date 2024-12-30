import { createContext, useContext, useState, useCallback } from 'react';
import type { Task, TaskFilter } from '../types';
import * as api from '../lib/api';
import { useToast } from '../hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getTasks(filter !== 'all' ? filter : undefined);
      setTasks(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [filter, toast]);

  const addTask = async (title: string) => {
    try {
      const newTask = await api.createTask(title);
      setTasks((prev) => [...prev, newTask]);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        isLoading,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}