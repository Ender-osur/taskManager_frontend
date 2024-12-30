import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Plus } from 'lucide-react';

export function NewTaskForm() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setIsLoading(true);
      await addTask(title.trim());
      setTitle('');
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !title.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>
    </Card>
  );
}