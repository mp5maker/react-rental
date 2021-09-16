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

type TButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  color?: BUTTON_COLOR_TYPE
}

const Button: React.FC<TButtonProps> = ({
  className,
  color = BUTTON_COLOR_TYPE.primary,
  ...props
}): JSX.Element => {
  const buttonProps = {
    ...props,
    className: `button-container ${get(props, 'className', '')} ${color}`
  }

  return <button {...buttonProps} />
}

export default Button
