import React, { useState } from "react";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import Button from "../Button/button";
import css from "./form.module.css";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !date) {
      iziToast.error({
        title: "Error",
        message: "Please fill in all required fields.",
        position: "topRight",
      });
      return;
    }

    iziToast.success({
      title: "Success",
      message: "Your booking has been submitted!",
      position: "topRight",
    });

    setName("");
    setEmail("");
    setDate("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.BookForm}>
        <div>
          <h3 className={css.BookTitle}>Book your campervan now</h3>
          <p className={css.BookText}>
            Stay connected! We are always ready to help you.
          </p>
        </div>
        <input
          className={css.BookInput}
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={css.BookInput}
          type="text"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={css.BookInput}
          type="text"
          placeholder="Booking date*"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className={css.BookInputText}
          type="text"
          placeholder="Comment"
        />
        <Button text="Send" type="submit" />
      </form>
    </div>
  );
}
