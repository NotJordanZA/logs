import React from 'react';
import '../styling/stats.css';

const PopularTimes = ({ logs }) => {
  const getPopularTimes = () => {
    const hourCounts = logs.reduce((acc, log) => {
      const hour = new Date(log.dateTime).getHours();
      const hourKey = `${hour.toString().padStart(2, '0')}:00-${((hour + 1) % 24).toString().padStart(2, '0')}:00`;
      acc[hourKey] = (acc[hourKey] || 0) + 1;
      return acc;
    }, {});

    // Create entries for all 24 hours
    const allHours = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      const nextHour = ((i + 1) % 24).toString().padStart(2, '0');
      const timeKey = `${hour}:00-${nextHour}:00`;
      return [timeKey, hourCounts[timeKey] || 0];
    });

    return allHours
      .sort(([, a], [, b]) => b - a)
      .map(([timeRange, count]) => ({
        timeRange,
        count,
        percentage: ((count / logs.length) * 100).toFixed(1)
      }));
  };

  const popularTimes = getPopularTimes();
  const topTimes = popularTimes.slice(0, 3); // Show top 5 times

  return (
    <div className="stat-card">
      <h3>Popular Poop Times</h3>
      <div className="popular-times-list">
        {topTimes.map((item, index) => (
          <div key={item.timeRange} className="time-item">
            <span className="rank">#{index + 1}</span>
            <div className="time-range">
              <span className="time-label">{item.timeRange}</span>
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

export default PopularTimes; 