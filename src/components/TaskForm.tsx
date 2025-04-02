import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ColorOption, colors } from '@/types/task';

interface TaskFormProps {
  newTask: string;
  selectedColor: string;
  dueDate?: Date;
  onNewTaskChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onDueDateChange: (date?: Date) => void;
  onSubmit: () => void;
}

export const TaskForm = ({
  newTask,
  selectedColor,
  dueDate,
  onNewTaskChange,
  onColorChange,
  onDueDateChange,
  onSubmit,
}: TaskFormProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 shadow-sm mb-4 sm:mb-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <Label htmlFor="new-task" className="text-sm font-medium text-gray-700 dark:text-gray-200">New Task</Label>
            <Input
              id="new-task"
              type="text"
              value={newTask}
              onChange={(e) => onNewTaskChange(e.target.value)}
              placeholder="What needs to be done?"
              className="mt-1.5 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
          <div className="w-full sm:w-[140px]">
            <Label htmlFor="task-color" className="text-sm font-medium text-gray-700 dark:text-gray-200">Color</Label>
            <Select value={selectedColor} onValueChange={onColorChange}>
              <SelectTrigger 
                id="task-color" 
                className="mt-1.5 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
              >
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {colors.map((color: ColorOption) => (
                  <SelectItem 
                    key={color.value} 
                    value={color.value}
                    className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base"
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: color.value === 'default' ? '#e5e7eb' : color.value }} 
                    />
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-[200px]">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full mt-1.5 justify-start text-left font-normal border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {dueDate ? format(dueDate, "PPP") : <span className="text-gray-500 dark:text-gray-400">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={onDueDateChange}
                  initialFocus
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={onSubmit}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-4 sm:px-6 text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 