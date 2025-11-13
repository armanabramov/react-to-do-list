import styles from './Todo.module.css';

export const Todo = ({ todo, setEditing, remove }) => {
  return (
    <>
      <div className={styles.fullText}>{todo.text}</div>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={() => setEditing(true)}>
          Редактировать
        </button>
        <button className={styles.delete} onClick={remove}>
          Удалить
        </button>
      </div>
    </>
  );
};
