import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SiswaModal from './components/SiswaModal';
import DeleteModal from './components/DeleteModal';
import Notification from './components/Notification';
import { 
  getSiswaList, 
  createSiswa, 
  updateSiswa, 
  deleteSiswa 
} from './services/api';
import { 
  Search, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Users, 
  BookOpen, 
  Calendar,
  AlertCircle,
  Inbox
} from 'lucide-react';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurusan, setSelectedJurusan] = useState('ALL');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Notification state
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Fetch data siswa dari API Backend
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setApiError(null);
      const res = await getSiswaList();
      if (res.success) {
        setStudents(res.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const msg = err.response?.data?.message || err.message || 'Gagal terhubung ke server backend API.';
      setApiError(msg);
      showNotification(`Koneksi Backend Gagal: Pastikan backend berjalan di port 5000`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filtered students berdasarkan search query dan pilihan jurusan
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchQuery = 
        student.kode_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.jurusan_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.alamat_siswa.toLowerCase().includes(searchQuery.toLowerCase());

      const matchJurusan = 
        selectedJurusan === 'ALL' || student.jurusan_siswa === selectedJurusan;

      return matchQuery && matchJurusan;
    });
  }, [students, searchQuery, selectedJurusan]);

  // Daftar jurusan unik dari data yang ada
  const uniqueJurusanList = useMemo(() => {
    const list = students.map(s => s.jurusan_siswa);
    return Array.from(new Set(list));
  }, [students]);

  // Handle Tambah Baru (Open Modal)
  const handleOpenAddModal = () => {
    setSelectedStudent(null);
    setIsFormModalOpen(true);
  };

  // Handle Edit (Open Modal dengan data yang dipilih)
  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  // Handle Buka Modal Hapus
  const handleOpenDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  // Simpan data (Create atau Update)
  const handleSaveStudent = async (formData, id) => {
    if (id) {
      // Update
      const res = await updateSiswa(id, formData);
      if (res.success) {
        showNotification(`Data siswa '${formData.nama_siswa}' berhasil diperbarui!`, 'success');
        fetchStudents();
      }
    } else {
      // Create
      const res = await createSiswa(formData);
      if (res.success) {
        showNotification(`Siswa baru '${formData.nama_siswa}' berhasil ditambahkan!`, 'success');
        fetchStudents();
      }
    }
  };

  // Hapus data (Delete)
  const handleDeleteConfirm = async (id) => {
    try {
      const res = await deleteSiswa(id);
      if (res.success) {
        showNotification(res.message || 'Data siswa berhasil dihapus!', 'success');
        fetchStudents();
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Gagal menghapus data siswa.';
      showNotification(msg, 'error');
    }
  };

  // Format tanggal menjadi format Indonesia yang rapi (cth: 15 Maret 2006)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar 
        onRefresh={fetchStudents} 
        loading={loading} 
        totalCount={students.length} 
      />

      <main className="main-content">
        {/* Statistik Ringkas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">
              <Users size={24} />
            </div>
            <div>
              <div className="stat-val">{students.length}</div>
              <div className="stat-label">Total Data Siswa</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-purple">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="stat-val">{uniqueJurusanList.length}</div>
              <div className="stat-label">Jurusan Terdaftar</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">
              <Calendar size={24} />
            </div>
            <div>
              <div className="stat-val">{filteredStudents.length}</div>
              <div className="stat-label">Siswa Tampil (Filter)</div>
            </div>
          </div>
        </div>

        {/* Kontrol: Pencarian, Filter & Tombol Tambah */}
        <div className="controls-bar">
          <div className="search-filter-wrapper">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Cari nama, kode, alamat, atau jurusan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={selectedJurusan}
              onChange={(e) => setSelectedJurusan(e.target.value)}
            >
              <option value="ALL">Semua Jurusan</option>
              {uniqueJurusanList.map((jurusan, idx) => (
                <option key={idx} value={jurusan}>{jurusan}</option>
              ))}
            </select>
          </div>

          <button className="btn-add" onClick={handleOpenAddModal}>
            <UserPlus size={18} />
            <span>Tambah Data Siswa</span>
          </button>
        </div>

        {/* Notifikasi Error Koneksi API jika ada */}
        {apiError && (
          <div className="alert-error" style={{ margin: '0 0 1.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} />
              <span><strong>Error:</strong> {apiError}</span>
            </div>
          </div>
        )}

        {/* Tabel Data Siswa (Read & Action CRUD) */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>No</th>
                  <th>Kode Siswa</th>
                  <th>Nama Siswa</th>
                  <th>Tanggal Siswa</th>
                  <th>Jurusan Siswa</th>
                  <th>Alamat Siswa</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="loading-state">
                        <div className="spinning" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                          <Users size={32} color="#4f46e5" />
                        </div>
                        <div className="empty-title">Memuat data siswa...</div>
                        <div className="empty-desc">Mengambil data dari API backend Express.js</div>
                      </div>
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">
                        <div className="empty-icon-wrapper">
                          <Inbox size={32} />
                        </div>
                        <div className="empty-title">Data Siswa Tidak Ditemukan</div>
                        <div className="empty-desc">
                          {searchQuery || selectedJurusan !== 'ALL'
                            ? 'Tidak ada data siswa yang cocok dengan filter pencarian Anda.'
                            : 'Belum ada data siswa di database. Silakan klik tombol "Tambah Data Siswa".'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge-kode">{student.kode_siswa}</span>
                      </td>
                      <td>
                        <strong style={{ color: '#1e293b' }}>{student.nama_siswa}</strong>
                      </td>
                      <td>
                        <span className="date-text">{formatDate(student.tgl_siswa)}</span>
                      </td>
                      <td>
                        <span className="badge-jurusan">{student.jurusan_siswa}</span>
                      </td>
                      <td>
                        <div className="alamat-text" title={student.alamat_siswa}>
                          {student.alamat_siswa}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons" style={{ justifyContent: 'center' }}>
                          <button
                            className="btn-icon btn-edit"
                            title="Edit Data Siswa"
                            onClick={() => handleOpenEditModal(student)}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            title="Hapus Data Siswa"
                            onClick={() => handleOpenDeleteModal(student)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Aplikasi CRUD Data Siswa &copy; 2026 - Express.js & React.js</p>
      </footer>

      {/* Modal Tambah / Edit Siswa */}
      <SiswaModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={selectedStudent}
      />

      {/* Modal Konfirmasi Hapus Siswa */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        student={selectedStudent}
      />

      {/* Toast Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
    </div>
  );
}
