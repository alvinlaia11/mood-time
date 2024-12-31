import React from 'react';
import './Help.css';

function Help({ onClose }) {
  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help-modal" onClick={e => e.stopPropagation()}>
        <div className="help-header">
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="help-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bantuan
          </h2>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="help-content">
          <section className="help-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="section-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Memulai
            </h3>
            <p>Selamat datang di Mood Time! Aplikasi ini membantu Anda melacak mood harian dengan mudah dan menyenangkan.</p>
          </section>

          <section className="help-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="section-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Menggunakan Kalender
            </h3>
            <ul>
              <li>Klik tanggal untuk mencatat mood Anda</li>
              <li>Tanggal dengan emoji menunjukkan mood yang sudah dicatat</li>
              <li>Icon pesan menunjukkan adanya catatan tambahan</li>
              <li>Gunakan tombol panah untuk melihat bulan sebelum/sesudah</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="section-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mencatat Mood
            </h3>
            <ul>
              <li>Pilih emoji yang mewakili mood Anda</li>
              <li>Tambahkan catatan untuk menjelaskan perasaan Anda</li>
              <li>Klik "Simpan" untuk menyimpan mood</li>
              <li>Klik "Batal" untuk membatalkan</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="section-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Statistik
            </h3>
            <p>Lihat ringkasan mood Anda dalam bentuk grafik dan statistik. Data ini membantu Anda memahami pola mood dari waktu ke waktu.</p>
          </section>

          <section className="help-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="section-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Tips
            </h3>
            <ul>
              <li>Catat mood secara rutin untuk hasil yang lebih akurat</li>
              <li>Tambahkan catatan detail untuk referensi di masa depan</li>
              <li>Gunakan statistik untuk memahami pola mood Anda</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Help;
