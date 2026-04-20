import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ReportModal({ lang, onClose }) {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef(null);
  
  const isAr = lang === 'ar';
  const texts = {
    title: isAr ? 'الإبلاغ عن مشكلة' : 'Report an Issue',
    desc: isAr ? 'وصف المشكلة التي واجهتها (مطلوب)' : 'Describe the issue you encountered (required)',
    addScreenshot: isAr ? 'إضافة صورة (اختياري)' : 'Add Screenshot (optional)',
    changeScreenshot: isAr ? 'تغيير الصورة' : 'Change Screenshot',
    removeScreenshot: isAr ? 'إزالة' : 'Remove',
    submit: isAr ? 'إرسال التقرير' : 'Submit Report',
    submitting: isAr ? 'جاري الإرسال...' : 'Submitting...',
    success: isAr ? 'تم استلام بلاغك شكراً لتعاونك!' : 'Your report has been received. Thank you!',
    errorFallback: isAr ? 'حدث خطأ. يرجى المحاولة ثانية.' : 'An error occurred. Please try again.',
    close: isAr ? 'إغلاق' : 'Close'
  };

  useEffect(() => {
    // Cleanup preview URL to avoid memory leaks
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage(isAr ? 'حجم الصورة يجب أن لا يتجاوز 5 ميجا بايت' : 'Image size must not exceed 5MB');
      return;
    }

    setImageFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMessage('');
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setStatus('uploading');
    setErrorMessage('');

    let uploadedImageUrl = null;

    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('reports')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('reports')
          .getPublicUrl(filePath);
          
        uploadedImageUrl = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('reports')
        .insert([
          { description, image_url: uploadedImageUrl }
        ]);

      if (insertError) throw insertError;

      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || texts.errorFallback);
    }
  };

  return (
    <div className="modal-overlay" onClick={status !== 'uploading' ? onClose : undefined}>
      <div 
        className="modal-content report-modal" 
        onClick={e => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          disabled={status === 'uploading'}
          aria-label={texts.close}
        >
          ✕
        </button>
        
        <h2 className="modal-title">{texts.title}</h2>

        {status === 'success' ? (
          <div className="report-modal__success">
            <span className="success-icon large">✓</span>
            <p>{texts.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="report-modal__form">
            <div className="form-group">
              <label>{texts.desc}</label>
              <textarea
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                disabled={status === 'uploading'}
              />
            </div>

            <div className="form-group image-upload">
              {previewUrl ? (
                <div className="image-preview-container">
                  <img src={previewUrl} alt="Preview" className="image-preview" />
                  <div className="image-preview-actions">
                    <button type="button" onClick={() => fileInputRef.current.click()} className="btn-secondary">
                      {texts.changeScreenshot}
                    </button>
                    <button type="button" onClick={removeImage} className="btn-danger">
                      {texts.removeScreenshot}
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  type="button" 
                  className="upload-placeholder"
                  onClick={() => fileInputRef.current.click()}
                  disabled={status === 'uploading'}
                >
                  <span className="upload-icon">📷</span>
                  <span>{texts.addScreenshot}</span>
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                disabled={status === 'uploading'}
              />
            </div>

            {status === 'error' && (
              <div className="report-modal__error">{errorMessage}</div>
            )}

            <button 
              type="submit" 
              className="report-modal__submit" 
              disabled={status === 'uploading' || !description.trim()}
            >
              {status === 'uploading' ? texts.submitting : texts.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
