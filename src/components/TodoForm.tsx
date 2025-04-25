import { useForm } from "react-hook-form";
import "../css/TodoForm.css";

// 入力フォームで扱うデータの型（タイトルと期限）
type FormValues = {
  title: string;
  dueDate: string;
  detail: string;
};

// 親コンポーネント(App.tsx)から渡される関数の型
type Props = {
  onAdd: (title: string, dueDate: string, detail: string) => void;
};

export const TodoForm = ({ onAdd }: Props) => {
  // react-hook-form の基本的な使い方
  const {
    register, // フォームの入力を登録（バリデーションもできる）
    handleSubmit, // フォーム送信時の処理
    reset, // 入力欄の初期化
    formState: { errors }, // バリデーションのエラー情報
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // 入力されたタイトルと期限を親に渡す
    onAdd(data.title, data.dueDate, data.detail);

    // フォーム入力をリセット（初期化）
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo_form">
      <div>
        {/* タイトル入力欄 */}
        <input
          {...register("title", { required: "タイトルは必須です" })}
          placeholder="タイトルを入力"
          className={`form_title ${errors.title ? "form_title-error" : ""}`}
        />

        {/* TODO期限入力欄（カレンダー付き） */}
        <input
          type="date"
          {...register("dueDate")}
          className="form_duedate"
          // バリデーションなし
        />

        {/* 追加ボタン */}
        <button type="submit" className="form_submit">
          追加
        </button>
      </div>

      {/* 詳細記載欄（未設定でも可） */}
      <div>
        <input
          type="text"
          {...register("detail")}
          placeholder="詳細を入力"
          className="form_detail"
        />
      </div>

      {/* タイトル未入力時のエラー表示 */}
      {errors.title && (
        <p style={{ color: "red", marginTop: "4px" }}>{errors.title.message}</p>
      )}
    </form>
  );
};
