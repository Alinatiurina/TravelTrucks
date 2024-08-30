import css from "./HomePage.module.css";
import Button from "../../components/Button/button";

export default function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.contentBox}>
        <div className={css.textBox}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.text}>
            You can find everything you want in our catalog
          </p>
        </div>
        <a className={css.button} href="/catalog">
          View Now
        </a>
      </div>
    </div>
  );
}
