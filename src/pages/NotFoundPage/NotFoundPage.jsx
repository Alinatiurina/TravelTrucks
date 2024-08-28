import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFound() {
    return (
        <div className={css.container}>
            <p>Ooops! Page not found!</p>
            <p>Please go to <Link className={css.link} to="/">home page</Link></p>
        </div>
    );
}
