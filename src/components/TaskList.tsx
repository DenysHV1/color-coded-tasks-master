import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Task, colors } from '@/types/task';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { getColorClass, getCompletionPercentage, getOverdueTasks } from '@/lib/taskUtils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const STORAGE_KEY = 'color-coded-tasks';

const TaskList = () => {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);
  const [newTask, setNewTask] = useState('');
  const [selectedColor, setSelectedColor] = useState('default');
  const [dueDate, setDueDate] = useState<Date>();
  const { toast } = useToast();

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        color: selectedColor,
        dueDate,
      };

      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setDueDate(undefined);
      toast({
        title: "Task added",
        description: "Your new task has been added successfully.",
      });
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const overdueTasks = getOverdueTasks(tasks);

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      {overdueTasks.length > 0 && (
        <Alert variant="destructive" className="mb-4 sm:mb-6 border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
          <AlertTitle className="text-red-800 dark:text-red-200 text-sm sm:text-base">Overdue Tasks</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300 text-xs sm:text-sm">
            You have {overdueTasks.length} overdue tasks. Please complete them soon.
          </AlertDescription>
        </Alert>
      )}

      <TaskForm
        newTask={newTask}
        selectedColor={selectedColor}
        dueDate={dueDate}
        onNewTaskChange={setNewTask}
        onColorChange={setSelectedColor}
        onDueDateChange={setDueDate}
        onSubmit={addTask}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm rounded-md transition-all text-sm sm:text-base"
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="overdue"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm rounded-md transition-all text-sm sm:text-base"
          >
            Overdue
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ScrollArea className="h-[300px] sm:h-[400px] md:h-[500px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-4 md:p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {colors.map((color) => {
                const colorTasks = tasks.filter((task) => task.color === color.value);
                if (colorTasks.length === 0) return null;

                return (
                  <AccordionItem 
                    key={color.value} 
                    value={color.value}
                    className="border-none mb-2 sm:mb-4"
                  >
                    <AccordionTrigger className={`${getColorClass(color.value)} hover:no-underline rounded-lg px-2 sm:px-4 py-2 sm:py-3 transition-all hover:shadow-md dark:hover:shadow-gray-900/50`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span 
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: color.value === 'default' ? '#e5e7eb' : color.value }} 
                        />
                        <span className="font-semibold text-black text-sm sm:text-base">{color.label}</span>
                        <Badge variant="secondary" className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                          {colorTasks.length} tasks
                        </Badge>
                        <Badge variant="outline" className="ml-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs sm:text-sm">
                          {Math.round(getCompletionPercentage(colorTasks))}% Complete
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 sm:px-4">
                      <div className="space-y-2 sm:space-y-4 pt-2 sm:pt-4">
                        <Progress 
                          value={getCompletionPercentage(colorTasks)} 
                          className="h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-700"
                        />
                        {colorTasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="overdue">
          <ScrollArea className="h-[300px] sm:h-[400px] md:h-[500px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-4 md:p-6 shadow-sm">
            <div className="space-y-2 sm:space-y-4">
              {overdueTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  showOverdue
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList; 