import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SuggestionBox({ lang, t }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const isAr = lang === 'ar';
  const texts = {
    title: isAr ? 'صندوق الاقتراحات' : 'Suggestion Box',
    desc: isAr ? 'يسعدنا سماع أفكارك ومقترحاتك لتحسين المنصة.' : 'We would love to hear your ideas and suggestions to improve the platform.',
    messagePlaceholder: isAr ? 'رسالتك (مطلوب)' : 'Your message (required)',
    emailPlaceholder: isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)',
    phonePlaceholder: isAr ? 'رقم الهاتف (اختياري)' : 'Phone number (optional)',
    submit: isAr ? 'إرسال الاقتراح' : 'Submit Suggestion',
    sending: isAr ? 'جاري الإرسال...' : 'Sending...',
    success: isAr ? 'تم إرسال الاقتراح بنجاح! شكراً لك.' : 'Suggestion sent successfully! Thank you.',
    errorFallback: isAr ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' : 'An error occurred while sending. Please try again later.'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    const { error } = await supabase
      .from('suggestions')
      .insert([
        { message, email, phone }
      ]);

    if (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || texts.errorFallback);
    } else {
      setStatus('success');
      setMessage('');
      setEmail('');
      setPhone('');
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="suggestion-box">
      <div className="suggestion-box__header">
        <h3>{texts.title}</h3>
        <p>{texts.desc}</p>
      </div>

      {status === 'success' ? (
        <div className="suggestion-box__success">
          <span className="success-icon">✓</span>
          <p>{texts.success}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="suggestion-box__form">
          <div className="form-group">
            <textarea
              className="form-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={texts.messagePlaceholder}
              required
              rows={4}
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group row">
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={texts.emailPlaceholder}
              disabled={status === 'loading'}
            />
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={texts.phonePlaceholder}
              disabled={status === 'loading'}
            />
          </div>
          {status === 'error' && (
            <div className="suggestion-box__error">{errorMessage}</div>
          )}
          <button 
            type="submit" 
            className="suggestion-box__submit" 
            disabled={status === 'loading' || !message.trim()}
          >
            {status === 'loading' ? texts.sending : texts.submit}
          </button>
        </form>
      )}
    </div>
  );
}
