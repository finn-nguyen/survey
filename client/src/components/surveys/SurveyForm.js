import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formFields'

class SurveyForm extends React.Component {
  renderFields = () => {
    return (
      <div>
        {FIELDS.map(field => <Field key={field.name} {...field} type="text" component={SurveyField} />)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSurveySumit}>
        {this.renderFields()}
        <Link to="/surveys" className='red btn-flat left white-text'>
          Cancel
        </Link>
        <button type="submit" className='teal btn-flat right white-text'>
          Next
          <i className='material-icons right'>done</i>
        </button>
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {}
  FIELDS.forEach(({name}) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`
    }
  })
  errors.recipients = validateEmails(values.recipients || '')
  return errors
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)

