import { useState } from "react";
import { TodoForm } from "./components/TodoForm"; // TODO追加フォームコンポーネント
import { TodoList } from "./components/TodoList"; // TODO一覧表示コンポーネント
import { Todo, TodoStatus } from "./types/todo"; // TODO型定義とステータス型
import { v4 as uuidv4 } from "uuid"; // 一意なID生成ライブラリ
import "./style.css/App.css";

function App() {
  // ①全てのTODOリストを保持（状態管理）
  const [todos, setTodos] = useState<Todo[]>([]);

  // ②新しいTODOを追加する関数（タイトルと期限を受け取る）
  const handleAddTodo = (title: string, dueDate: string, detail: string) => {
    const newTodo: Todo = {
      id: uuidv4(), // 一意なIDを自動生成
      title, // 入力されたタイトル
      detail, // 入力された詳細
      status: "未着手", // 初期ステータス
      dueDate, // 入力された期限
    };

    // 既存のTODOに新しいTODOを追加
    setTodos([...todos, newTodo]);
  };

  // ③詳細の更新処理
  const handleUpdateDetail = (id: string, detail: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, detail } : todo))
    );
  };

  // ④ステータス（未着手・進行中・完了）の更新処理
  const handleUpdateStatus = (id: string, status: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  // ⑤タイトルの更新処理
  const handleUpdateTitle = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  // ⑥期限の更新処理
  const handleUpdateDueDate = (id: string, dueDate: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, dueDate } : todo))
    );
  };

  // ⑦ステータスで絞り込む状態（"すべて" or 特定ステータス）
  const [filterStatus, setFilterStatus] = useState<TodoStatus | "すべて">(
    "すべて"
  );

  // ⑧期限の昇順でソートするかのフラグ
  const [sortByDueDate, setSortByDueDate] = useState<boolean>(false);

  // ⑨TODOをステータスでフィルタ → 期限でソート
  const filteredTodos = todos
    .filter((todo) => {
      return filterStatus === "すべて" || todo.status === filterStatus;
    })
    // a,bは2つのTODOの比較
    .sort((a, b) => {
      if (!sortByDueDate) return 0; // チェックされていなければ並び替えなし
      return (a.dueDate || "").localeCompare(b.dueDate || ""); // 文字列として昇順ソート
    });

  return (
    <div className="app_container">
      <h1>TODOアプリ</h1>

      {/* TODOを新規追加するフォーム */}
      <TodoForm
        onAdd={handleAddTodo}
        onUpdateDetail={handleUpdateDetail}
        onUpdateStatus={handleUpdateStatus}
        onUpdateTitle={handleUpdateTitle}
        onUpdateDueDate={handleUpdateDueDate}
      />

      {/* TODO一覧を表示（フィルター適用後のデータ） */}
      <TodoList
        todos={filteredTodos}
        onUpdateDetail={handleUpdateDetail}
        onUpdateStatus={handleUpdateStatus}
        onUpdateTitle={handleUpdateTitle}
        onUpdateDueDate={handleUpdateDueDate}
      />

      {/* ステータス絞り込み＆期限ソート UI */}
      <div className="sort_container">
        <label
          style={{
            marginRight: "10px",
          }}
        >
          ステータスで絞り込み：
        </label>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as TodoStatus | "すべて")
          }
        >
          <option value="すべて">すべて</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>

        {/* 期限での昇順ソートチェックボックス */}
        <label style={{ marginLeft: "20px" }}>
          <input
            style={{ transform: "scale(1.5)", marginRight: "8px" }}
            type="checkbox"
            checked={sortByDueDate}
            onChange={(e) => setSortByDueDate(e.target.checked)}
          />
          期限の早い順に並べる
        </label>
      </div>
    </div>
  );
}

export default App;
