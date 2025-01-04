import React, { useState } from "react";
import "../styling/log.css"; // Ensure this matches your actual file path

const NewPoopLog = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    duration: "",
    poopQuality: 0,
    wipeQuality: 0,
    wetToSolid: 2.5,
    granularToSingular: 2.5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Poop logged:", formData);
    // Add code to save the data to Firebase here
    onClose(); // Close the form after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2>Log a New Poop</h2>

          <label className="form-label">
            <p>Date</p>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Time</p>
            <input
              type="time"
              name="time"
              className="form-input"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Location</p>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="Bathroom, home, etc."
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Duration (minutes)</p>
            <input
              type="number"
              name="duration"
              className="form-input"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Poop Quality (0-5 stars)</p>
            <input
              type="number"
              name="poopQuality"
              className="form-input"
              min="0"
              max="5"
              step="0.5"
              value={formData.poopQuality}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Wipe Quality (0-5 stars)</p>
            <input
              type="number"
              name="wipeQuality"
              className="form-input"
              min="0"
              max="5"
              step="0.5"
              value={formData.wipeQuality}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            <p>Wet to Solid</p>
            <input
              type="range"
              name="wetToSolid"
              className="form-input-range"
              min="0"
              max="5"
              step="0.1"
              value={formData.wetToSolid}
              onChange={handleChange}
            />
            <span>{formData.wetToSolid}</span>
          </label>

          <label className="form-label">
            <p>Granular to Singular</p>
            <input
              type="range"
              name="granularToSingular"
              className="form-input-range"
              min="0"
              max="5"
              step="0.1"
              value={formData.granularToSingular}
              onChange={handleChange}
            />
            <span>{formData.granularToSingular}</span>
          </label>

          <button type="submit" className="form-submit-button">
            Log Poop
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPoopLog;