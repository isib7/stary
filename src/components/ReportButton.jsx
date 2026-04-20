import React, { useState } from 'react';
import ReportModal from './ReportModal';

export default function ReportButton({ lang }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = lang === 'ar' ? 'أبلغ عن مشكلة' : 'Report Issue';

  return (
    <>
      <button 
        className="report-floating-btn" 
        onClick={() => setIsModalOpen(true)}
        aria-label={title}
        title={title}
      >
        <span className="report-icon">⚠️</span>
      </button>

      {isModalOpen && (
        <ReportModal 
          lang={lang} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
