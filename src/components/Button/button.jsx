import css from "./button.module.css";

export default function Button({ text, type }) {
  return (
    <div>
      <button className={css.button} type={type}>
        {text}
      </button>
    </div>
  );
}
