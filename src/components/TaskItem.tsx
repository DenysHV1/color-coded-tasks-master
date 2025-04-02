import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { getColorClass } from '@/lib/taskUtils';
import { Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  showOverdue?: boolean;
}

export const TaskItem = ({ task, onToggle, onDelete, showOverdue = false }: TaskItemProps) => {
  return (
    <div
      className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border transition-all hover:shadow-md dark:hover:shadow-gray-900/50 ${getColorClass(
        task.color
      )} dark:border-gray-700`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-600 dark:data-[state=checked]:border-purple-400"
      />
      <div className="flex-1 min-w-0">
        <span
          className={`block text-sm ${
            task.completed 
              ? 'line-through text-gray-400' 
              : 'text-black'
          }`}
        >
          {task.text}
        </span>
        {task.dueDate && (
          <Badge 
            variant={showOverdue ? "destructive" : "outline"} 
            className="mt-1 text-xs font-normal dark:border-gray-600 dark:text-gray-200"
          >
            {showOverdue ? 'Overdue: ' : 'Due: '}
            {format(task.dueDate, "PPP")}
          </Badge>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50 p-1 sm:p-2"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl dark:text-gray-100">Delete Task</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 sm:mt-6">
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 text-sm sm:text-base">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => onDelete(task.id)}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white text-sm sm:text-base"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 