import React, { useState, useEffect } from "react";

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
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.86)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.foam}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => setPage("home")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Weekdays Coffee, beranda"
        >
          <Wordmark />
        </button>

        <nav
          className="wd-desktop-nav"
          style={{ display: "flex", gap: 34, alignItems: "center" }}
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
          aria-label="Menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.espresso,
            fontSize: 24,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className="wd-mobile-menu"
          style={{
            display: "none",
            flexDirection: "column",
            padding: "8px 24px 20px",
            borderTop: `1px solid ${C.foam}`,
            background: C.white,
          }}
        >
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPage(p.id);
                setOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "12px 0",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: page === p.id ? 600 : 500,
                color: page === p.id ? C.espresso : C.muted,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Shared bits --------------------------------------------------- */
function Eyebrow({ children, color = C.roast }) {
  return (
    <div
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
    <div>
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 46,
          fontWeight: 500,
          color,
          lineHeight: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: C.muted,
          marginTop: 8,
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ============================== HOME ===================================== */
function Home({ setPage }) {
  return (
    <>
      {/* HERO: left-aligned editorial (deliberate divergence from lokale's centered hero) */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 20px" }}>
        <div
          className="wd-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow>Coffee • Food • Collaboration</Eyebrow>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 5.4vw, 68px)",
                lineHeight: 1.02,
                color: C.bean,
                margin: "0 0 22px",
              }}
            >
              Made better,
              <br />
              <span style={{ fontStyle: "italic", color: C.espresso }}>together.</span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: C.muted,
                maxWidth: 440,
                margin: "0 0 30px",
              }}
            >
              Kopi yang tepat, menu yang bikin fokus, dan ruang hangat buat teman
              kantor. Weekdays hadir untuk menemani setiap jeda kecilmu. Find your
              little pause.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
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

          <div style={{ position: "relative" }}>
            <Img
              src={IMG.heroMadeTogether}
              alt="Suasana Weekdays Coffee"
              style={{
                width: "100%",
                height: 460,
                borderRadius: 20,
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 18,
                left: 18,
                background: "rgba(74,46,28,0.92)",
                color: C.white,
                padding: "12px 18px",
                borderRadius: 12,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              #TemanKantor
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 24px 10px" }}>
        <div
          className="wd-stats"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            borderTop: `1px solid ${C.foam}`,
            borderBottom: `1px solid ${C.foam}`,
            padding: "28px 0",
          }}
        >
          <Stat n="2" label="Lokasi strategis" />
          <Stat n="16.7K+" label="Teman Weekdays" />
          <Stat n="06.00" label="Buka setiap pagi kerja" />
          <Stat n="100%" label="Halal & homemade" />
        </div>
      </section>

      {/* TEAM / STORY BAND */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}>
        <div
          className="wd-two"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}
        >
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
            style={{ width: "100%", height: 340, borderRadius: 18, display: "block" }}
          />
        </div>
      </section>

      {/* FAVORITES */}
      <section style={{ background: C.latte }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "62px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow>Menu Pilihan</Eyebrow>
            <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>
              Favorit Teman Weekdays
            </h2>
          </div>
          <div
            className="wd-menu-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
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
                  style={{
                    width: "100%",
                    height: 210,
                    borderRadius: 16,
                    display: "block",
                    marginBottom: 16,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 19,
                    fontWeight: 500,
                    color: C.espresso,
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
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
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "62px 24px" }}>
        <div
          className="wd-two"
          style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 40, alignItems: "center" }}
        >
          <Img
            src={IMG.halalDish}
            alt="Nasi Goreng Sapi Kebuli Weekdays"
            style={{ width: "100%", height: 300, borderRadius: 18, display: "block" }}
          />
          <div>
            <h2 style={h2Style}>Sertifikasi Halal</h2>
            <p style={pStyle}>
              Kami berkomitmen memberikan pelayanan terbaik untuk teman kantor di
              mana pun. Seluruh produk Weekdays diproduksi halal dan menjalankan
              Sistem Jaminan Produk Halal sesuai ketentuan BPJPH dan LPPOM MUI.
            </p>
            <div
              style={{
                marginTop: 18,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: C.espresso,
                fontWeight: 600,
              }}
            >
              SERTIFIKAT HALAL NO : ID61110024716600725
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: C.espresso }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "70px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(30px, 4vw, 48px)",
              color: C.white,
              margin: "0 0 14px",
            }}
          >
            Mari mulai harimu bersama Weekdays
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 500,
              margin: "0 auto 28px",
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
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px" }}>
        <div
          className="wd-two"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}
        >
          <div>
            <Eyebrow>Tentang Weekdays</Eyebrow>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "clamp(38px, 5vw, 60px)",
                lineHeight: 1.05,
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
          <Img
            src={IMG.aboutTakeBreak}
            alt="Menu Weekdays"
            style={{ width: "100%", height: 360, borderRadius: 20, display: "block" }}
          />
        </div>
        <div
          className="wd-stats"
          style={{ display: "flex", gap: 60, marginTop: 44, flexWrap: "wrap" }}
        >
          <Stat n="2" label="Lokasi" />
          <Stat n="16.7K+" label="Teman Weekdays" />
          <Stat n="06.00" label="Buka pagi kerja" />
        </div>
      </section>

      {/* MISSION BAND */}
      <section style={{ background: C.espresso, color: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "70px 24px", textAlign: "center" }}>
          <span
            style={{ display: "inline-block", width: 34, height: 2, background: C.roast, marginBottom: 22 }}
          />
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 3.6vw, 42px)",
              margin: "0 0 20px",
            }}
          >
            Menemani harimu
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16.5,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Lebih dari sekadar rutinitas pagi, Weekdays hadir jadi bagian dari
            dinamika hidupmu. Menyediakan ketenangan sebelum kesibukan dimulai,
            hingga menjadi ruang hangat saat berbagi cerita after office bareng
            teman kantor. Berawal dari niat sederhana ini, kami terus tumbuh dan
            hadir utuh untuk menemani harimu.
          </p>
        </div>
        <div
          className="wd-two"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 24px 70px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <Img
            src={IMG.aboutCommunity}
            alt="Healing sejenak bareng #TemanKantor"
            style={{ width: "100%", height: 320, borderRadius: 18, display: "block" }}
          />
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, margin: "0 0 8px" }}>
              Visi
            </h3>
            <p style={{ ...pStyle, color: "rgba(255,255,255,0.78)" }}>
              Menghadirkan kopi dan pengalaman lokal yang dibuat dengan cinta,
              untuk selalu menemani hari teman kantor di mana pun mereka berada.
            </p>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, margin: "22px 0 8px" }}>
              Misi
            </h3>
            <ul
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>Menghadirkan kopi dan menu berkualitas untuk setiap jeda kerja.</li>
              <li>Membangun ruang yang nyaman bagi kolaborasi teman kantor.</li>
              <li>Terus berinovasi dalam produk dan layanan terbaik.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Eyebrow>Our Weekdays Journey</Eyebrow>
          <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>
            Dari satu ide ke <span style={{ fontStyle: "italic", color: C.roast }}>dua kota</span>
          </h2>
        </div>
        <div
          className="wd-timeline"
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18 }}
        >
          {timeline.map((t) => (
            <div
              key={t.year}
              style={{
                background: C.latte,
                borderRadius: 14,
                padding: "22px 18px",
                borderTop: `3px solid ${C.roast}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 26,
                  fontWeight: 600,
                  color: C.espresso,
                  marginBottom: 10,
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
      </section>
    </>
  );
}

/* ============================== OUTLET =================================== */
function Outlet() {
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
  return (
    <>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 30px", textAlign: "center" }}>
        <Eyebrow color={C.roast}>Outlet</Eyebrow>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: "clamp(34px, 4.6vw, 56px)",
            color: C.bean,
            margin: "0 auto 14px",
            maxWidth: 760,
            lineHeight: 1.08,
          }}
        >
          Weekdays hadir lebih dekat untukmu, teman kantor
        </h1>
      </section>

      {/* Outlet cards */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 30px" }}>
        <div className="wd-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {outlets.map((o) => (
            <div
              key={o.name}
              style={{
                border: `1px solid ${C.foam}`,
                borderRadius: 18,
                padding: 26,
                background: C.white,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.roast,
                  background: C.latte,
                  padding: "5px 12px",
                  borderRadius: 999,
                  marginBottom: 14,
                }}
              >
                {o.tag}
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: C.espresso, margin: "0 0 10px" }}>
                {o.name}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: C.muted, margin: "0 0 12px" }}>
                {o.addr}
              </p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2, color: C.roast }}>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.7, color: C.espresso, fontWeight: 500 }}>
                  {o.hours.map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery — 9 photos, uniform grid */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "34px 24px 70px" }}>
        <div
          className="wd-gallery"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
        >
          {gallery.map((g, i) => (
            <Img
              key={i}
              src={g}
              alt={`Suasana outlet Weekdays ${i + 1}`}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 12,
                display: "block",
              }}
            />
          ))}
        </div>
      </section>
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
          style={{ width: "100%", height: 460, display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(43,29,18,0.35), rgba(43,29,18,0.7))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 24,
          }}
        >
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "clamp(40px, 6vw, 74px)",
              color: C.white,
              margin: "0 0 14px",
              letterSpacing: "0.02em",
            }}
          >
            #<span style={{ fontStyle: "italic" }}>Weekdays</span>Event
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 540,
              lineHeight: 1.6,
            }}
          >
            Teman setia yang siap melengkapi setiap event kantor dengan aroma dan
            rasa yang mendukung, menciptakan momen tak terlupakan bagi setiap tamu.
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow>Our Package</Eyebrow>
          <h2 style={{ ...h2Style, textAlign: "center", margin: 0 }}>Pilih paketmu</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: C.muted, marginTop: 12 }}>
            Setiap event dapat menampung hingga 80 cups.
          </p>
        </div>
        <div className="wd-three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {packages.map((p) => (
            <div
              key={p.name}
              style={{
                background: C.latte,
                borderRadius: 18,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: C.espresso, margin: 0 }}>
                {p.name}
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted }}>
                  Kapasitas
                </span>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 600, color: C.roast }}>
                  {p.price}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted }}>
                  {p.unit}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.55, color: C.muted, margin: 0 }}>
                {p.note}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 50 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, margin: "0 0 6px" }}>
            Kami menyediakan berbagai pilihan menu untuk
          </p>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(26px, 3.4vw, 40px)",
              fontWeight: 600,
              color: C.espresso,
            }}
          >
            #TemaniHariBahagiamu
          </div>
        </div>

        <div className="wd-menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 40 }}>
          {menu.map((m) => (
            <div key={m.name} style={{ textAlign: "center" }}>
              <Img
                src={m.img}
                alt={m.name}
                style={{ width: "100%", height: 190, borderRadius: 16, display: "block", marginBottom: 14 }}
              />
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.espresso }}>{m.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, marginTop: 3 }}>{m.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ background: C.latte }}>
        <div
          className="wd-two"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "62px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}
        >
          <div>
            <h2 style={h2Style}>Hubungi kami untuk event & kolaborasi</h2>
            <p style={pStyle}>
              Mari bersama menciptakan pengalaman tak terlupakan untuk teman
              kantormu. After office, gathering, atau perayaan tim, Weekdays siap
              menemani.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
              <a
                href="https://www.instagram.com/weekdayscoffee.id/"
                target="_blank"
                rel="noopener noreferrer"
                style={eventContactLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
                @weekdayscoffee.id
              </a>
              <a href="mailto:marketing@weekdayscoffee.id" style={eventContactLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                marketing@weekdayscoffee.id
              </a>
              <a
                href="https://weekdayscoffee.id"
                onClick={(e) => e.preventDefault()}
                style={eventContactLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                weekdayscoffee.id
              </a>
            </div>
          </div>
          <Img
            src={IMG.eventContact}
            alt="Weekdays event catering"
            style={{ width: "100%", height: 320, borderRadius: 18, display: "block" }}
          />
        </div>
      </section>
    </>
  );
}

/* ---------- Footer -------------------------------------------------------- */
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.espresso, color: C.white }}>
      <div
        className="wd-footer"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "56px 24px 30px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1.4fr",
          gap: 40,
        }}
      >
        <div>
          <Wordmark color={C.white} />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
              marginTop: 16,
              maxWidth: 300,
            }}
          >
            Kopi, food, dan kolaborasi untuk teman kantor. Find your little pause,
            di mana pun kamu berada.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
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
                fontSize: 13.5,
                fontWeight: 500,
                color: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 999,
                padding: "8px 16px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
              </svg>
              @weekdayscoffee.id
            </a>
          </div>
        </div>

        <div>
          <div style={footHead}>Halaman</div>
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              style={footLink}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <div style={footHead}>Hubungi Kami</div>
          <div style={footContactRow}>
            <span style={footIcon} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 21c4.5-4 7-7.3 7-11a7 7 0 10-14 0c0 3.7 2.5 7 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <div>
              <p style={footText}>Menara Bidakara, Jakarta Selatan</p>
              <p style={footText}>Husein Sastranegara, Bandung</p>
            </div>
          </div>
          <div style={footContactRow}>
            <span style={footIcon} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p style={footText}>marketing@weekdayscoffee.id</p>
          </div>
          <div style={footContactRow}>
            <span style={footIcon} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <p style={footText}>weekdayscoffee.id</p>
          </div>
          <div style={footContactRow}>
            <span style={footIcon} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 2.5v5c0 4.6-3 8.2-7 9.5-4-1.3-7-4.9-7-9.5v-5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 11.8l2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p style={{ ...footText, margin: 0 }}>Sertifikasi Halal</p>
              <p style={{ ...footText, fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                ID61110024716600725
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.14)",
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
            Menemani harimu.
          </span>
          <span>© Copyright 2026. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Shared style objects ----------------------------------------- */
const h2Style = {
  fontFamily: "'Fraunces', serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.6vw, 42px)",
  lineHeight: 1.1,
  color: C.bean,
  margin: "0 0 16px",
};
const pStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  lineHeight: 1.65,
  color: C.muted,
  margin: 0,
};
const btnPrimary = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: C.white,
  background: C.espresso,
  border: "none",
  padding: "14px 26px",
  borderRadius: 999,
  cursor: "pointer",
};
const btnGhost = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: C.espresso,
  background: "transparent",
  border: `1.5px solid ${C.foam}`,
  padding: "14px 26px",
  borderRadius: 999,
  cursor: "pointer",
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
  padding: "6px 0",
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: "rgba(255,255,255,0.72)",
};
const footContactRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: 11,
  marginBottom: 16,
};
const footIcon = {
  flexShrink: 0,
  color: C.roast,
  marginTop: 1,
};
const footText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.72)",
  margin: "0 0 8px",
};

/* ============================== APP ===================================== */
export default function App() {
  const [page, setPage] = useState("home");

  // Load fonts + responsive CSS once.
  useEffect(() => {
    if (!document.getElementById("wd-fonts")) {
      const l = document.createElement("link");
      l.id = "wd-fonts";
      l.rel = "stylesheet";
      l.href = FONT_LINK;
      document.head.appendChild(l);
    }
    if (!document.getElementById("wd-css")) {
      const s = document.createElement("style");
      s.id = "wd-css";
      s.textContent = `
        * { box-sizing: border-box; }
        body { margin: 0; }
        button:focus-visible, a:focus-visible { outline: 2px solid ${C.roast}; outline-offset: 3px; }
        @media (max-width: 860px) {
          .wd-desktop-nav { display: none !important; }
          .wd-burger { display: block !important; }
          .wd-mobile-menu { display: flex !important; }
          .wd-hero, .wd-two, .wd-footer { grid-template-columns: 1fr !important; }
          .wd-menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wd-three { grid-template-columns: 1fr !important; }
          .wd-timeline { grid-template-columns: repeat(2, 1fr) !important; }
          .wd-gallery { grid-template-columns: repeat(2, 1fr) !important; }
          .wd-stats { justify-content: flex-start !important; gap: 28px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `;
      document.head.appendChild(s);
    }
    window.scrollTo(0, 0);
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
