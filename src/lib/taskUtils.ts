export const getColorClass = (color: string): string => {
  switch (color) {
    case 'red':
      return 'bg-red-100 border-red-200';
    case 'blue':
      return 'bg-blue-100 border-blue-200';
    case 'green':
      return 'bg-green-100 border-green-200';
    case 'yellow':
      return 'bg-yellow-100 border-yellow-200';
    default:
      return 'bg-gray-100 border-gray-200';
  }
};

export const getCompletionPercentage = (tasks: any[]): number => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter((task) => task.completed).length;
  return (completedTasks / tasks.length) * 100;
};

export const getOverdueTasks = (tasks: any[]): any[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return tasks.filter(task => task.dueDate && task.dueDate < today && !task.completed);
}; 