'use client';

import { useState, useEffect } from 'react';

const ADMIN_PHONE = '6285702355713';

// Data Produk (Lengkap)
const appsData = [
  { id: 'capcut', name: 'CapCut', domain: 'capcut.com', products: [{ id: 'ct-1', name: 'Team 1 Bulan | 1 Akun', price: 30000, stok: 10, desc: 'Garansi Penuh' }, { id: 'ct-2', name: 'Team 1 Bulan | 5 Akun', price: 135000, stok: 5, desc: 'Hemat' }] },
  { id: 'chatgpt', name: 'ChatGPT', domain: 'openai.com', products: [{ id: 'cg-1', name: 'Plus Garansi Penuh (1 Hari)', price: 15000, stok: 10, desc: 'Ready' }, { id: 'cg-2', name: 'GO Garansi 7D (3 Bulan)', price: 100000, stok: 5, desc: 'Sharing' }] },
  { id: 'netflix', name: 'Netflix', domain: 'netflix.com', products: [{ id: 'nf-1', name: '1 Bulan | 1P 1U', price: 40000, stok: 10, desc: 'Private' }, { id: 'nf-2', name: '1 Bulan | 1P 2U', price: 25000, stok: 10, desc: 'Sharing' }] },
  { id: 'canva', name: 'Canva', domain: 'canva.com', products: [{ id: 'cv-1', name: 'Head 1 Akun (1 Bulan)', price: 10000, stok: 5, desc: 'Invite' }, { id: 'cv-2', name: 'Famhead Lifetime', price: 655000, stok: 5, desc: 'Full Akses' }] },
  { id: 'duolingo', name: 'Duolingo', domain: 'duolingo.com', products: [{ id: 'du-1', name: 'Account Basic', price: 5500, stok: 10, desc: '' }, { id: 'du-2', name: '1 Bulan | 1 Akun', price: 7000, stok: 5, desc: '' }, { id: 'du-3', name: '1 Bulan | 5 Akun', price: 23000, stok: 3, desc: '' }] },
  { id: 'zoom', name: 'Zoom', domain: 'zoom.us', products: [{ id: 'zo-1', name: 'Account Basic', price: 5500, stok: 10, desc: '' }, { id: 'zo-2', name: '14 Hari | 1 Akun', price: 7500, stok: 10, desc: '' }] },
  { id: 'alightmotion', name: 'Alight Motion', domain: 'alightcreative.com', products: [{ id: 'am-1', name: '1 Tahun | 1 Akun', price: 7500, stok: 10, desc: '' }] },
  { id: 'spotify', name: 'Spotify', domain: 'spotify.com', products: [{ id: 'sp-1', name: 'Account 1 Bulan', price: 18000, stok: 10, desc: '' }] },
];

const globalStyles = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .app-card { transition: all 0.3s ease; }
  .app-card:hover { transform: translateY(-8px) scale(1.03); border-color: #d8b4fe !important; box-shadow: 0 15px 30px rgba(147, 51, 234, 0.3); }
  .btn-hover:hover { transform: scale(1.02); filter: brightness(1.1); }
  .logo-img { transition: 0.3s; }
  .app-card:hover .logo-img { transform: scale(1.1); }
  .social-btn { transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #4c1d95; background: #12121a; color: #fff; cursor: pointer; margin-bottom: 0.8rem; font-weight: bold; }
  .social-btn:hover { background: #1a103c; border-color: #9333ea; }
`;

export default function Home() {
  const [authMode, setAuthMode] = useState('login'); 
  const [user, setUser] = useState(null); 
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('yanz_user_session');
    if (session) setUser(JSON.parse(session));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email.includes('@') || password.length < 5) return setErrorMsg('Email valid & password min. 5 karakter.');
    const usersDB = JSON.parse(localStorage.getItem('yanz_users_db') || '{}');
    if (usersDB[email]) return setErrorMsg('Email sudah terdaftar. Silakan masuk.');
    usersDB[email] = { username, email, password };
    localStorage.setItem('yanz_users_db', JSON.stringify(usersDB));
    alert('Pendaftaran berhasil! Silakan masuk.');
    setAuthMode('login'); setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const usersDB = JSON.parse(localStorage.getItem('yanz_users_db') || '{}');
    const userFound = usersDB[email];
    if (userFound && userFound.password === password) {
      localStorage.setItem('yanz_user_session', JSON.stringify(userFound));
      setUser(userFound);
    } else {
      setErrorMsg('Email atau Password salah.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('yanz_user_session');
    setUser(null); setSelectedApp(null); setSelectedProduct(null);
  };

  const handleBuy = (product) => {
    if (product.stok <= 0) return alert('Maaf, stok sedang habis.');
    const uniqueCode = Math.floor(Math.random() * 200) + 100;
    const total = product.price + uniqueCode;
    const orderId = `INV-${Date.now().toString().slice(-6)}`;
    setSelectedProduct(product);
    setOrderDetails({ uniqueCode, total, orderId });
  };

  const waText = orderDetails && selectedProduct 
    ? `Halo Admin, saya *${user.username}* mau konfirmasi pesanan.\n\n*Order ID:* ${orderDetails.orderId}\n*Produk:* ${selectedProduct.name}\n*Total Transfer:* Rp ${orderDetails.total.toLocaleString('id-ID')}\n\n_(Saya lampirkan bukti transfer di bawah ini)_` 
    : '';
  const waLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waText)}`;

  // ==========================================
  // 1. TAMPILAN LOGIN / DAFTAR
  // ==========================================
  if (!user) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '1rem' }}>
        <style>{globalStyles}</style>
        <div className="animate-fade" style={{ background: 'linear-gradient(145deg, #12121a, #050505)', padding: '3rem 2rem', borderRadius: '20px', border: '1px solid #4c1d95', width: '100%', maxWidth: '420px', boxShadow: '0 20px 50px rgba(76, 29, 149, 0.2)' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.2rem', textAlign: 'center', textShadow: '0 0 15px #9333ea', letterSpacing: '2px' }}>YANZ</h1>
          <p style={{ color: '#a78bfa', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'center', letterSpacing: '1px' }}>PREMIUM STORE ACCESS</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <button className="social-btn" onClick={() => alert('Fitur ini belum tersedia. Silakan daftar manual.')}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="Google"/> Lanjutkan dengan Google
            </button>
            <button className="social-btn" onClick={() => alert('Fitur ini belum tersedia.')}>
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" width="20" alt="Facebook"/> Lanjutkan dengan Facebook
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#4c1d95' }}></div>
            <span style={{ padding: '0 10px', color: '#a78bfa', fontSize: '0.8rem' }}>ATAU</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#4c1d95' }}></div>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
            {authMode === 'register' && (
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #4c1d95', backgroundColor: '#0a0a0f', color: '#fff', marginBottom: '1rem', outline: 'none' }} />
            )}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #4c1d95', backgroundColor: '#0a0a0f', color: '#fff', marginBottom: '1rem', outline: 'none' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #4c1d95', backgroundColor: '#0a0a0f', color: '#fff', marginBottom: '1rem', outline: 'none' }} />

            {errorMsg && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{errorMsg}</p>}

            <button type="submit" className="btn-hover" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(90deg, #7e22ce, #4c1d95)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
              {authMode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            {authMode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <span onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMsg(''); }} style={{ color: '#d8b4fe', cursor: 'pointer', fontWeight: 'bold' }}>
              {authMode === 'login' ? 'Daftar' : 'Masuk'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. TAMPILAN PEMBAYARAN (QRIS)
  // ==========================================
  if (selectedProduct && orderDetails) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <style>{globalStyles}</style>
        <div className="animate-slide" style={{ background: 'linear-gradient(145deg, #12121a, #0a0a0f)', border: '1px solid #9333ea', borderRadius: '20px', padding: '2rem', maxWidth: '450px', width: '100%', boxShadow: '0 0 50px rgba(147, 51, 234, 0.15)' }}>
          <h2 style={{ textAlign: 'center', color: '#d8b4fe', marginBottom: '1.5rem', fontSize: '1.2rem', letterSpacing: '1px' }}>INVOICE PEMBAYARAN</h2>
          
          <div style={{ backgroundColor: '#1a103c', padding: '1.2rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #9333ea' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#a78bfa', fontSize: '0.85rem' }}>Order ID: <strong style={{ color: '#fff' }}>{orderDetails.orderId}</strong></p>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#fff' }}>{selectedProduct.name}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>{selectedProduct.desc}</p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#cbd5e1' }}>Total Transfer:</p>
            <h1 style={{ margin: 0, fontSize: '2.8rem', color: '#fff', textShadow: '0 0 15px #9333ea', fontWeight: '900' }}>Rp {orderDetails.total.toLocaleString('id-ID')}</h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#a78bfa' }}>(Harga: Rp {selectedProduct.price.toLocaleString('id-ID')} + Kode Unik: Rp {orderDetails.uniqueCode})</p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img src="/qris.jpg" alt="QRIS" style={{ width: '100%', maxWidth: '250px', margin: '0 auto', borderRadius: '8px' }} />
          </div>

          <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#fef08a', marginBottom: '1.5rem' }}>
            <strong>⚠️ PERHATIAN:</strong><br/>
            1. Wajib transfer <strong>tepat angka</strong> hingga 3 digit terakhir.<br/>
            2. Jika tidak sesuai, pesanan gagal.<br/>
            3. Klik tombol WA setelah transfer.
          </div>

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-hover" style={{ display: 'block', width: '100%', padding: '1.2rem', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>
            Saya Sudah Bayar
          </a>
          
          <button onClick={() => { setSelectedProduct(null); setOrderDetails(null); }} style={{ marginTop: '1.5rem', width: '100%', background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>
            Batalkan Pesanan
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. TAMPILAN UTAMA (Katalog)
  // ==========================================
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '3rem' }}>
      <style>{globalStyles}</style>
      
      {/* HEADER BANNER (Dengan Fallback jika gambar error) */}
      <div style={{ width: '100%', backgroundColor: '#000', position: 'relative', display: 'flex', justifyContent: 'center', minHeight: '200px' }}>
        <img 
          src="/banner.jpg" 
          alt="Banner" 
          style={{ width: '100%', maxWidth: '1000px', maxHeight: '350px', objectFit: 'cover', opacity: 0.9 }} 
          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(45deg, #050505, #1a103c)'; }}
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #4c1d95' }}>
          <span style={{ fontSize: '0.85rem', color: '#d8b4fe' }}>Halo, <strong>{user.username}</strong></span>
          <button onClick={handleLogout} style={{ padding: '0.3rem 0.8rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Keluar</button>
        </div>
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        {selectedApp ? (
          <div className="animate-fade">
            <button onClick={() => setSelectedApp(null)} style={{ marginBottom: '1.5rem', background: 'rgba(76, 29, 149, 0.2)', border: '1px solid #4c1d95', color: '#d8b4fe', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem', borderRadius: '8px' }}>
              ← Kembali ke Katalog
            </button>
            
            <div style={{ background: 'linear-gradient(90deg, #12121a, #1a103c)', borderRadius: '16px', padding: '2rem', border: '1px solid #4c1d95', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={`https://logo.clearbit.com/${selectedApp.domain}`} alt={selectedApp.name} style={{ width: '80px', height: '80px', borderRadius: '16px', backgroundColor: '#fff', padding: '8px', objectFit: 'contain' }} onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${selectedApp.name}&background=4c1d95&color=fff&size=80`; }} />
              <div>
                <h1 style={{ margin: 0, fontSize: '2rem', textShadow: '0 0 10px rgba(147, 51, 234, 0.5)' }}>{selectedApp.name}</h1>
                <p style={{ margin: '0.5rem 0 0 0', color: '#9ca3af' }}>Pilih varian produk di bawah ini.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {selectedApp.products.map((p, index) => (
                <div key={p.id} className="animate-slide" style={{ animationDelay: `${index * 0.05}s`, opacity: 0, background: '#12121a', border: '1px solid #2a1b4d', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#fff' }}>{p.name}</h3>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.5rem' }}>
                      {p.desc && <span style={{ backgroundColor: '#4c1d95', color: '#d8b4fe', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{p.desc}</span>}
                      <span style={{ color: p.stok > 0 ? '#4ade80' : '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {p.stok > 0 ? `✅ Stok Tersedia (${p.stok})` : '❌ Stok Habis'}
                      </span>
                    </div>
                    <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.4rem', color: '#d8b4fe' }}>Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => handleBuy(p)} disabled={p.stok <= 0} className="btn-hover" style={{ padding: '0.8rem 2rem', background: p.stok > 0 ? 'linear-gradient(135deg, #7e22ce 0%, #4c1d95 100%)' : '#333', color: p.stok > 0 ? '#fff' : '#888', border: 'none', borderRadius: '8px', cursor: p.stok > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>
                    {p.stok > 0 ? 'Beli' : 'Habis'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#a78bfa', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Katalog Produk</h2>
              <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, transparent, #9333ea, transparent)', margin: '0.8rem auto' }}></div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.2rem' }}>
              {appsData.map((app, index) => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className="app-card animate-slide" style={{ animationDelay: `${index * 0.03}s`, opacity: 0, background: 'rgba(18, 18, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid #2a1b4d', borderRadius: '16px', padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer' }}>
                  <img 
                    src={`https://logo.clearbit.com/${app.domain}`} 
                    alt={app.name} 
                    className="logo-img"
                    style={{ width: '64px', height: '64px', margin: '0 auto 1.2rem auto', borderRadius: '14px', backgroundColor: '#fff', padding: '10px', objectFit: 'contain' }} 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${app.name}&background=4c1d95&color=fff&size=64`; }}
                  />
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{app.name}</h3>
                  <p style={{ margin: '0.8rem 0 0 0', fontSize: '0.75rem', color: '#9333ea', fontWeight: 'bold' }}>Lihat Stok →</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
