import React, { memo, RefObject, useRef } from "react";
import { useToggleState } from "react-stately";
import { useCheckbox, useFocusRing, VisuallyHidden } from "react-aria";
import cx from "classnames";
import styles from "./checkbox.module.scss";

type CheckboxProps = {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  label: string;
  isReadOnly?: boolean;
  isLarge?: boolean;
  onChange?: ((isSelected: boolean) => void) | undefined;
};
const Checkbox = memo<CheckboxProps>((props) => {
  const state = useToggleState(props);
  const ref = useRef() as RefObject<HTMLInputElement>;
  const { inputProps } = useCheckbox({ ...props, children: props.label }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  const strokeColor = props.isDisabled ? "var(--colorGray30)" : "var(--colorPrimary)";

  return (
    <label className={styles.checkboxWrapper}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg width={18} height={18} aria-hidden="true" className={styles.checkboxRect}>
        <rect x={0} y={0} width={18} height={18} fill="none" stroke={"var(--colorText)"} strokeWidth={3.5} />
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>

        {isSelected && (
          <path
            fill={strokeColor}
            transform="translate(3 5)"
            d={`M4.5 8.125L0.75 4.405L1.9425 3.25L4.5 5.7625L10.0575 0.25L11.25 1.435L4.5 8.125Z`}
          />
        )}
        {props.isIndeterminate && <rect x={4} y={8} width={10} height={2} fill={strokeColor} />}
        {isFocusVisible && <rect x={0} y={0} width={18} height={18} fill="none" stroke={strokeColor} strokeWidth={5} />}
      </svg>
      <span
        className={cx([styles.checkboxLabel], { [styles.disabled]: props.isDisabled, [styles.large]: props.isLarge })}
      >
        {props.label}
      </span>
    </label>
  );
});

export { Checkbox };
