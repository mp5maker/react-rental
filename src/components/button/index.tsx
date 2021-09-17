import * as React from 'react'
import get from 'lodash/get'
import './button.scss'

export enum BUTTON_COLOR_TYPE {
  'primary' = 'primary',
  'secondary' = 'secondary',
  'info' = 'info',
  'success' = 'success',
  'error' = 'error',
  'warning' = 'warning'
}

export enum BUTTON_VARIANT {
  'OUTLINE' = 'outline',
  'FILLED' = 'filled'
}

type TButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  color?: BUTTON_COLOR_TYPE
  variant?: BUTTON_VARIANT
}

const Button: React.FC<TButtonProps> = ({
  variant = BUTTON_VARIANT.OUTLINE,
  className,
  color = BUTTON_COLOR_TYPE.primary,
  ...props
}): JSX.Element => {
  const buttonProps = {
    ...props,
    className: `button-container ${get(props, 'className', '')} ${color} ${variant}`
  }

  return <button {...buttonProps} />
}

export default Button
