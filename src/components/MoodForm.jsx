import React, { useState, useEffect } from 'react';
import './SuccessPopup.css';

const activities = [
  { icon: '🏃', label: 'Olahraga' },
  { icon: '📚', label: 'Belajar' },
  { icon: '💼', label: 'Kerja' },
  { icon: '👥', label: 'Bertemu' },
  { icon: '🎮', label: 'Main' },
  { icon: '😴', label: 'Istirahat' },
  { icon: '🎵', label: 'Musik' },
  { icon: '🎬', label: 'Nonton' }
];

const MoodHeader = ({ date }) => {
  const formattedDate = date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="mood-header">
      <h2>Bagaimana perasaan Anda?</h2>
      <p>{formattedDate}</p>
    </div>
  );
};

const MoodOptions = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { emoji: '😊', label: 'Senang' },
    { emoji: '😢', label: 'Sedih' },
    { emoji: '😠', label: 'Marah' },
    { emoji: '😫', label: 'Lelah' },
    { emoji: '💪', label: 'Bersemangat' }
  ];

  return (
    <div className="mood-options">
      {moods.map((mood) => (
        <button
          key={mood.label}
          className={`mood-button ${selectedMood?.label === mood.label ? 'active' : ''}`}
          onClick={() => onMoodSelect(mood)}
          type="button"
        >
          <span className="mood-emoji">{mood.emoji}</span>
          <span className="mood-label">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

const MoodForm = ({ selectedDate, onSave, existingMood, onCancel }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [note, setNote] = useState('');

  // Reset form ketika tanggal berubah
  useEffect(() => {
    setSelectedMood(null);
    setSelectedActivities([]);
    setNote('');
  }, [selectedDate]);

  // Reset form ketika existingMood berubah
  useEffect(() => {
    if (existingMood) {
      setSelectedMood(existingMood.mood);
      setSelectedActivities(existingMood.activities || []);
      setNote(existingMood.note || '');
    } else {
      setSelectedMood(null);
      setSelectedActivities([]);
      setNote('');
    }
  }, [existingMood]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedMood && !note.trim()) return;

    // Simpan data
    onSave({
      mood: selectedMood,
      note: note.trim(),
      activities: selectedActivities
    });

    // Reset form setelah menyimpan
    setSelectedMood(null);
    setSelectedActivities([]);
    setNote('');
  };

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleCancel = () => {
    // Reset form saat membatalkan
    setSelectedMood(null);
    setSelectedActivities([]);
    setNote('');
    onCancel();
  };

  return (
    <div className="mood-form-container">
      <MoodHeader date={selectedDate} />
      
      <div className="mood-form-content">
        <MoodOptions 
          selectedMood={selectedMood} 
          onMoodSelect={setSelectedMood}
        />

        <div className="activity-section">
          <h3>Aktivitas Hari Ini</h3>
          <div className="activity-options">
            {activities.map((activity) => (
              <button
                key={activity.label}
                type="button"
                onClick={() => toggleActivity(activity.label)}
                className={`activity-button ${selectedActivities.includes(activity.label) ? 'active' : ''}`}
              >
                <span className="activity-icon">{activity.icon}</span>
                <span className="activity-label">{activity.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="notes-section">
          <h3>Catatan</h3>
          <textarea
            className="notes-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tambahkan catatan tentang hari ini..."
          />
        </div>

        <div className="form-actions">
          <button 
            className="btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="btn-primary"
            type="button"
            onClick={handleSubmit}
            disabled={!selectedMood && !note.trim()}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodForm;
