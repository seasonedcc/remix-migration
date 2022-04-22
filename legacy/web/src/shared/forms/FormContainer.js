import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Title from 'shared/ui/Title'

const FormContainer = ({ classes, form, title, styles }) => (
  <Grid container>
    <Grid item>
      <Title variant="h4">{title}</Title>
    </Grid>
    <Grid item style={styles} className={classes.formContainer}>
      {form}
    </Grid>
  </Grid>
)

const styles = () => ({
  formContainer: {
    margin: 0,
    width: '100%',
  },
})

export default withStyles(styles)(FormContainer)
