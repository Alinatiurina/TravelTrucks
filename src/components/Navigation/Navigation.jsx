import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { BiMoviePlay } from "react-icons/bi";
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const classLink = ({ isActive }) => {
  return isActive ? css.active : css.link;
};

export default function Navigation() {
  return (
    <nav className={css.navContainer}>
      <ul className={css.navList}>
        <li><NavLink to="/"><BiMoviePlay className={css.icon} /></NavLink></li>
        <li><NavLink to="/" className={classLink}>
          Home
        </NavLink></li>
        <li><NavLink to="/movies" className={classLink}>
          Movies
        </NavLink></li>
      </ul>
    </nav>
  );
}
