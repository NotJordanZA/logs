import React, { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating';
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import Creatable from 'react-select/creatable';
import Auth from "../utils/login";
import "../styling/log.css";

export const NewPoopLog = ({ isOpen, onClose, isMobile }) => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [previousLocations, setPreviousLocations] = useState([]);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const fetchPreviousLocations = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
  
    const locationsSet = new Set(); // To store unique locations
    try {
      const logsSnapshot = await getDocs(collection(db, "users", userId, "logs"));
      logsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location) {
          locationsSet.add(data.location);
        }
      });
      const uniqueLocations = Array.from(locationsSet).map(location => ({ value: location, label: location }));
      setPreviousLocations(uniqueLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const today = new Date();
  const [formData, setFormData] = useState({
    dateTime: "",
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

  const handleLocationChange = (selectedOption) => {
    setFormData({
      ...formData,
      location: selectedOption ? selectedOption.value : "", 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reference the poopLogs subcollection for the user
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const poopLogsRef = collection(userDocRef, "logs");
  
      // Add a new document
      await addDoc(poopLogsRef, formData);
  
      console.log("Poop logged successfully:", formData);
  
      // Close the form
      onClose();

      setFormData({
        dateTime: "",
        location: "",
        duration: "",
        poopQuality: 0,
        wipeQuality: 0,
        wetToSolid: 2.5,
        granularToSingular: 2.5,
      })
    } catch (error) {
      console.error("Error logging poop:", error);
    }
  };

  const handlePoopStars = (e) =>{
    setFormData({
      ...formData,
      ["poopQuality"]: e,
    });
  }

  const handleWipeStars = (e) =>{
    setFormData({
      ...formData,
      ["wipeQuality"]: e,
    });
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#4a4a4a',
      color: '#f5f5f5',
      borderColor: state.isFocused ? '#007bff' : '#d1d1d1', // Blue border when focused
      boxShadow: state.isFocused ? '0 0 0 1px #007bff' : 'none', // Subtle focus shadow
      '&:hover': {
        borderColor: '#007bff', // Border color on hover
      },
      borderRadius: '4px',
      border: 'none'
    }),
    input: (base) => ({
      ...base,
      color: '#f5f5f5',
      fontSize: '14px',
    }),
    menu: (base) => ({
      ...base,
      color: '#f5f5f5',
      backgroundColor: '#4a4a4a', 
      borderRadius: '4px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: '#4a4a4a',
      color: '#f5f5f5',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#0056b3', // Darker blue for active state
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#f5f5f5',
    }),
  };

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 600);
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      fetchPreviousLocations();
    }
    return () => { 
      isMounted = false; // Clean-up function to avoid running the effect again
  };
  },[isOpen]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setDragDistance(0);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent background scroll
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);
    const newDragDistance = touchY - startY;
    setDragDistance(Math.max(0, newDragDistance)); // Only allow downward drag
  };

  const handleTouchEnd = () => {
    if (dragDistance > 75) {
      onClose();
      setTimeout(() => {
        setDragDistance(0);
      }, 300);
    } else {
      setDragDistance(0);
    }
  };

  const preventClose = (e) => {
    if (!e.target.closest('.gesture-handle')) {
      e.stopPropagation();
    }
  };

  return (
    <div className={`popup-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div 
        className={`popup-form ${isMobile ? (isOpen ? 'slide-up' : 'slide-down') : (isOpen ? 'show' : '')}`} 
        style={{ transform: isMobile ? `translateY(${dragDistance}px)` : 'none' }}
        onClick={preventClose} 
      >
        {isMobile && (
          <div 
            className="gesture-handle"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="handle-bar"></div>
          </div>
        )}
        <button
            className="popup-close-button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
          &times;
        </button>
        <form onSubmit={handleSubmit} onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
          <h2>Log a New Poop</h2>

          <label className="form-label" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
            <p>Date and Time</p>
            <input
              type="datetime-local"
              name="dateTime"
              className="form-input"
              max={today.toISOString().substring(0,10)}
              onChange={handleChange}
              onClick={preventClose}
              onTouchStart={preventClose}
              onTouchMove={preventClose}
              onTouchEnd={preventClose}
              required
            />
          </label>

          <label className="form-label" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
            <p>Location</p>
            <Creatable
             options={previousLocations}
             name="location"
             placeholder="Home, Matthew's House, etc."
             onChange={handleLocationChange}
             styles={customStyles}
             onTouchStart={preventClose}
             onTouchMove={preventClose}
             onTouchEnd={preventClose}
             required
            />
          </label>

          <label className="form-label" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
            <p>Duration (minutes)</p>
            <input
              type="number"
              name="duration"
              className="form-input"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              onClick={preventClose}
              onTouchStart={preventClose}
              onTouchMove={preventClose}
              onTouchEnd={preventClose}
              required
            />
          </label>

          <label className="form-label" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
            <p>Poop Quality</p>
            <div className="star-container" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
              <Rating allowFraction onClick={handlePoopStars} required/>  
            </div>
          </label>

          <label className="form-label" htmlFor="wipeQuality" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
            <p>Wipe Quality</p>
            <div className="star-container" onClick={preventClose} onTouchStart={preventClose} onTouchMove={preventClose} onTouchEnd={preventClose}>
              <Rating allowFraction onClick={handleWipeStars} required name="wipeQuality"/>
            </div>
          </label>

          <label className="form-label">
            <p>Wet to Dry</p>
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
          </label>

          <label className="form-label">
            <p>Granular to Solid</p>
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
          </label>

          <button type="submit" className="form-submit-button">
            Log Poop
          </button>
        </form>
      </div>
    </div>
  );
};


export const PoopStatistics = () =>{
  const[popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const togglePopup = () =>{
    setPopupOpen(!popupOpen);
  }

  return (
    <div>
      <NewPoopLog onClose={togglePopup} isOpen={popupOpen}/>
      {!user ? (
        <Auth/>
      ) : (
        <button className="new-poop-button"onClick={togglePopup}>+</button>
      )}
    </div>
  );
}