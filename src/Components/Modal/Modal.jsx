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
      modalBodyContainer,
      modalBodySurface,
      modalFooter,
      modalTitle
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
              <input type="text" value={label} />
            </form>
            <br />
            <form>
              <label>
                Variable Name:
                <input
                  onChange={({ target: { value } }) =>
                    this.updateValue("variableName", value)
                  }
                  type="text"
                  value={variableName}
                />
              </label>
              <label>
                Variable Value:
                <input
                  onChange={({ target: { value } }) =>
                    this.updateValue("variableValue", value)
                  }
                  type="text"
                  value={variableValue}
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
