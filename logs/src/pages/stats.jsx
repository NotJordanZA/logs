import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Ensure Firebase is configured
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import TimeFilter from "../components/TimeFilter";
import StatCard from "../components/StatCard";
import { NewPoopLog } from "../components/logger";
import Auth from "../utils/login";
import '../styling/stats.css';

const StatsPage = () => {
  const [timeRange, setTimeRange] = useState("pastWeek"); 
  const [customRange, setCustomRange] = useState({ startDate: null, endDate: null });
  const [statsData, setStatsData] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [firstPoopDate, setFirstPoopDate] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getFirstPoopDate = async () => {
      if (!auth.currentUser) {
        console.error("User not authenticated");
        return null;
      }
    
      try {
        // Reference the user's logs subcollection
        const logsRef = collection(db, "users", auth.currentUser.uid, "logs");
    
        // Query the first poop by ordering by timestamp
        const firstPoopQuery = query(logsRef, orderBy("dateTime"), limit(1));
    
        // Fetch the data
        const snapshot = await getDocs(firstPoopQuery);
    
        if (!snapshot.empty) {
          // Get the first document
          const firstPoop = snapshot.docs[0].data();
          const firstPoopDate = firstPoop.dateTime.substring(0,10); // Convert Firestore Timestamp to JavaScript Date
          setFirstPoopDate(firstPoopDate);
        } else {
          console.log("No poops logged for this user.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching first poop date:", error);
        return null;
      }
    };

    getFirstPoopDate();
  }, [auth.currentUser]);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 600);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePopup = () =>{
    setPopupOpen(!popupOpen);
  }

  const getTimeRange = (range) => {
    const now = new Date();
    let startDate, endDate;

    switch (range) {
      case "pastWeek":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        endDate = now;
        break;
      case "pastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        endDate = now;
        break;
      case "past3Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        endDate = now;
        break;
      case "past6Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        endDate = now;
        break;
      case "pastYear":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        endDate = now;
        break;
      case "custom":
        startDate = customRange.startDate ? new Date(customRange.startDate) : null;
        endDate = customRange.endDate ? new Date(customRange.endDate) : null;
        break;
      default:
        startDate = null;
        endDate = null;
    }
    return { startDate, endDate };
  };

  const fetchStats = async (range) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const userLogsRef = collection(db, "users", auth.currentUser.uid, "logs");
    let logsQuery = query(userLogsRef);

    // Apply time range filter
    if (range) {
      logsQuery = query(
        userLogsRef,
        where("dateTime", ">=", range.startDate.toISOString().substring(0,16)),
        where("dateTime", "<=", range.endDate.toISOString().substring(0,16))
      );
    }
    try {
      const querySnapshot = await getDocs(logsQuery);
      const logs = querySnapshot.docs.map((doc) => doc.data());
      setLogs(logs);
      calculateStats(logs);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };



  const calculateStats = (logs) => {
    const totalPoops = logs.length;
    const avgOverallQuality =
      logs.reduce(
        (sum, log) =>
          sum + (Number(log.poopQuality) || 0) + (Number(log.wipeQuality) || 0),
        0
      ) / (totalPoops * 2 || 1); // Divide by twice the number of logs to average both qualities
    const avgPoopQuality =
      logs.reduce((sum, log) => sum + (Number(log.poopQuality) || 0), 0) /
      (totalPoops || 1);

    const avgWipeQuality =
      logs.reduce((sum, log) => sum + (Number(log.wipeQuality) || 0), 0) /
      (totalPoops || 1);

    const avgWetness =
      logs.reduce((sum, log) => sum + (Number(log.wetToSolid) || 0), 0) /
      (totalPoops || 1);

    const avgGranularity =
      logs.reduce((sum, log) => sum + (Number(log.granularToSingular) || 0), 0) /
      (totalPoops || 1);

    const avgDuration =
      logs.reduce((sum, log) => sum + (Number(log.duration) || 0), 0) /
      (totalPoops || 1);
    
    const range = getTimeRange(timeRange);
    const periodStart = range ? range.startDate : new Date();
    const periodEnd = range ? range.endDate.toISOString().substring(0,10) : new Date().toISOString().substring(0,10);
    const effectiveStartDate = firstPoopDate > periodStart.toISOString().substring(0,10) ? firstPoopDate : periodStart.toISOString().substring(0,10);

    const effectiveDays =
      (new Date(periodEnd) - new Date(effectiveStartDate))/ (1000 * 60 * 60 * 24);

    const poopFrequency =
      effectiveDays > 0 ? (totalPoops / effectiveDays).toFixed(2) : 0;


    setStatsData({
      totalPoops,
      avgOverallQuality: avgOverallQuality.toFixed(2),
      avgPoopQuality: avgPoopQuality.toFixed(2),
      avgWipeQuality: avgWipeQuality.toFixed(2),
      avgWetness: avgWetness.toFixed(2),
      avgGranularity: avgGranularity.toFixed(2),
      avgDuration: avgDuration.toFixed(2),
      poopFrequency,
    });
  };

  useEffect(() => {
    const range = getTimeRange(timeRange);
    if (range.startDate && range.endDate && auth.currentUser) fetchStats(range);
  }, [timeRange, customRange, auth.currentUser]);

  return (
    <div className="stats-page">
      <div>
        <NewPoopLog onClose={togglePopup} isOpen={popupOpen} isMobile={isMobile}/>
        {!user ? (
          <Auth/>
        ) : (
          <>
            <TimeFilter timeRange={timeRange} setTimeRange={setTimeRange} setCustomRange={setCustomRange} />
            <div className="stats-grid">
              <StatCard title="Total Poops" value={statsData.totalPoops || 0} />
              <StatCard title="Top Locations" value={statsData.topLocations || "N/A"} />
              <StatCard title="Average Overall Quality" value={statsData.avgOverallQuality || "N/A"} />
              <StatCard title="Average Poop Quality" value={statsData.avgPoopQuality || "N/A"} />
              <StatCard title="Average Wipe Quality" value={statsData.avgWipeQuality || "N/A"} />
              <StatCard title="Average Wetness/Dryness" value={statsData.avgWetness || "N/A"} />
              <StatCard title="Average Granularity" value={statsData.avgGranularity || "N/A"} />
              <StatCard title="Most Popular Poop Time" value={statsData.popularPoopTime || "N/A"} />
              <StatCard title="Average Duration" value={statsData.avgDuration || "N/A"} />
              <StatCard title="Poop Frequency" value={statsData.poopFrequency || "N/A"} />
              <StatCard title="Star Distribution" value={statsData.starDistribution || "N/A"} />
            </div>
            {isMobile ? (
              <button className="new-poop-button"onClick={togglePopup}>+</button>
            ):(
              <button className="new-poop-button"onClick={togglePopup}>+ Log New Poop</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
