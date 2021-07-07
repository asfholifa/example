import React, { useState, useEffect } from "react";
import { SIGN_UP_DESCRIPTION_TIMER } from "@helpers/constants";
import styles from "./Timer.module.scss";

const Timer = () => {
  const [timer, setTimer] = useState(120);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer === 0) {
        setIsExpired(true);
      }
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <div className={styles.descriptionTimer}>
      {!isExpired ? (
        <div>
          {SIGN_UP_DESCRIPTION_TIMER}
          {`${timer % 60 ? Math.ceil(timer / 60 - 1) : Math.ceil(timer / 60)}:${
            timer % 60 < 10 ? `0${timer % 60}` : timer % 60
          }`}
        </div>
      ) : (
        <div>Send link again</div>
      )}
    </div>
  );
};

export default Timer;
