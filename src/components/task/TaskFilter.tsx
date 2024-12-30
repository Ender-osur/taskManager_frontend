import { useTask } from '../../context/TaskContext';
import { Button } from '../ui/button';
import { TaskFilter as FilterType } from '../../types';
import { CheckCircle2, Circle, List } from 'lucide-react';

export function TaskFilter() {
  const { filter, setFilter } = useTask();

  const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <List className="h-4 w-4" /> },
    {
      value: 'pending',
      label: 'Pending',
      icon: <Circle className="h-4 w-4" />,
    },
    {
      value: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={filter === value ? 'default' : 'outline'}
          onClick={() => setFilter(value)}
          className="flex items-center gap-2"
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
}