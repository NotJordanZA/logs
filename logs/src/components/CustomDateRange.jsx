import React from 'react';
import '../styling/CustomDateRange.css';

const CustomDateRange = ({ customRange, setCustomRange, visible }) => {
  if (!visible) return null;

  const handleStartDateChange = (e) => {
    setCustomRange(prev => ({
      ...prev,
      startDate: e.target.value
    }));
  };

  const handleEndDateChange = (e) => {
    setCustomRange(prev => ({
      ...prev,
      endDate: e.target.value
    }));
  };

  return (
    <div className="custom-date-range">
      <div className="date-input-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={customRange.startDate || ''}
          onChange={handleStartDateChange}
          max={customRange.endDate || new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="date-input-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={customRange.endDate || ''}
          onChange={handleEndDateChange}
          min={customRange.startDate}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

export default CustomDateRange; 