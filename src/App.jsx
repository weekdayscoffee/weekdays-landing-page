import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Mail,
  Globe,
  ShieldCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============================================================================
   WEEKDAYS COFFEE / #TemanKantor
   Single-file landing site, four navigable pages (Beranda, Tentang, Outlet, Event).
   Brand grounded in @weekdayscoffee.id : espresso-brown + cream palette,
   "WEEKDAYS" serif wordmark, editorial coffee-and-office vernacular.
   Reference layout structure: lokale.coffee (diverged deliberately, see README).
============================================================================ */

/* ---------- Design tokens ------------------------------------------------- */
const C = {
  white: "#FFFFFF",
  espresso: "#8D4417", // primary brown (updated brand brown)
  roast: "#8B5E34",    // caramel accent
  bean: "#2B1D12",     // near-black text
  latte: "#F6F0E7",    // cream section bg
  foam: "#EADDCB",     // borders / hairlines
  mocha: "#A85A22",    // mid brown
  muted: "#7A6A5A",    // muted text
};

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap";

/* Real Weekdays photos, downloaded from @weekdayscoffee.id's own posts and
   saved locally in ./assets. Each key is named for what the photo actually
   shows so the mapping below stays traceable back to its source post. */
const IMG = {
  // Beranda (Home)
  heroMadeTogether: "/assets/weekdays-01-hero-madebettertogether.jpg", // "Made Better Together" hero, #TemanKantor
  storyGreenWall: "/assets/weekdays-11-greenwall-temankantor.jpg", // 3 teman kantor at the WEEKDAYS green wall
  menuKopiSusu: "/assets/weekdays-05-barista-pour.jpg", // barista pouring milk over coffee
  menuMatcha: "/assets/weekdays-03c-matcha-slide3.jpg", // matcha being poured into glass
  menuSteak: "/assets/weekdays-06a-steak-slide1.jpg", // BBQ sauce poured over NZ steak rib eye
  menuPenne: "/assets/weekdays-10b-penne-napolitana-slide2.jpg", // close-up forkful of Penne Napolitana
  halalDish: "/assets/weekdays-09b-nasigoreng-kebuli-slide2.jpg", // Nasi Goreng Sapi Kebuli, top-down

  // Tentang (About)
  aboutTakeBreak: "/assets/weekdays-02-take-a-break.jpg", // "Take a Break" coffee + lunch
  aboutCommunity: "/assets/weekdays-07a-healing-temankantor-slide1.jpg", // group photo, "Healing Sejenak bareng #TemanKantor"

  // Outlet gallery
  outletCoworking: "/assets/weekdays-07b-healing-temankantor-slide2.jpg", // laptops, "Stay Chill your dreams are brewing"
  outletWorkday: "/assets/weekdays-04-workday-lighter.jpg", // laptop, iced coffee, pasta
  outletSteakPatio: "/assets/weekdays-06b-steak-slide2.jpg", // eating steak on the outdoor patio
  outletNasiGoreng: "/assets/weekdays-09a-nasigoreng-kebuli-slide1.jpg", // hands sharing Nasi Goreng Kebuli
  outletMatchaTools: "/assets/weekdays-03a-matcha-slide1.jpg", // matcha whisk & tray still life
  outletMatchaWhisk: "/assets/weekdays-03b-matcha-slide2.jpg", // whisking matcha by hand
  outletTableShare: "/assets/weekdays-10a-penne-napolitana-slide1.jpg", // shared table, pasta and nasi goreng

  // Event
  eventHero: "/assets/weekdays-08a-iftar-slide1.jpg", // group laughing over iftar drinks
  eventContact: "/assets/weekdays-08c-iftar-slide3.jpg", // couple sharing kurma at iftar
  eventBites: "/assets/weekdays-08b-iftar-slide2.jpg", // hands sharing fritters & kurma
};

/* ---------- Small building blocks ---------------------------------------- */

// The WEEKDAYS wordmark, set in Fraunces to echo the IG profile lockup.
function Wordmark({ color = C.espresso, size = 26 }) {
  return (
    <span
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 600,
        letterSpacing: "0.14em",
        fontSize: size,
        color,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      WEEKDAYS
      <sup style={{ fontSize: size * 0.34, marginLeft: 2, top: "-0.7em" }}>®</sup>
    </span>
  );
}

function Img({ src, alt, style, className }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(135deg, ${C.mocha}, ${C.espresso})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Fraunces', serif",
          letterSpacing: "0.14em",
          fontSize: 14,
          ...style,
        }}
      >
        WEEKDAYS
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
      style={{ objectFit: "cover", ...style }}
    />
  );
}

/* ---------- Navigation ---------------------------------------------------- */
const PAGES = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "outlet", label: "Outlet" },
  { id: "event", label: "Event" },
];

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="wd-navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.foam}`,
        width: "100%",
      }}
    >
      <div
        className="wd-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        <button
          onClick={() => {
            setPage("home");
            setOpen(false);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Weekdays Coffee, beranda"
        >
          <Wordmark size={24} />
        </button>

        <nav
          className="wd-desktop-nav"
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: page === p.id ? 600 : 500,
                color: page === p.id ? C.espresso : C.muted,
                letterSpacing: "0.02em",
                paddingBottom: 4,
                borderBottom:
                  page === p.id ? `2px solid ${C.roast}` : "2px solid transparent",
                transition: "color .2s",
              }}
            >
              {p.label}
            </button>
          ))}
          <a
            href="https://weekdayscoffee.id"
            onClick={(e) => e.preventDefault()}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: C.white,
              background: C.espresso,
              padding: "10px 18px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Pesan Sekarang
          </a>
        </nav>

        <button
          className="wd-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="wd-mobile-menu">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPage(p.id);
                setOpen(false);
              }}
              className={`wd-mobile-link ${page === p.id ? "active" : ""}`}
            >
              <span>{p.label}</span>
              {page === p.id && <span className="wd-active-dot" />}
            </button>
          ))}
          <a
            href="https://weekdayscoffee.id"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            className="wd-mobile-cta"
          >
            Pesan Sekarang
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Shared bits --------------------------------------------------- */
function Eyebrow({ children, color = C.roast }) {
  return (
    <div
      className="wd-eyebrow"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color,
        marginBottom: 14,
      }}
    >
      <span style={{ width: 22, height: 1.5, background: color, display: "inline-block" }} />
      {children}
    </div>
  );
}

function Stat({ n, label, color = C.espresso }) {
  return (
    <div className="wd-stat-item">
      <div className="wd-stat-num" style={{ color }}>
        {n}
      </div>
      <div className="wd-stat-label">
        {label}
      </div>
    </div>
  );
}

/* ============================== HOME ===================================== */
function Home({ setPage }) {
  return (
    <>
      {/* HERO: editorial & clean */}
      <section className="wd-section-pad" style={{ paddingTop: 36, paddingBottom: 24 }}>
        <div className="wd-container">
          <div className="wd-hero">
            <div>
              <Eyebrow>Coffee • Food • Collaboration</Eyebrow>
              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  fontSize: "clamp(32px, 5.2vw, 68px)",
                  lineHeight: 1.05,
                  color: C.bean,
                  margin: "0 0 20px",
                }}
              >
                Made better,
                <br />
                <span style={{ fontStyle: "italic", color: C.espresso }}>together.</span>
              </h1>
              <p
                style={{
                  ...pStyle,
                  maxWidth: 440,
                  margin: "0 0 28px",
                }}
              >
                Kopi yang tepat, menu yang bikin fokus, dan ruang hangat buat teman
                kantor. Weekdays hadir untuk menemani setiap jeda kecilmu. Find your
                little pause.
              </p>
              <div className="wd-hero-btns">
                <button
                  onClick={() => setPage("outlet")}
                  style={btnPrimary}
                >
                  Temukan Outlet
                </button>
                <button onClick={() => setPage("event")} style={btnGhost}>
                  Event & Kolaborasi
                </button>
              </div>
            </div>

            <div className="wd-hero-img-wrap">
              <Img
                src={IMG.heroMadeTogether}
                alt="Suasana Weekdays Coffee"
                className="wd-hero-img"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(74,46,28,0.92)",
                  color: C.white,
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                }}
              >
                #TemanKantor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section style={{ padding: "10px 0" }}>
        <div className="wd-container">
          <div className="wd-stats">
            <Stat n="2" label="Lokasi strategis" />
            <Stat n="16.7K+" label="Teman Weekdays" />
            <Stat n="06.00" label="Buka setiap pagi kerja" />
            <Stat n="100%" label="Halal & homemade" />
          </div>
        </div>
      </section>

      {/* TEAM / STORY BAND */}
      <section className="wd-section-pad">
        <div className="wd-container">
          <div className="wd-two">
            <div>
              <h2 style={h2Style}>
                Teman kantormu <br />
                <span style={{ fontStyle: "italic", color: C.roast }}>setiap hari kerja.</span>
              </h2>
              <p style={pStyle}>
                Kejar deadline atau butuh jeda sebentar, Weekdays selalu sedia kopi
                terbaik dan menu yang bikin siang lebih ringan. Lunch vibes bareng
                teman kantor. Kami siapin makanannya, kamu tinggal menikmati harimu.
              </p>
            </div>
            <Img
              src={IMG.storyGreenWall}
              alt="Teman kantor di Weekdays"
              className="wd-two-img"
            />
          </div>
        </div>
      </section>

      {/* FAVORITES */}
      <section style={{ background: C.latte }} className="wd-section-pad">
        <div className="wd-container">
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <Eyebrow>Menu Pilihan</Eyebrow>
            <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>
              Favorit Teman Weekdays
            </h2>
          </div>
          <div className="wd-menu-grid">
            {[
              { img: IMG.menuKopiSusu, name: "Kopi Susu Weekdays", note: "Signature, light ke strong" },
              { img: IMG.menuMatcha, name: "Matcha Recharge", note: "Green, creamy, dreamy" },
              { img: IMG.menuSteak, name: "NZ Steak Rib Eye", note: "Juicy & satisfying" },
              { img: IMG.menuPenne, name: "Penne Napolitana", note: "Saucy & comforting" },
            ].map((m) => (
              <div key={m.name} style={{ textAlign: "center" }}>
                <Img
                  src={m.img}
                  alt={m.name}
                  className="wd-menu-img"
                />
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 17,
                    fontWeight: 500,
                    color: C.espresso,
                    lineHeight: 1.25,
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12.5,
                    color: C.muted,
                    marginTop: 4,
                  }}
                >
                  {m.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HALAL / COMMITMENT */}
      <section className="wd-section-pad">
        <div className="wd-container">
          <div className="wd-two">
            <Img
              src={IMG.halalDish}
              alt="Nasi Goreng Sapi Kebuli Weekdays"
              className="wd-two-img"
            />
            <div>
              <h2 style={h2Style}>Sertifikasi Halal</h2>
              <p style={pStyle}>
                Kami berkomitmen memberikan pelayanan terbaik untuk teman kantor di
                mana pun. Seluruh produk Weekdays diproduksi halal dan menjalankan
                Sistem Jaminan Produk Halal sesuai ketentuan BPJPH dan LPPOM MUI.
              </p>
              <div className="wd-halal-badge">
                <ShieldCheck size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>SERTIFIKAT HALAL NO : ID61110024716600725</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: C.espresso }} className="wd-section-pad">
        <div className="wd-container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(26px, 4vw, 44px)",
              color: C.white,
              margin: "0 0 14px",
              lineHeight: 1.15,
            }}
          >
            Mari mulai harimu bersama Weekdays
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15.5,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 500,
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Satukan langkah teman kantor dalam ruang yang siap menyapa dan
            menghangatkan setiap jeda kerja.
          </p>
          <button
            onClick={() => setPage("outlet")}
            style={{ ...btnPrimary, background: C.white, color: C.espresso }}
          >
            Temukan Outlet Terdekat
          </button>
        </div>
      </section>
    </>
  );
}

/* ============================== ABOUT ==================================== */
function About() {
  const timeline = [
    { year: "2019", txt: "Weekdays lahir dari satu gagasan sederhana: menemani jeda kerja dengan kopi yang tepat." },
    { year: "2021", txt: "Outlet pertama resmi hadir di Menara Bidakara, Jakarta Selatan." },
    { year: "2023", txt: "Menu makanan diperluas. Good coffee bertemu good food untuk teman kantor." },
    { year: "2025", txt: "Komunitas Weekdays tumbuh melewati 16 ribu teman setia." },
    { year: "2026", txt: "Weekdays hadir di Husein Sastranegara Airport, Bandung." },
  ];
  return (
    <>
      <section className="wd-section-pad">
        <div className="wd-container">
          <div className="wd-two">
            <div>
              <Eyebrow>Tentang Weekdays</Eyebrow>
              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  fontSize: "clamp(34px, 5vw, 56px)",
                  lineHeight: 1.08,
                  color: C.bean,
                  margin: "0 0 18px",
                }}
              >
                Ini cerita kami
              </h1>
              <p style={pStyle}>
                Kenalan lebih dekat dengan Weekdays. Cerita, perjalanan, dan
                orang-orang di balik setiap cangkir, semua bermula dari keinginan
                menemani teman kantor melewati hari kerja.
              </p>
            </div>
            <div className="wd-hero-img-wrap">
              <Img
                src={IMG.aboutTakeBreak}
                alt="Menu Weekdays"
                className="wd-about-img"
              />
            </div>
          </div>
          <div className="wd-stats-about">
            <Stat n="2" label="Lokasi" />
            <Stat n="16.7K+" label="Teman Weekdays" />
            <Stat n="06.00" label="Buka pagi kerja" />
          </div>
        </div>
      </section>

      {/* MISSION BAND */}
      <section style={{ background: C.espresso, color: C.white }} className="wd-section-pad">
        <div className="wd-container">
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center", marginBottom: 38 }}>
            <span
              style={{ display: "inline-block", width: 34, height: 2, background: C.roast, marginBottom: 18 }}
            />
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "clamp(26px, 3.6vw, 40px)",
                margin: "0 0 16px",
              }}
            >
              Menemani harimu
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              Lebih dari sekadar rutinitas pagi, Weekdays hadir jadi bagian dari
              dinamika hidupmu. Menyediakan ketenangan sebelum kesibukan dimulai,
              hingga menjadi ruang hangat saat berbagi cerita after office bareng
              teman kantor. Berawal dari niat sederhana ini, kami terus tumbuh dan
              hadir utuh untuk menemani harimu.
            </p>
          </div>

          <div className="wd-two">
            <div className="wd-hero-img-wrap">
              <Img
                src={IMG.aboutCommunity}
                alt="Healing sejenak bareng #TemanKantor"
                className="wd-about-img"
              />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, margin: "0 0 8px" }}>
                Visi
              </h3>
              <p style={{ ...pStyle, color: "rgba(255,255,255,0.78)" }}>
                Menghadirkan kopi dan pengalaman lokal yang dibuat dengan cinta,
                untuk selalu menemani hari teman kantor di mana pun mereka berada.
              </p>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, margin: "20px 0 8px" }}>
                Misi
              </h3>
              <ul
                className="wd-about-list"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.78)",
                  paddingLeft: 20,
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: 6 }}>Menghadirkan kopi dan menu berkualitas untuk setiap jeda kerja.</li>
                <li style={{ marginBottom: 6 }}>Membangun ruang yang nyaman bagi kolaborasi teman kantor.</li>
                <li>Terus berinovasi dalam produk dan layanan terbaik.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="wd-section-pad">
        <div className="wd-container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Eyebrow>Our Weekdays Journey</Eyebrow>
            <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>
              Dari satu ide ke <span style={{ fontStyle: "italic", color: C.roast }}>dua kota</span>
            </h2>
          </div>
          <div className="wd-timeline">
            {timeline.map((t) => (
              <div key={t.year} className="wd-timeline-card">
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: C.espresso,
                    marginBottom: 8,
                  }}
                >
                  {t.year}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.55, color: C.muted, margin: 0 }}>
                  {t.txt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================== OUTLET =================================== */
function Outlet() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const outlets = [
    {
      name: "Weekdays Menara Bidakara",
      tag: "Jakarta Selatan",
      addr: "Menara Bidakara, Lobby Utara LD, Jl. Jend. Gatot Subroto, Jakarta Selatan.",
      hours: ["Senin–Jumat 06.00–20.00", "Sabtu 08.00–17.00", "Minggu tutup"],
    },
    {
      name: "Weekdays Husein Sastranegara",
      tag: "Bandung",
      addr: "Bandara Husein Sastranegara (Departure Gate), Bandung, Jawa Barat.",
      hours: ["Buka setiap hari", "Mengikuti jam operasional bandara"],
    },
  ];
  const gallery = [
    IMG.heroMadeTogether,
    IMG.outletCoworking,
    IMG.outletWorkday,
    IMG.outletSteakPatio,
    IMG.outletNasiGoreng,
    IMG.outletMatchaTools,
    IMG.outletMatchaWhisk,
    IMG.outletTableShare,
    IMG.storyGreenWall,
  ];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, gallery.length]);

  return (
    <>
      <section className="wd-section-pad" style={{ paddingBottom: 24, textAlign: "center" }}>
        <div className="wd-container">
          <Eyebrow color={C.roast}>Outlet</Eyebrow>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              color: C.bean,
              margin: "0 auto 14px",
              maxWidth: 760,
              lineHeight: 1.1,
            }}
          >
            Weekdays hadir lebih dekat untukmu, teman kantor
          </h1>
        </div>
      </section>

      {/* Outlet cards */}
      <section style={{ paddingBottom: 24 }}>
        <div className="wd-container">
          <div className="wd-outlet-grid">
            {outlets.map((o) => (
              <div key={o.name} className="wd-outlet-card">
                <div className="wd-outlet-card-top">
                  <div className="wd-outlet-tag">{o.tag}</div>
                  <h3 className="wd-outlet-title">{o.name}</h3>
                  <p className="wd-outlet-addr">{o.addr}</p>
                </div>
                <div className="wd-outlet-hours">
                  <Clock size={16} style={{ flexShrink: 0, marginTop: 3, color: C.roast }} aria-hidden="true" />
                  <div className="wd-outlet-hours-text">
                    {o.hours.map((h) => (
                      <div key={h}>{h}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — 9 photos, 3x3 uniform grid */}
      <section className="wd-section-pad" style={{ paddingTop: 12 }}>
        <div className="wd-container">
          <div className="wd-gallery">
            {gallery.map((g, i) => (
              <div
                key={i}
                className="wd-gallery-item"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat foto ${i + 1} ukuran penuh`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(i);
                  }
                }}
              >
                <Img
                  src={g}
                  alt={`Suasana outlet Weekdays ${i + 1}`}
                  className="wd-gallery-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="wd-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan foto ukuran penuh"
        >
          <button
            className="wd-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Tutup tampilan penuh"
          >
            <X size={24} />
          </button>

          <button
            className="wd-lightbox-btn wd-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
            }}
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="wd-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[lightboxIndex]}
              alt={`Suasana outlet Weekdays ${lightboxIndex + 1}`}
              className="wd-lightbox-img"
            />
          </div>

          <button
            className="wd-lightbox-btn wd-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={28} />
          </button>

          <div className="wd-lightbox-counter">
            {lightboxIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}

/* ============================== EVENT ==================================== */
function Event() {
  const packages = [
    { name: "Full Package", price: "80", unit: "cups", note: "Layanan lengkap dengan branding staff & properti untuk perayaan kantor." },
    { name: "Weekdays-IN Bucket", price: "50", unit: "cups", note: "Bucket praktis melengkapi setiap kebersamaan teman kantor." },
    { name: "Compact Package", price: "30", unit: "cups", note: "Paket ringkas, pas untuk gathering kecil dan after office." },
  ];
  const menu = [
    { img: IMG.menuKopiSusu, name: "Cup (8oz)", note: "Kopi Susu" },
    { img: IMG.outletWorkday, name: "Kopi Susu (14oz)", note: "Light ke strong" },
    { img: IMG.menuMatcha, name: "Matcha Series (14oz)", note: "Green & creamy" },
    { img: IMG.eventBites, name: "Bites & Meals", note: "Good food, good company" },
  ];
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative" }}>
        <Img
          src={IMG.eventHero}
          alt="Weekdays event"
          style={{ width: "100%", height: 400, display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(43,29,18,0.4), rgba(43,29,18,0.75))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px 18px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "clamp(34px, 5.5vw, 68px)",
              color: C.white,
              margin: "0 0 12px",
              letterSpacing: "0.02em",
            }}
          >
            #<span style={{ fontStyle: "italic" }}>Weekdays</span>Event
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15.5,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 540,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Teman setia yang siap melengkapi setiap event kantor dengan aroma dan
            rasa yang mendukung, menciptakan momen tak terlupakan bagi setiap tamu.
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="wd-section-pad">
        <div className="wd-container">
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <Eyebrow>Our Package</Eyebrow>
            <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>Pilih paketmu</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, marginTop: 10 }}>
              Setiap event dapat menampung hingga 80 cups.
            </p>
          </div>
          <div className="wd-three">
            {packages.map((p) => (
              <div
                key={p.name}
                className="wd-package-card"
                style={{
                  background: C.latte,
                  borderRadius: 18,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: C.espresso, margin: 0 }}>
                  {p.name}
                </h3>
                <div className="wd-package-cap" style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: C.muted }}>
                    Kapasitas
                  </span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 600, color: C.roast }}>
                    {p.price}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: C.muted }}>
                    {p.unit}
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.55, color: C.muted, margin: 0 }}>
                  {p.note}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: C.muted, margin: "0 0 6px" }}>
              Kami menyediakan berbagai pilihan menu untuk
            </p>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(24px, 3.4vw, 38px)",
                fontWeight: 600,
                color: C.espresso,
              }}
            >
              #TemaniHariBahagiamu
            </div>
          </div>

          <div className="wd-menu-grid" style={{ marginTop: 32 }}>
            {menu.map((m) => (
              <div key={m.name} style={{ textAlign: "center" }}>
                <Img
                  src={m.img}
                  alt={m.name}
                  className="wd-menu-img"
                />
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16.5, color: C.espresso }}>{m.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: C.muted, marginTop: 3 }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ background: C.latte }} className="wd-section-pad">
        <div className="wd-container">
          <div className="wd-two">
            <div>
              <h2 style={h2Style}>Hubungi kami untuk event & kolaborasi</h2>
              <p style={pStyle}>
                Mari bersama menciptakan pengalaman tak terlupakan untuk teman
                kantormu. After office, gathering, atau perayaan tim, Weekdays siap
                menemani.
              </p>
              <div className="wd-event-contacts" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                <a
                  href="https://www.instagram.com/weekdayscoffee.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={eventContactLink}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                  @weekdayscoffee.id
                </a>
                <a href="mailto:marketing@weekdayscoffee.id" style={eventContactLink}>
                  <Mail size={18} aria-hidden="true" />
                  marketing@weekdayscoffee.id
                </a>
                <a
                  href="https://weekdayscoffee.id"
                  onClick={(e) => e.preventDefault()}
                  style={eventContactLink}
                >
                  <Globe size={18} aria-hidden="true" />
                  weekdayscoffee.id
                </a>
              </div>
            </div>
            <Img
              src={IMG.eventContact}
              alt="Weekdays event catering"
              className="wd-two-img"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Footer -------------------------------------------------------- */
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.espresso, color: C.white }}>
      <div className="wd-container">
        <div className="wd-footer">
          <div className="wd-footer-col">
            <div className="wd-footer-brand">
              <Wordmark color={C.white} />
            </div>
            <p
              className="wd-footer-desc"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.72)",
                marginTop: 14,
                maxWidth: 320,
              }}
            >
              Kopi, food, dan kolaborasi untuk teman kantor. Find your little pause,
              di mana pun kamu berada.
            </p>
            <div className="wd-footer-social" style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <a
                href="https://www.instagram.com/weekdayscoffee.id/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 999,
                  padding: "7px 15px",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
                @weekdayscoffee.id
              </a>
            </div>
          </div>

          <div className="wd-footer-col">
            <div className="wd-foot-head" style={footHead}>Halaman</div>
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPage(p.id)}
                className="wd-foot-link"
                style={footLink}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="wd-footer-col">
            <div className="wd-foot-head" style={footHead}>Hubungi Kami</div>
            <div className="wd-foot-contact-row" style={footContactRow}>
              <MapPin size={17} style={footIcon} aria-hidden="true" />
              <div>
                <p style={footText}>Menara Bidakara, Jakarta Selatan</p>
                <p style={{ ...footText, margin: 0 }}>Husein Sastranegara, Bandung</p>
              </div>
            </div>
            <div className="wd-foot-contact-row" style={footContactRow}>
              <Mail size={17} style={footIcon} aria-hidden="true" />
              <p style={{ ...footText, margin: 0 }}>marketing@weekdayscoffee.id</p>
            </div>
            <div className="wd-foot-contact-row" style={footContactRow}>
              <Globe size={17} style={footIcon} aria-hidden="true" />
              <p style={{ ...footText, margin: 0 }}>weekdayscoffee.id</p>
            </div>
            <div className="wd-foot-contact-row" style={footContactRow}>
              <ShieldCheck size={17} style={footIcon} aria-hidden="true" />
              <div>
                <p style={{ ...footText, margin: 0 }}>Sertifikasi Halal</p>
                <p style={{ ...footText, fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  ID61110024716600725
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.14)",
          padding: "16px 0",
        }}
      >
        <div className="wd-container">
          <div className="wd-footer-bottom">
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              Menemani harimu.
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>
              © Copyright 2026. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Shared style objects ----------------------------------------- */
const h2Style = {
  fontFamily: "'Fraunces', serif",
  fontWeight: 500,
  fontSize: "clamp(26px, 3.6vw, 42px)",
  lineHeight: 1.15,
  color: C.bean,
  margin: "0 0 16px",
};
const pStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15.5,
  lineHeight: 1.65,
  color: C.muted,
  margin: 0,
};
const btnPrimary = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14.5,
  fontWeight: 600,
  color: C.white,
  background: C.espresso,
  border: "none",
  padding: "13px 24px",
  borderRadius: 999,
  cursor: "pointer",
  transition: "transform 0.15s ease, background 0.15s ease",
};
const btnGhost = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14.5,
  fontWeight: 600,
  color: C.espresso,
  background: "transparent",
  border: `1.5px solid ${C.foam}`,
  padding: "13px 24px",
  borderRadius: 999,
  cursor: "pointer",
  transition: "transform 0.15s ease, border-color 0.15s ease",
};
const eventContactLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  width: "fit-content",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14.5,
  fontWeight: 500,
  color: C.espresso,
  textDecoration: "none",
};
const footHead = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  color: C.white,
  marginBottom: 14,
};
const footLink = {
  display: "block",
  background: "none",
  border: "none",
  textAlign: "left",
  padding: "8px 0",
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: "rgba(255,255,255,0.72)",
  transition: "color 0.15s ease",
};
const footContactRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: 11,
  marginBottom: 16,
};
const footIcon = {
  flexShrink: 0,
  color: "#FFFFFF",
  marginTop: 2,
};
const footText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.72)",
  margin: "0 0 6px",
};

/* ============================== APP ===================================== */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  return (
    <div style={{ background: C.white, minHeight: "100vh", color: C.bean }}>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "about" && <About />}
      {page === "outlet" && <Outlet />}
      {page === "event" && <Event />}
      <Footer setPage={setPage} />
    </div>
  );
}
