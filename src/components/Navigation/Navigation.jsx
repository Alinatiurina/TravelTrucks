import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const classLink = ({ isActive }) => {
  return isActive ? css.active : css.link;
};

export default function Navigation() {
  return (
    <nav className={css.navContainer}>
      <NavLink to="/">
        <p className={css.logo}>
          Travel<span className={css.logoGray}>Trucks</span>
        </p>
      </NavLink>

      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={classLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" className={classLink}>
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
