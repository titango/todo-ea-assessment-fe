export interface ITodoTask {
  _id?: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
