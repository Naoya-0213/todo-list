// 型定義
export type TodoStatus = `未着手` | `進行中` | `完了`;

export interface Todo {
  id: string;
  title: string;
  detail: string;
  status: TodoStatus;

  // TODOの期限用、省略可能
  dueDate?: string;

  //  値があるときはOK,省略可能
  //  編集中かどうかを表す
  isEditing?: boolean;
}
