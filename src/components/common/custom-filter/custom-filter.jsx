import { useState } from "react";
import "./custom-filter.scss";

function CustomFilter ({ filterData, selectionChange }) {
  const [buttonText, setButtonText] = useState(() => {
    return filterData.filterOptions.find(ele => ele.optionValue === filterData.filterValue)?.displayText;
  });

  const handleOptionSelect = (selectedOption) => {
    setButtonText(selectedOption.displayText);
    selectionChange(filterData.filterKey, selectedOption);
  }

  return (
    <div className="filter-box-container">
      <div className="filter-name">{filterData.filterLabel}</div>
      <div className="dropdown filter-trigger-wrapper">
        <button
          type="button"
          className="btn button-filter dropdown-toggle c-font-12 ellpsis-overflow"
          data-bs-toggle="dropdown"
        >
          <span className='btn-text'>{ buttonText }</span>
          <span className="icon-wrapper ms-2">
            <i className="fa-solid fa-angle-down"></i>
          </span>
        </button>
        <ul className="dropdown-menu">
          {
            filterData.filterOptions.map((optionData, optionIndex) => (
              <li key={`dropdown-${optionIndex}`}>
                <div
                  className={`dropdown-item ${optionData.displayText === buttonText ? 'active' : ''}`}
                  onClick={() => handleOptionSelect(optionData)}>
                  { optionData.displayText }
                </div>
              </li>              
            ))
          }
        </ul>
      </div>
    </div>
  );

}

export default CustomFilter;