import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, student }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(student.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-danger" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-icon icon-danger">
              <AlertTriangle size={20} />
            </div>
            <h2>Konfirmasi Hapus Siswa</h2>
          </div>
          <button className="btn-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-delete">
          <p>Apakah Anda yakin ingin menghapus data siswa berikut?</p>
          <div className="delete-info-card">
            <div><strong>Kode Siswa:</strong> {student.kode_siswa}</div>
            <div><strong>Nama Siswa:</strong> {student.nama_siswa}</div>
            <div><strong>Jurusan:</strong> {student.jurusan_siswa}</div>
          </div>
          <p className="delete-warning-text">Tindakan ini tidak dapat dibatalkan dan data akan terhapus permanen dari database.</p>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Batal
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span>Menghapus...</span>
            ) : (
              <>
                <Trash2 size={18} />
                <span>Ya, Hapus Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
