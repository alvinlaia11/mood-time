import React, { useState, useEffect } from 'react';
import NoteModal from './NoteModal';
import './Calendar.css';

const CalendarPicker = ({ onDateChange, initialDate, moodData, onNoteClick }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteDate, setNoteDate] = useState(null);
  
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setCurrentDate(new Date(initialDate));
    }
  }, [initialDate]);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const moodEntry = getMoodEntry(day);
    
    // Jika tanggal sudah memiliki mood entry, hanya tampilkan catatan jika ada
    if (moodEntry) {
      if (moodEntry.note) {
        handleNoteClick(new Event('click'), moodEntry.note, newDate);
      }
      return; // Tidak melakukan apa-apa jika tanggal sudah ada mood
    }

    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleNoteClick = (e, note, date) => {
    e.stopPropagation(); // Mencegah trigger handleDateClick
    onNoteClick(note, date);
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const getMoodEntry = (day) => {
    if (!moodData) return null;
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toISOString().split('T')[0];
    return moodData[dateStr] || null;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Tambahkan sel kosong untuk hari-hari sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Tambahkan sel untuk setiap hari dalam bulan
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      const selected = isDateSelected(day);
      const moodEntry = getMoodEntry(day);
      const hasEntry = !!moodEntry;
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

      days.push(
        <button
          key={day}
          className={`calendar-day 
            ${isToday ? 'today' : ''} 
            ${selected ? 'selected' : ''}
            ${hasEntry ? 'has-mood' : ''}
          `}
          onClick={() => !hasEntry && handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {moodEntry && (
            <div className="mood-indicators">
              <span className="mood-emoji">{moodEntry.mood?.emoji}</span>
              {moodEntry.note && (
                <button 
                  className="note-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNoteClick(e, moodEntry.note, dayDate);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    <path d="M6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="month-nav">
          <button className="nav-button" onClick={handlePrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="month-display">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button className="nav-button" onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {weekdays.map(day => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarPicker;