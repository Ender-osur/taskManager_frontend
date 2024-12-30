import { useEffect } from 'react';
import { useTask } from '../../context/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskFilter } from './TaskFilter';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function TaskList() {
  const { tasks, isLoading, fetchTasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TaskFilter />
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in-50">
      <TaskFilter />
      {tasks.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No tasks found
        </Card>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
}