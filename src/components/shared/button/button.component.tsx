import * as React from "react";
import cx from "classnames";
import styles from "./button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const defaultProps = {
  type: "button",
  variant: "primary",
  isLoading: false,
  isDisabled: false,
  fullWidth: false,
};

function Button(props: ButtonProps) {
  const { children, onClick, type, className } = props;

  return (
    <button className={cx(styles.button, className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export { Button };
