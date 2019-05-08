import React from "react";
import Styles from "../App/App.less";

class FlowModal extends React.Component {
  constructor({ data: { id, label, variableName, variableValue } }) {
    super({ data: { id, label, variableName, variableValue } });
    this.state = {
      id,
      label,
      variableName,
      variableValue
    };
  }

  updateValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { handleModalClose, handleModalSave } = this.props;
    const { id, label, variableName, variableValue } = this.state;
    const {
      modal,
      modalTitle,
      modalBodyContainer,
      modalBodySurface,
      modalFooter
    } = Styles;
    return (
      <div className={modal}>
        <div className={modalTitle}>Edit Node</div>
        <div className={modalBodyContainer}>
          <div className={modalBodySurface}>
            <div>Node Name</div>
            <form
              onChange={({ target: { value } }) =>
                this.updateValue("label", value)
              }
            >
              <input type="text" value={this.state.label} />
            </form>
            <br />
            <form>
              <label>
                Variable Name:
                <input
                  type="text"
                  value={this.state.variableName}
                  onChange={({ target: { value } }) =>
                    this.updateValue("variableName", value)
                  }
                />
              </label>
              <label>
                Variable Value:
                <input
                  type="text"
                  value={this.state.variableValue}
                  onChange={({ target: { value } }) =>
                    this.updateValue("variableValue", value)
                  }
                />
              </label>
            </form>
          </div>
        </div>
        <div className={modalFooter}>
          <button onClick={handleModalClose}>Close</button>
          <button
            onClick={() =>
              handleModalSave({
                id,
                label,
                variableName,
                variableValue
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default FlowModal;
