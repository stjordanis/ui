import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import { CaretUp, CaretDown } from "@cockroachlabs/icons";
import isNumber from "../utils/isNumber";
import { BaseInput, InputProps } from "./BaseInput";
import styles from "./styles.module.scss";
import { InputPrefix, InputWrapper } from "./helpers";

const cx = classNames.bind(styles);

export type NumberInputProps = Omit<InputProps<number>, "type">;

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value: outerValue,
  initialValue,
  prefixIcon,
  invalid,
  disabled,
  ...props
}) => {
  const [value, setValue] = useState<number>(outerValue || initialValue || 0);
  const onSpinClickHandler = useCallback(
    (increase: -1 | 1) => () => {
      if (disabled) {
        return;
      }
      const nextValue = value + increase;
      setValue(nextValue);
      onChange(nextValue);
    },
    [value, onChange, disabled],
  );

  const onChangeHandler = useCallback(
    (nextValue: string) => {
      const parsedValue = Number(nextValue);
      if (!isNumber(parsedValue)) {
        return;
      }
      setValue(parsedValue);
      onChange(parsedValue);
    },
    [onChange],
  );

  const spinButtonsGroupClassName = cx("spin-buttons-group");
  const spinButton = cx("spin-button");

  return (
    <InputWrapper disabled={disabled} invalid={invalid} className="number-type">
      <InputPrefix>{prefixIcon}</InputPrefix>
      <BaseInput
        {...props}
        disabled={disabled}
        invalid={invalid}
        onChange={onChangeHandler}
        value={value}
        initialValue={initialValue}
        type="number"
      />
      <div className={spinButtonsGroupClassName}>
        <button
          className={`${spinButton} spin-button-up`}
          onClick={onSpinClickHandler(1)}
        >
          <CaretUp />
        </button>
        <button
          className={`${spinButton} spin-button-down`}
          onClick={onSpinClickHandler(-1)}
        >
          <CaretDown />
        </button>
      </div>
    </InputWrapper>
  );
};
