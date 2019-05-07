import Styles from "../App/App.less";

const FlowModal = ({ handleModalClose, handleModalSave }) => (
  <div className={Styles.modal}>
    <div className={Styles.modalTitle}>Edit Node</div>
    <div className={Styles.modalBodyContainer}>
      <div className={Styles.modalBodySurface}>
        <div>Node Name</div>
        <input type="text" />
      </div>
    </div>
    <div className={Styles.modalFooter}>
      <button onClick={handleModalClose}>Close</button>
      <button onClick={handleModalSave}>Save</button>
    </div>
  </div>
);

export default FlowModal;
