import { IConfirmationModal } from "@/@types/components/confirmation.modal.type";
import React, { useEffect, useState } from "react";

import styles from "./ConfirmationModal.module.scss";
import Button from "@/components/main/Button/Button";

const ConfirmationModal = (props: IConfirmationModal) => {
  const { isOpen, onCancel, onConfirm, children } = props;
  const [modalOpen, setModalOpen] = useState(isOpen);

  const handleCancel = () => {
    setModalOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    setModalOpen(false);
    onConfirm();
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <span className={styles.close} onClick={handleCancel}>
              &times;
            </span>
            {children}
            <div className={styles.buttons}>
              <Button onClick={handleCancel} color="gray">
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
