import React, { useState, useEffect } from 'react';
import { X, UserPlus, Check, Save } from 'lucide-react';

const JURUSAN_OPTIONS = [
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer & Jaringan',
  'Multimedia / DKV',
  'Sistem Informasi Jaringan & Aplikasi',
  'Teknik Elektronika Industri',
  'Akuntansi & Keuangan Lembaga',
  'Otomatisasi & Tata Kelola Perkantoran'
];

export default function SiswaModal({ isOpen, onClose, onSave, studentToEdit }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: JURUSAN_OPTIONS[0],
  });

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        kode_siswa: studentToEdit.kode_siswa || '',
        nama_siswa: studentToEdit.nama_siswa || '',
        alamat_siswa: studentToEdit.alamat_siswa || '',
        tgl_siswa: studentToEdit.tgl_siswa ? studentToEdit.tgl_siswa.split('T')[0] : '',
        jurusan_siswa: studentToEdit.jurusan_siswa || JURUSAN_OPTIONS[0],
      });
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: JURUSAN_OPTIONS[0],
      });
    }
    setFormError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validasi field kosong
    if (!formData.kode_siswa.trim()) {
      setFormError('Kode Siswa wajib diisi.');
      return;
    }
    if (!formData.nama_siswa.trim()) {
      setFormError('Nama Siswa wajib diisi.');
      return;
    }
    if (!formData.alamat_siswa.trim()) {
      setFormError('Alamat Siswa wajib diisi.');
      return;
    }
    if (!formData.tgl_siswa) {
      setFormError('Tanggal Siswa / Tanggal Lahir wajib diisi.');
      return;
    }
    if (!formData.jurusan_siswa) {
      setFormError('Jurusan Siswa wajib dipilih.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData, studentToEdit ? studentToEdit.id : null);
      onClose();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Terjadi kesalahan saat menyimpan data.';
      setFormError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-icon">
              {studentToEdit ? <Save size={20} /> : <UserPlus size={20} />}
            </div>
            <h2>{studentToEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa Baru'}</h2>
          </div>
          <button className="btn-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        {formError && (
          <div className="alert-error">
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="kode_siswa">
              Kode Siswa <span className="required">*</span>
            </label>
            <input
              type="text"
              id="kode_siswa"
              name="kode_siswa"
              placeholder="Contoh: SIS004"
              value={formData.kode_siswa}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <small className="form-help">Kode unik untuk identifikasi siswa.</small>
          </div>

          <div className="form-group">
            <label htmlFor="nama_siswa">
              Nama Siswa <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nama_siswa"
              name="nama_siswa"
              placeholder="Masukkan nama lengkap siswa"
              value={formData.nama_siswa}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tgl_siswa">
                Tgl Siswa / Tanggal Lahir <span className="required">*</span>
              </label>
              <input
                type="date"
                id="tgl_siswa"
                name="tgl_siswa"
                value={formData.tgl_siswa}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jurusan_siswa">
                Jurusan Siswa <span className="required">*</span>
              </label>
              <select
                id="jurusan_siswa"
                name="jurusan_siswa"
                value={formData.jurusan_siswa}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              >
                {JURUSAN_OPTIONS.map((jurusan, index) => (
                  <option key={index} value={jurusan}>
                    {jurusan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="alamat_siswa">
              Alamat Siswa <span className="required">*</span>
            </label>
            <textarea
              id="alamat_siswa"
              name="alamat_siswa"
              rows={3}
              placeholder="Masukkan alamat lengkap tempat tinggal siswa"
              value={formData.alamat_siswa}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <Check size={18} />
                  <span>{studentToEdit ? 'Simpan Perubahan' : 'Tambahkan Siswa'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
