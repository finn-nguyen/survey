import React from 'react'
import { connect } from 'react-redux'
import FIELDS from './formFields'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

const ReviewField = ({ label, name, formValues}) => {
  return (
    <div>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  )
}

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {FIELDS.map(field => <ReviewField key={field.name} formValues={formValues} {...field} />)}
      </div>
      <div style={{ marginTop: '10px'}}>
        <button
          className='yellow darken-3 btn-flat white-text'
          onClick={onCancel}>
          Back
        </button>
        <button
          className='green btn-flat right white-text'
          onClick={() => submitSurvey(formValues, history)}>
          Send Survey
          <i className='material-icons right'>email</i>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))
