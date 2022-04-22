import FormContainer from '../forms/FormContainer'

const AuthForm = ({ classes, form, title }) => (
  <div className="mx-auto w-full max-w-[620px]">
    <FormContainer classes={classes} form={form} title={title} />
  </div>
)

export default AuthForm
