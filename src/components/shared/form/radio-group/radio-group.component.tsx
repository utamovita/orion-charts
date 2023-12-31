import React, { createContext, memo, ReactElement } from "react";
import { RadioGroupProps, RadioGroupState, useRadioGroupState } from "react-stately";
import { AriaRadioGroupProps } from "@react-types/radio";
import { useFocusRing, useRadio, useRadioGroup, VisuallyHidden } from "react-aria";
import cx from "classnames";
import styles from "./radio-group.module.scss";

type RadioGroupPropsType = RadioGroupProps & {
  children: ReactElement[] | ReactElement;
  size?: "regular" | "large";
  modalLink?: string;
  modalLinkText?: string;
};

const RadioContext: React.Context<RadioGroupState> = createContext({} as RadioGroupState);

function RadioGroup({ size = "regular", children, ...props }: RadioGroupPropsType) {
  const { label, modalLink, modalLinkText } = props;
  const state = useRadioGroupState(props as RadioGroupProps);
  const { radioGroupProps, labelProps } = useRadioGroup(props as AriaRadioGroupProps, state);

  const direction = props.orientation === "horizontal" ? styles.groupItemsHorizontal : styles.groupItemsVertical;
  const largeLabel = size === "large";

  return (
    <div {...radioGroupProps}>
      {label && label !== "" ? (
        <div className={styles.groupLabelWrapper}>
          <span className={cx([styles.groupLabel], { [styles.groupLabelLarge]: largeLabel })} {...labelProps}>
            {label}
          </span>
          {modalLink ? (
            <a className={styles.radioGroupModalLink} href={modalLink}>
              {modalLinkText}
            </a>
          ) : (
            false
          )}
        </div>
      ) : (
        false
      )}
      <div className={cx(direction, { [styles.groupItemLabelLarge]: largeLabel })}>
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
    </div>
  );
}

type CircleType = {
  disabled: boolean;
};

const OuterCircle = memo<CircleType>(({ disabled }) => (
  <circle
    cx={9.5}
    cy={9.5}
    r={8.5}
    className={cx(styles.radioStroke, { [styles.radioStrokeDisabled]: disabled })}
    fill="none"
    strokeWidth={2}
  />
));

const InnerCircle = memo<CircleType>(({ disabled }) => (
  <circle cx={9.5} cy={9.5} r={4.5} className={cx(styles.radioFill, { [styles.radioFillDisabled]: disabled })} />
));

const FocusCircle = memo<CircleType>(({ disabled }) => (
  <circle
    cx={9.5}
    cy={9.5}
    r={7}
    fill="none"
    className={cx(styles.radioStroke, { [styles.radioStrokeDisabled]: disabled })}
    strokeWidth={3}
  />
));

type DotType = {
  disabled: boolean;
  selected: boolean;
  focusVisible: boolean;
};

const Dot = memo<DotType>(({ disabled, selected, focusVisible }) => (
  <svg width={20} height={20} aria-hidden="true">
    <OuterCircle disabled={disabled} />
    {selected ? <InnerCircle disabled={disabled} /> : false}
    {focusVisible ? <FocusCircle disabled={disabled} /> : false}
  </svg>
));

type RadioGroupItemProps = {
  value: string;
  isDisabled?: boolean;
  children: ReactElement[] | ReactElement | string;
};

const RadioGroupItem = memo<RadioGroupItemProps>((props) => {
  const { children } = props;
  const state = React.useContext(RadioContext);
  const ref = React.useRef(null);
  const { inputProps, isDisabled, isSelected } = useRadio(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label className={cx(styles.groupItem)}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={cx(styles.groupItemDot)}>
        <Dot disabled={isDisabled} selected={isSelected} focusVisible={isFocusVisible} />
      </div>
      <div className={cx(styles.groupItemLabelWrapper)}>
        <span className={cx(styles.groupItemLabel, styles.radioStroke, { [styles.radioStrokeDisabled]: isDisabled })}>
          {children}
        </span>
      </div>

    </label>
  );
});

RadioGroup.Item = RadioGroupItem;

export { RadioGroup };
