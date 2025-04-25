import { Todo, TodoStatus } from "../Types/todo";
import { useState } from "react";
import "../css/TodoItem.css";

// 親（App）から受け取るpropsの型
type Props = {
  todo: Todo;
  onUpdateDetail: (id: string, detail: string) => void;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onUpdateDueDate: (id: string, dueDate: string) => void;
};

// 1つのTODOを表示・編集できるコンポーネント
export const TodoItem = ({
  todo,
  onUpdateDetail,
  onUpdateStatus,
  onUpdateTitle,
  onUpdateDueDate,
}: Props) => {
  const [detailInput, setDetailInput] = useState(todo.detail);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [titleInput, setTitleInput] = useState(todo.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [dueDateInput, setDueDateInput] = useState(todo.dueDate || "");
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);

  return (
    <div className="todo_items">
      {/* ---------- タイトル ---------- */}
      <div className="todo_item">
        {isEditingTitle ? (
          <div className="todo_editing">
            <input
              className="todo_input"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <div className="todo_editing_button">
              <button
                className="todo_edit_button"
                onClick={() => {
                  onUpdateTitle(todo.id, titleInput);
                  setIsEditingTitle(false);
                }}
              >
                保存
              </button>
              <button
                onClick={() => setIsEditingTitle(false)}
                className="todo_edit_button"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <h3 onClick={() => setIsEditingTitle(true)}>{todo.title}</h3>
        )}
      </div>

      {/* ---------- 期限 ---------- */}
      <div className="todo_item">
        {isEditingDueDate ? (
          <div className="todo_editing">
            <input
              type="date"
              className="todo_input"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
            />
            <div className="todo_editing_button">
              <button
                className="todo_edit_button"
                onClick={() => {
                  onUpdateDueDate(todo.id, dueDateInput);
                  setIsEditingDueDate(false);
                }}
              >
                保存
              </button>
              <button
                className="todo_edit_button"
                onClick={() => setIsEditingDueDate(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <h3 onClick={() => setIsEditingDueDate(true)}>
            期限：{todo.dueDate || "未設定"}
          </h3>
        )}
      </div>

      {/* ---------- ステータス変更 ---------- */}
      <div className="todo_item">
        <select
          value={todo.status}
          onChange={(e) =>
            onUpdateStatus(todo.id, e.target.value as TodoStatus)
          }
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
      </div>

      {/* ---------- 詳細表示 or 編集 ---------- */}
      <div className="todo_item">
        {isEditingDetail ? (
          <div className="todo_editing">
            <input
              className="todo_input todo_input-detail"
              value={detailInput}
              onChange={(e) => setDetailInput(e.target.value)}
            />
            <div className="todo_editing_button">
              <button
                className="todo_edit_button"
                onClick={() => {
                  onUpdateDetail(todo.id, detailInput);
                  setIsEditingDetail(false);
                }}
              >
                保存
              </button>
              <button
                className="todo_edit_button"
                onClick={() => setIsEditingDetail(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <h3 onClick={() => setIsEditingDetail(true)}>
            詳細：{todo.detail || "未設定"}
          </h3>
        )}
      </div>
    </div>
  );
};
