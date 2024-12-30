import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { TaskList } from '../components/task/TaskList';
import { NewTaskForm } from '../components/task/NewTaskForm';
import { Button } from '../components/ui/button';
import { LogOut, CheckSquare } from 'lucide-react';

export function TasksPage() {
  const { user, logout } = useAuth();
  const { fetchTasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Welcome, {user?.name}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <NewTaskForm />
          <TaskList />
        </div>
      </main>
    </div>
  );
}