import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients', name: 'emails' }
]

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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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
  if (!values.title) {
    errors.title = 'You must provide a title'
  }
  return errors
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm)

