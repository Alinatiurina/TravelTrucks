import css from "./button.module.css"

export default function Button({text, link}) {
  return (
    <div>
      <button className={css.button} type="button">{text}</button>
      {/* <a className={css.button} href={link}>{text}</a> */}
    </div>
  );
}