# Weekdays Coffee — Landing Page

Website landing page untuk **Weekdays Coffee** (#TemanKantor), dibangun dengan
React + Vite. Empat halaman (Beranda, Tentang, Outlet, Event) dapat diklik
antar-halaman tanpa reload lewat state internal `App.jsx`.

## Struktur project

```
weekdays-landing/
├─ index.html
├─ package.json
├─ vite.config.js
├─ .gitignore
├─ public/
│  └─ assets/          # 19 foto asli dari @weekdayscoffee.id
├─ src/
│  ├─ main.jsx          # entry point React
│  └─ App.jsx           # seluruh UI 4 halaman (single component)
└─ README.md
```

Gambar di `public/assets/` diakses lewat path absolut `/assets/nama-file.jpg`
di dalam `App.jsx` — ini konvensi standar folder `public/` pada Vite, jadi
tidak perlu diubah.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist/`.

---

## Upload ke GitHub (repo: weekdayscoffee/landing-page)

Dari dalam folder project ini:

```bash
git init
git add .
git commit -m "Initial commit: Weekdays Coffee landing page"
git branch -M main
git remote add origin https://github.com/weekdayscoffee/landing-page.git
git push -u origin main
```

Jika repo `weekdayscoffee/landing-page` belum ada di GitHub, buat dulu repo
kosong (tanpa README/gitignore bawaan GitHub) di akun/organisasi
`weekdayscoffee`, baru jalankan perintah di atas. Git akan meminta autentikasi
GitHub kamu (lewat browser/token) saat `git push`.

## Deploy ke Vercel

**Opsi A — lewat dashboard Vercel (disarankan):**
1. Login ke [vercel.com](https://vercel.com) dan klik **Add New → Project**.
2. Pilih **Import Git Repository**, lalu pilih `weekdayscoffee/landing-page`.
3. File `vercel.json` di repo ini sudah mengunci konfigurasi build secara
   eksplisit (`npm install` → `npm run build` → output `dist`), jadi biasanya
   tidak perlu diubah apa-apa.
4. Klik **Deploy**. Setelah selesai, Vercel akan memberi URL live (mis.
   `landing-page-xxxx.vercel.app`), dan bisa dihubungkan ke domain
   `weekdayscoffee.id` lewat menu **Domains** di project settings.

**Jika masih muncul error `vite: command not found`:**
Itu berarti ada *override* manual di dashboard yang menimpa `vercel.json`.
Buka **Project Settings → Build & Development Settings**, cek toggle
**Override** di baris Build Command dan Install Command:
- Jika toggle menyala dan isinya `vite build` mentah → matikan togglenya
  (biar `vercel.json` yang berlaku), atau ganti isinya jadi `npm run build`.
- Install Command pastikan `npm install` (bukan kosong).
- Root Directory pastikan kosong/`.` (bukan menunjuk ke subfolder lain),
  supaya Vercel membaca `package.json` di root repo ini.

Setelah itu, redeploy dari tab **Deployments → ⋯ → Redeploy**.

**Opsi B — lewat Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel        # deploy preview
vercel --prod # deploy production
```

---

## Catatan gambar

Lihat tabel pemetaan lengkap gambar-ke-halaman di file terpisah
`IMAGE_MAPPING.md` (disertakan). Semua 19 foto adalah foto asli dari
postingan Instagram @weekdayscoffee.id, bukan foto stok.
