# Frontend - Sistem Manajemen Data Siswa (React.js)

Aplikasi Frontend berbasis React.js (Vite) yang meng-consume RESTful API Express.js untuk manajemen data siswa dengan operasi lengkap CRUD (Create, Read, Update, Delete). Dibuat sesuai skema uji praktik FullStack Web Developer.

---

## 🛠️ Teknologi yang Digunakan
- **Framework / Bundler:** React 19 + Vite
- **HTTP Client:** Axios
- **Icon Library:** Lucide React
- **Styling:** Modern Responsive CSS (Plus Jakarta Sans, Card Layout, Interactive Modals, Toast Notification)

---

## ✨ Fitur Aplikasi
- **Menampilkan Data Siswa (Read):** Tabel data siswa dengan kolom Kode Siswa, Nama Siswa, Tanggal Siswa, Jurusan Siswa, Alamat Siswa, serta tombol aksi Edit dan Hapus.
- **Pencarian & Filter Interaktif:** Cari data siswa berdasarkan nama, kode, alamat, atau jurusan secara real-time, plus filter dropdown berdasarkan jurusan.
- **Menambah Data Siswa (Create):** Modal dialog form input dengan validasi lengkap.
- **Mengedit Data Siswa (Update):** Modal edit form yang otomatis memuat data siswa terpilih.
- **Menghapus Data Siswa (Delete):** Dialog konfirmasi hapus data siswa untuk mencegah ketidaksengajaan.
- **Notifikasi Toast:** Umpan balik visual real-time setelah setiap operasi CRUD.
- **Statistik Cepat:** Menampilkan total siswa, jurusan aktif, dan status koneksi API.

---

## 🚀 Cara Menjalankan Frontend

1. **Pastikan Backend sudah berjalan terlebih dahulu:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Buka terminal baru dan masuk ke folder `frontend`:**
   ```bash
   cd frontend
   ```

3. **Install dependensi (jika belum):**
   ```bash
   npm install
   ```

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```

5. Buka tautan lokal di browser (biasanya `http://localhost:5173`).

---

## 📤 Push ke GitHub (Repository Terpisah)
1. Buat repository baru di GitHub untuk frontend (misal: `tugas-frontend-siswa`).
2. Jalankan perintah berikut di terminal:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "feat: inisialisasi frontend React.js untuk CRUD data siswa"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-KAMU>/<NAMA-REPO-FRONTEND>.git
   git push -u origin main
   ```
