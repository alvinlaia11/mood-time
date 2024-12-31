import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Stats.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const moodColors = {
  'Senang': '#4ade80',
  'Sedih': '#60a5fa',
  'Marah': '#f87171',
  'Lelah': '#fbbf24',
  'Bersemangat': '#a78bfa'
};

const moodEmojis = {
  'Senang': '😊',
  'Sedih': '😢',
  'Marah': '😠',
  'Lelah': '😫',
  'Bersemangat': '💪'
};

const Stats = ({ moodEntries = [] }) => {
  // Jika tidak ada data
  if (!moodEntries || moodEntries.length === 0) {
    return (
      <div className="stats-container">
        <div className="stats-chart">
          <p className="no-data-message">
            Belum ada data mood yang tercatat. Mulai catat mood Anda sekarang!
          </p>
        </div>
      </div>
    );
  }

  // Process mood distribution
  const moodCounts = moodEntries.reduce((acc, entry) => {
    if (entry && entry.mood && entry.mood.label) {
      const mood = entry.mood.label;
      acc[mood] = (acc[mood] || 0) + 1;
    }
    return acc;
  }, {});

  const moodLabels = Object.keys(moodCounts);
  const moodData = moodLabels.map(label => moodCounts[label]);
  const moodColorValues = moodLabels.map(label => moodColors[label]);

  // Process activities
  const activityCounts = moodEntries.reduce((acc, entry) => {
    if (entry && entry.activities) {
      entry.activities.forEach(activity => {
        acc[activity] = (acc[activity] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // Sort activities by frequency
  const sortedActivities = Object.entries(activityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5 activities

  // Find dominant mood
  const dominantMood = moodLabels.length > 0 
    ? moodLabels.reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b)
    : null;

  const moodChartData = {
    labels: moodLabels,
    datasets: [{
      data: moodData,
      backgroundColor: moodColorValues,
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const activityChartData = {
    labels: sortedActivities.map(([label]) => label),
    datasets: [{
      label: 'Frekuensi Aktivitas',
      data: sortedActivities.map(([, count]) => count),
      backgroundColor: '#3b82f6',
      borderRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          boxWidth: 15,
          usePointStyle: true
        }
      }
    },
    cutout: '70%',
    layout: {
      padding: 20
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          display: false
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 40
      }
    }
  };

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {/* Distribusi Mood */}
        <div className="stats-chart">
          <div className="stats-chart-header">
            <h3 className="stats-title">Distribusi Mood</h3>
            <p className="stats-subtitle">Perbandingan mood yang Anda rasakan</p>
          </div>
          <div className="chart-container">
            <Doughnut
              data={moodChartData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
                responsive: true
              }}
            />
          </div>
        </div>

        {/* Aktivitas Terpopuler */}
        <div className="stats-chart">
          <div className="stats-chart-header">
            <h3 className="stats-title">Aktivitas Terpopuler</h3>
            <p className="stats-subtitle">5 aktivitas yang paling sering dilakukan</p>
          </div>
          <div className="chart-container">
            <Bar
              data={activityChartData}
              options={{
                ...barChartOptions,
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Mood Dominan */}
        <div className="stats-chart">
          <div className="stats-chart-header">
            <h3 className="stats-title">Mood Dominan</h3>
            <p className="stats-subtitle">Mood yang paling sering Anda rasakan</p>
          </div>
          <div className="mood-dominant">
            {dominantMood && (
              <>
                <span className="mood-emoji">{moodEmojis[dominantMood]}</span>
                <span className="mood-label">{dominantMood}</span>
                <span className="mood-count">{moodCounts[dominantMood]} kali</span>
              </>
            )}
          </div>
        </div>

        {/* Total Catatan */}
        <div className="stats-chart">
          <div className="stats-chart-header">
            <h3 className="stats-title">Total Catatan</h3>
            <p className="stats-subtitle">Jumlah hari pencatatan mood</p>
          </div>
          <div className="total-entries">
            <span className="entry-count">{moodEntries.length}</span>
            <span className="entry-label">hari</span>
            <span className="entry-period">Periode pencatatan aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
