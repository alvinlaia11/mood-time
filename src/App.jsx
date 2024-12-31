import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CalendarPicker from './components/CalendarPicker';
import MoodForm from './components/MoodForm';
import Stats from './components/Stats';
import SuccessPopup from './components/SuccessPopup';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodData, setMoodData] = useState({});
  const [showMoodForm, setShowMoodForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteDate, setNoteDate] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const savedMoodData = localStorage.getItem('moodData');
    if (savedMoodData) {
      setMoodData(JSON.parse(savedMoodData));
    }
  }, []);

  const handleSaveMood = (moodEntry) => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const newMoodData = {
      ...moodData,
      [dateStr]: {
        date: selectedDate,
        ...moodEntry
      }
    };
    setMoodData(newMoodData);
    localStorage.setItem('moodData', JSON.stringify(newMoodData));
    setShowSuccess(true);
    
    // Scroll ke statistik setelah popup hilang
    setTimeout(() => {
      setShowSuccess(false);
      setShowMoodForm(false);
      statsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 2000);
  };

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    // Jika tanggal sudah memiliki mood entry, jangan tampilkan form
    if (moodData[dateStr]) {
      return;
    }
    
    setSelectedDate(date);
    setShowMoodForm(true);
  };

  const handleNoteClick = (note, date) => {
    setSelectedNote(note);
    setNoteDate(date);
    setShowNoteModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto">
        <div className="app-container">
          {/* Baris Pertama - Kalender dan Form Mood */}
          <div className="mood-cards-row">
            {/* Card Kalender */}
            <div className="mood-card">
              <div className="mood-card-header">
                <div className="mood-card-icon">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="mood-card-title">Kalender</h2>
              </div>
              <div className="mood-card-content">
                <CalendarPicker
                  onDateChange={handleDateClick}
                  initialDate={selectedDate}
                  moodData={moodData}
                  onNoteClick={handleNoteClick}
                />
              </div>
            </div>

            {/* Card Form Mood */}
            <div className="mood-card">
              <div className="mood-card-header">
                <div className="mood-card-icon">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="mood-card-title">Catat Mood</h2>
              </div>
              <div className="mood-card-content">
                {!showMoodForm ? (
                  <div className="mood-empty-state">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Pilih tanggal di kalender untuk mencatat mood Anda</p>
                    <button
                      onClick={() => {
                        setSelectedDate(new Date());
                        setShowMoodForm(true);
                      }}
                      className="mood-empty-state-button"
                    >
                      Catat Mood Hari Ini
                    </button>
                  </div>
                ) : (
                  <MoodForm
                    selectedDate={selectedDate}
                    onSave={handleSaveMood}
                    existingMood={moodData[selectedDate.toISOString().split('T')[0]]}
                    onCancel={() => setShowMoodForm(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Baris Kedua - Statistik */}
          <div className="mood-card" ref={statsRef}>
            <div className="mood-card-header">
              <div className="mood-card-icon">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="mood-card-title">Statistik</h2>
            </div>
            <div className="mood-card-content">
              <Stats moodEntries={Object.values(moodData)} />
            </div>
          </div>
        </div>
      </main>

      {/* Success Popup */}
      <SuccessPopup 
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      {/* Note Modal */}
      {showNoteModal && selectedNote && noteDate && (
        <div className="note-modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="note-modal" onClick={e => e.stopPropagation()}>
            <div className="note-modal-header">
              <h3>Catatan Tanggal {noteDate.toLocaleDateString('id-ID', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</h3>
              <button className="close-button" onClick={() => setShowNoteModal(false)}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </button>
            </div>
            <div className="note-modal-content">
              <p>{selectedNote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
