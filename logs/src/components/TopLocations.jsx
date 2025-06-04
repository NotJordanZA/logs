import React from 'react';
import '../styling/stats.css';

const TopLocations = ({ logs }) => {
  const getTopLocations = () => {
    const locationCounts = logs.reduce((acc, log) => {
      const location = log.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(locationCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([location, count]) => ({
        location,
        count,
        percentage: ((count / logs.length) * 100).toFixed(1)
      }));
  };

  const topLocations = getTopLocations();

  return (
    <div className="stat-card">
      <h3>Top Locations</h3>
      <div className="top-locations-list">
        {topLocations.map((item, index) => (
          <div key={item.location} className="location-item">
            <span className="rank">#{index + 1}</span>
            <div className="location">
              <span className="location-name">{item.location}</span>
              <span className="count">
                {item.count} poops ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLocations; 