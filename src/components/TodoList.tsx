import { Todo, TodoStatus } from "../types/todo";
import { TodoItem } from "./TodoItem"; // 1件ずつ表示・編集する子コンポーネント

type Props = {
  todos: Todo[]; // TODOリスト（フィルター済み）
  onUpdateDetail: (id: string, detail: string) => void;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onUpdateDueDate: (id: string, dueDate: string) => void;
};

export const TodoList = ({
  todos,
  onUpdateDetail,
  onUpdateStatus,
  onUpdateTitle,
  onUpdateDueDate,
}: Props) => {
  return (
    <div>
      {/* TODOリストを一件ずつ表示（map) */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // 一意なキーを指定（Reactの最適化用）
          todo={todo} // 各TODOのデータを渡す
          onUpdateDetail={onUpdateDetail} // 詳細編集用
          onUpdateStatus={onUpdateStatus} // ステータス更新用
          onUpdateTitle={onUpdateTitle} // タイトル編集用
          onUpdateDueDate={onUpdateDueDate} // 期限更新用
        />
      ))}
    </div>
  );
};
