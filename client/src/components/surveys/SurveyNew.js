import React from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends React.Component {

  state = { formReview: false }

  renderContent() {
    if (this.state.formReview) {
      return < SurveyFormReview onCancel={() => this.setState({ formReview: false })}/>
    }
    return <SurveyForm onSurveySumit={() => this.setState({formReview: true})}/>
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)
