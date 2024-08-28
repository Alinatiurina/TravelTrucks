import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Navigation />
      </header>
      <Suspense fallback={<div>Page is loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
