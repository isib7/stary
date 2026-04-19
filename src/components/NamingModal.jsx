import React, { useState, useRef } from 'react';

/**
 * Modal that prompts the user to name a character.
 * Props: modal { key, promptEn, promptAr }, lang, t, onSubmit, onDismiss
 */
export default function NamingModal({ modal, lang, t, onSubmit, onDismiss }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const prompt = lang === 'ar' ? modal.promptAr : modal.promptEn;
  const isRtl = lang === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    onSubmit(name);
    setValue('');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={t.namingModal.title}>
      <div className="modal" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="modal__icon">✦</div>
        <h2 className="modal__title">{t.namingModal.title}</h2>
        <p className="modal__prompt">{prompt}</p>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="modal__input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={t.namingModal.placeholder}
            autoFocus
            maxLength={32}
            dir={isRtl ? 'rtl' : 'ltr'}
          />
          <button
            className="modal__confirm"
            type="submit"
            disabled={!value.trim()}
          >
            {t.namingModal.confirm}
          </button>
        </form>
      </div>
    </div>
  );
}
