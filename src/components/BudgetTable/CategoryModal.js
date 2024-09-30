import React from "react";

const Modal = ({ modalType, closeModal, newCategoryName, setNewCategoryName, newSubCategoryName, setNewSubCategoryName, currentIndex, addNewCategory, addNewSubCategory, setCategoryIncome }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      {modalType === "category" && (
        <>
          <label>
            New Parent Category1:
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
          </label>
          <button onClick={() => addNewCategory(setCategoryIncome)}>Submit</button>
        </>
      )}
      {modalType === "subcategory" && (
        <>
          <label>
            New Subcategory Name2:
            <input type="text" value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} />
          </label>
          <button onClick={() => addNewSubCategory(currentIndex, setCategoryIncome)}>Add</button>
        </>
      )}
    </div>
  </div>
);

export default Modal;
