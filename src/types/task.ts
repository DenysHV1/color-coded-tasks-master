export interface Task {
  id: string;
  text: string;
  completed: boolean;
  color: string;
  dueDate?: Date;
}

export interface ColorOption {
  value: string;
  label: string;
}

export const colors: ColorOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
]; 