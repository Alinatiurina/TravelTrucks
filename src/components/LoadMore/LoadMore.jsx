import css from "./LoadMore.module.css";

export default function LoadMore() {
  return (
    <div>
      <button className={css.button} type="button">
        Load more
      </button>
    </div>
  );
}
