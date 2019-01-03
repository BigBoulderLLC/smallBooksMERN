import React, {Component} from 'react'

class TextFieldReadOnly extends Component {
  render() {
    return(
      <div className="textField">
        <p className="fieldLabel"><strong>{this.props.fieldLabel}</strong></p>
        <p className="fieldValue">{this.props.fieldValue}</p>
      </div>
    )
  }
}

export default TextFieldReadOnly