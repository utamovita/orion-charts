import React, { useCallback, useEffect, useRef } from "react";

import styles from "./modal.module.scss";
import { useModalDispatch, useModalState } from "src/context/modal.context";
import { useLockedBody } from "src/hooks/use-locked-body";
import { useOnClickOutside } from "src/hooks/use-on-click-outside.hook";
import { Close as CloseIcon } from "@carbon/icons-react";

export const Modal = React.memo(() => {
  const ref = useRef(null);
  const { isActive, content } = useModalState();
  const dispatch = useModalDispatch();
  const { setLocked } = useLockedBody();

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "HIDE" });
  }, [dispatch]);

  useOnClickOutside(ref, () => {
    handleCloseModal();
  });

  useEffect(() => {
    if (isActive) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [isActive, setLocked]);

  if (!isActive) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <div className={styles.content}>
          <CloseIcon
            className={styles.closeButton}
            onClick={handleCloseModal}
          />
          {content}
        </div>
      </div>
    </div>
  );
});
