import { TextField } from '@material-ui/core'
import startCase from 'lodash/startCase'
import InputMask from 'react-input-mask'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  body: {
    '& label': {
      fontFamily: 'Nunito',
      fontSize: theme.typography?.h5?.fontSize,
      fontWeight: theme.typography?.h5?.fontWeight,
      lineHeight: theme.typography?.h5?.lineHeight,
      position: 'relative',
      transition: 'none',
      transform: 'none',
      marginBottom: theme.spacing(0.5),
    },
    '& input': {
      padding: '.75rem',
      backgroundPosition: '99% center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
    },
    '& textarea': {
      padding: '.75rem',
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}))

const Input = ({
  disabled,
  name,
  error,
  helper = '',
  label = startCase(name),
  placeholder = '',
  mask = '',
  maskChar = ' ',
  variant = 'outlined',
  rows,
  multiline,
  step = 300, // 5 minutes
  type = 'text',
  ...props
}) => {
  const maskProps = mask
    ? {
        InputProps: {
          inputComponent: InputMask,
          inputProps: { mask, maskChar },
        },
      }
    : {}

  const stepProps =
    type === 'time' && !mask
      ? {
          inputProps: {
            step,
          },
        }
      : {}

  const helperText = error || helper || undefined
  const classes = useStyles()

  return (
    <TextField
      {...props}
      variant={variant}
      name={name}
      type={type}
      id={name}
      label={label}
      placeholder={placeholder}
      fullWidth
      error={!!error}
      helperText={helperText}
      disabled={disabled}
      InputLabelProps={{ shrink: false }}
      className="mb-4"
      multiline={multiline}
      minRows={rows}
      maxRows={rows}
      classes={{
        root: classes.body,
      }}
      {...stepProps}
      {...maskProps}
    />
  )
}

export default Input
