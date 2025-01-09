import React from "react";

const TimeFilter = ({ timeRange, setTimeRange }) => {
  const options = [
    { value: "overall", label: "Overall" },
    { value: "pastWeek", label: "Past Week" },
    { value: "pastMonth", label: "Past Month" },
    { value: "past3Months", label: "Past 3 Months" },
    { value: "past6Months", label: "Past 6 Months" },
    { value: "pastYear", label: "Past Year" },
    { value: "custom", label: "Custom Range" },
    // Dynamically generated months and years will go here
  ];

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  return (
    <div className="time-filter">
      <label htmlFor="timeRange">Select Time Range:</label>
      <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeFilter;
