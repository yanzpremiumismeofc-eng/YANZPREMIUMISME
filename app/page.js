'use client';

import { useState, useEffect } from 'react';

const ADMIN_PHONE = '6285702355713';

// ==========================================
// DATA PRODUK (Lengkap 35 Produk dari Stok.json)
// ==========================================
const appsData = [
  {
    id: 'bstation', name: 'Bstation', domain: 'bstation.com', 
    products: [
      { id: 'bs-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'bs-2', name: '1 Minggu | 1 Akun', price: 9500, desc: '' },
      { id: 'bs-3', name: '1 Minggu | 5 Akun', price: 34000, desc: '' },
      { id: 'bs-4', name: '1 Minggu | 10 Akun', price: 45000, desc: '' },
    ]
  },
  {
    id: 'duolingo', name: 'Duolingo', domain: 'duolingo.com', 
    products: [
      { id: 'du-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'du-2', name: '1 Bulan | 1 Akun', price: 7000, desc: '' },
      { id: 'du-3', name: '1 Bulan | 5 Akun', price: 23000, desc: '' },
      { id: 'du-4', name: '1 Bulan | 10 Akun', price: 35000, desc: '' },
      { id: 'du-5', name: '1 Tahun | Promo', price: 20000, desc: '' },
      { id: 'du-6', name: '2 Bulan | Promo', price: 12000, desc: '' },
    ]
  },
  {
    id: 'iqiyi', name: 'IQIYI', domain: 'iq.com', 
    products: [
      { id: 'iq-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'iq-2', name: '1 Bulan', price: 22000, desc: '' },
    ]
  },
  {
    id: 'meitu', name: 'Meitu VIP+', domain: 'meitu.com', 
    products: [
      { id: 'me-1', name: 'Account Basic', price: 5600, desc: '' },
      { id: 'me-2', name: '14D VIP | 10 Akun', price: 40000, desc: '' },
      { id: 'me-3', name: '14D VIP+ | 1 Akun', price: 10000, desc: '' },
      { id: 'me-4', name: '14D VIP+ | 5 Akun', price: 30000, desc: '' },
    ]
  },
  {
    id: 'scribd', name: 'Scribd', domain: 'scribd.com', 
    products: [
      { id: 'sc-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'sc-2', name: '1 Bulan | 1 Akun', price: 10000, desc: '' },
      { id: 'sc-3', name: '1 Bulan | 5 Akun', price: 30000, desc: '' },
    ]
  },
  {
    id: 'wink', name: 'WINK', domain: 'wink.com', 
    products: [
      { id: 'wi-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'wi-2', name: '7 Hari | Android', price: 10000, desc: '' },
    ]
  },
  {
    id: 'zoom', name: 'Zoom', domain: 'zoom.us', 
    products: [
      { id: 'zo-1', name: 'Account Basic', price: 5500, desc: '' },
      { id: 'zo-2', name: '14 Hari | 1 Akun', price: 7500, desc: '' },
      { id: 'zo-3', name: '14 Hari | 5 Akun', price: 25000, desc: '' },
      { id: 'zo-4', name: '14 Hari | 10 Akun', price: 39000, desc: '' },
      { id: 'zo-5', name: '30 Hari | 1 Akun', price: 10000, desc: '' },
      { id: 'zo-6', name: '30 Hari | 5 Akun', price: 35000, desc: '' },
      { id: 'zo-7', name: '30 Hari | 10 Akun', price: 57000, desc: '' },
    ]
  },
  {
    id: 'alightmotion', name: 'Alight Motion', domain: 'alightcreative.com', 
    products: [
      { id: 'am-1', name: '1 Tahun | 1 Akun', price: 7500, desc: '' },
      { id: 'am-2', name: '1 Tahun | 5 Akun', price: 22000, desc: '' },
      { id: 'am-3', name: '1 Tahun | 10 Akun', price: 30000, desc: '' },
    ]
  },
  {
    id: 'camscanner', name: 'CamScanner', domain: 'camscanner.com', 
    products: [
      { id: 'cs-1', name: '1 Bulan | 1 Akun', price: 10000, desc: '' },
      { id: 'cs-2', name: '1 Bulan | 5 Akun', price: 35000, desc: '' },
      { id: 'cs-3', name: '1 Bulan | 10 Akun', price: 45000, desc: '' },
    ]
  },
  {
    id: 'canva', name: 'Canva', domain: 'canva.com', 
    products: [
      { id: 'cv-1', name: '1 Bulan | Head 1 Akun', price: 10000, desc: '' },
      { id: 'cv-2', name: '1 Bulan | Head 5 Akun', price: 35000, desc: '' },
      { id: 'cv-3', name: 'Famhead | Lifetime', price: 655000, desc: '' },
      { id: 'cv-4', name: 'Member Lifetime', price: 15000, desc: '' },
    ]
  },
  {
    id: 'capcut', name: 'CapCut', domain: 'capcut.com', 
    products: [
      { id: 'ct-1', name: 'Individual 7 Bulan | 1 Akun', price: 205000, desc: '' },
      { id: 'ct-2', name: 'Team 1 Bulan | 1 Akun', price: 30000, desc: '' },
      { id: 'ct-3', name: 'Team 1 Bulan | 5 Akun', price: 135000, desc: '' },
      { id: 'ct-4', name: 'Team 1 Bulan | 10 Akun', price: 265000, desc: '' },
      { id: 'ct-5', name: 'Team 1 Minggu | 1 Akun', price: 9000, desc: '' },
      { id: 'ct-6', name: 'Team 1 Minggu | 5 Akun', price: 32000, desc: '' },
    ]
  },
  {
    id: 'chatgpt', name: 'ChatGPT', domain: 'openai.com', 
    products: [
      { id: 'cg-1', name: '1 Hari | Plus Garansi Penuh', price: 15000, desc: '' },
      { id: 'cg-2', name: '3 Bulan | GO Garansi 7D', price: 100000, desc: '' },
    ]
  },
  {
    id: 'dana', name: 'DANA Fresh', domain: 'dana.id', 
    products: [
      { id: 'dn-1', name: 'DANA', price: 8500, desc: '' },
    ]
  },
  {
    id: 'gsuite', name: 'GSuite Payment', domain: 'gsuite.google.com', 
    products: [
      { id: 'gs-1', name: 'Paysafecard | 1 Hari', price: 5800, desc: '' },
    ]
  },
  {
    id: 'gemini', name: 'Gemini', domain: 'gemini.google.com', 
    products: [
      { id: 'gm-1', name: 'Account 3 Bulan | Akun Buyer', price: 15000, desc: '' },
      { id: 'gm-2', name: 'Link 3 Bulan | Stok terakhir', price: 15000, desc: '' },
    ]
  },
  {
    id: 'getcontact', name: 'Getcontact', domain: 'getcontact.com', 
    products: [
      { id: 'gc-1', name: '1 Bulan | Manual', price: 10000, desc: '' },
    ]
  },
  {
    id: 'gmail', name: 'Gmail Fresh', domain: 'gmail.com', 
    products: [
      { id: 'gl-1', name: 'Gmail | 1 Akun', price: 12000, desc: '' },
      { id: 'gl-2', name: 'Gmail | 5 Akun', price: 47000, desc: '' },
      { id: 'gl-3', name: 'Gmail | 10 Akun', price: 82000, desc: '' },
      { id: 'gl-4', name: 'Hotmail | 1 Akun', price: 6000, desc: '' },
      { id: 'gl-5', name: 'Hotmail | 5 Akun', price: 18500, desc: '' },
      { id: 'gl-6', name: 'Outlook | 1 Akun', price: 6000, desc: '' },
      { id: 'gl-7', name: 'Outlook | 5 Akun', price: 18500, desc: '' },
    ]
  },
  {
    id: 'googledrive', name: 'Google Drive', domain: 'drive.google.com', 
    products: [
      { id: 'gd-1', name: '18 Bulan | 5 TB', price: 55000, desc: '' },
    ]
  },
  {
    id: 'hbomax', name: 'HBO Max', domain: 'hbomax.com', 
    products: [
      { id: 'hb-1', name: '1 Bulan | 1 Akun', price: 40000, desc: '' },
      { id: 'hb-2', name: '1 Bulan | 5 Akun', price: 170000, desc: '' },
    ]
  },
  {
    id: 'loklok', name: 'LokLok', domain: 'loklok.com', 
    products: [
      { id: 'll-1', name: '1 Bulan | Website', price: 10000, desc: '' },
    ]
  },
  {
    id: 'msoffice', name: 'MS Office 365', domain: 'microsoft.com', 
    products: [
      { id: 'mo-1', name: '1 Bulan Head | 1 Akun', price: 10000, desc: '' },
      { id: 'mo-2', name: '1 Bulan Head | 5 Akun', price: 35000, desc: '' },
      { id: 'mo-3', name: '1 Bulan Head | 10 Akun', price: 45000, desc: '' },
    ]
  },
  {
    id: 'netflix', name: 'Netflix', domain: 'netflix.com', 
    products: [
      { id: 'nf-1', name: '1 Bulan | 1P 1U', price: 40000, desc: '' },
      { id: 'nf-2', name: '1 Bulan | 1P 2U', price: 25000, desc: '' },
    ]
  },
  {
    id: 'perplexity', name: 'Perplexity AI', domain: 'perplexity.ai', 
    products: [
      { id: 'px-1', name: '1 Bulan | Sharing', price: 30000, desc: '' },
      { id: 'px-2', name: '1 Minggu | Sharing', price: 15000, desc: '' },
    ]
  },
  {
    id: 'picsart', name: 'PicsArt', domain: 'picsart.com', 
    products: [
      { id: 'pa-1', name: '3 Hari | 1 Akun', price: 8999, desc: '' },
      { id: 'pa-2', name: '3 Hari | 5 Akun', price: 25000, desc: '' },
    ]
  },
  {
    id: 'primevideo', name: 'Prime Video', domain: 'primevideo.com', 
    products: [
      { id: 'pv-1', name: '1 Bulan | 1 Akun', price: 11000, desc: '' },
      { id: 'pv-2', name: '1 Bulan | 5 Akun', price: 42500, desc: '' },
      { id: 'pv-3', name: '1 Bulan | 10 Akun', price: 72000, desc: '' },
      { id: 'pv-4', name: '6 Bulan | Promo', price: 35000, desc: '' },
    ]
  },
  {
    id: 'spotify', name: 'Spotify', domain: 'spotify.com', 
    products: [
      { id: 'sp-1', name: 'Account 1 Bulan | Garansi Penuh', price: 18000, desc: '' },
      { id: 'sp-2', name: 'Link 1 Bulan | Student', price: 6250, desc: '' },
    ]
  },
  {
    id: 'viu', name: 'VIU', domain: 'viu.com', 
    products: [
      { id: 'vu-1', name: 'Lifetime | Private', price: 13000, desc: '' },
    ]
  },
  {
    id: 'vpnexpress', name: 'VPN Express', domain: 'expressvpn.com', 
    products: [
      { id: 've-1', name: '1 Bulan | Private', price: 22000, desc: '' },
      { id: 've-2', name: '3 Hari | 1 Akun', price: 8999, desc: '' },
      { id: 've-3', name: '3 Hari | 5 Akun', price: 30000, desc: '' },
    ]
  },
  {
    id: 'vpnhma', name: 'VPN HMA', domain: 'hma.com', 
    products: [
      { id: 'vh-1', name: '1 Bulan | 1 Akun', price: 10000, desc: '' },
      { id: 'vh-2', name: '1 Bulan | 5 Akun', price: 30000, desc: '' },
      { id: 'vh-3', name: '1 Bulan | 10 Akun', price: 45000, desc: '' },
    ]
  },
  {
    id: 'vpnproton', name: 'VPN Proton', domain: 'protonvpn.com', 
    products: [
      { id: 'vp-1', name: '1 Bulan | 1 Akun', price: 30000, desc: '' },
      { id: 'vp-2', name: '1 Bulan | 5 Akun', price: 130000, desc: '' },
    ]
  },
  {
    id: 'vpnsurfshark', name: 'VPN Surfshark', domain: 'surfshark.com', 
    products: [
      { id: 'vs-1', name: '1 Minggu | 1 Akun', price: 9999, desc: '' },
      { id: 'vs-2', name: '1 Minggu | 5 Akun', price: 25000, desc: '' },
    ]
  },
  {
    id: 'vpnnord', name: 'VPN Nord', domain: 'nordvpn.com', 
    products: [
      { id: 'vn-1', name: '1 Bulan | Private', price: 25000, desc: '' },
    ]
  },
  {
    id: 'wetv', name: 'WeTV', domain: 'wetv.vip', 
    products: [
      { id: 'wt-1', name: '1 Bulan | Private', price: 30000, desc: '' },
    ]
  },
  {
    id: 'youtube', name: 'YouTube Premium', domain: 'youtube.com', 
    products: [
      { id: 'yt-1', name: '1 Bulan | 1 Akun', price: 18000, desc: '' },
      { id: 'yt-2', name: '1 Bulan | 5 Akun', price: 77000, desc: '' },
      { id: 'yt-3', name: '1 Bulan | 10 Akun', price: 145000, desc: '' },
    ]
  },
  {
    id: 'applemusic', name: 'Apple Music', domain: 'apple.com', 
    products: [
      { id: 'ap-1', name: '1 Bulan | Head 1 Akun', price: 10000, desc: '' },
    ]
  },
  {
    id: 'voucher', name: 'Voucher Spesial', domain: 'voucher.com', 
    products: [
      { id: 'vc-1', name: '1 Hari | Capcut ID', price: 12000, desc: '' },
      { id: 'vc-2', name: '1 Hari | Capcut US', price: 10000, desc: '' },
      { id: 'vc-3', name: '3 Hari | Alight Motion', price: 15000, desc: '' },
      { id: 'vc-4', name: '7 Hari | Zoom', price: 10000, desc: '' },
    ]
  }
];

const globalStyles = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulseGlow { 0% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.2); } 50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.6); } 100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.2); } }
  .animate-fade { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .app-card { transition: all 0.3s ease; }
  .app-card:hover { transform: translateY(-8px) scale(1.03); border-color: #d8b4fe !important; box-shadow: 0 15px 30px rgba(147, 51, 234, 0.3); }
  .btn-hover:hover { transform: scale(1.02); filter: brightness(1.1); }
  .btn-hover:active { transform: scale(0.98); }
  .logo-img { transition: 0.3s; filter: drop-shadow(0 0 8px rgba(255,255,255,0.1)); }
  .app-card:hover .logo-img { filter: drop-shadow(0 0 15px rgba(147, 51, 234, 0.8)); transform: scale(1.1); }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 4px; }
`;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('yanz_session');
    if (session) {
      setIsLoggedIn(true);
      setUsername(session);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim().length < 3) return alert('Nama minimal 3 karakter');
    localStorage.setItem('yanz_session', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('yanz_session');
    setIsLoggedIn(false);
    setSelectedApp(null);
    setSelectedProduct(null);
    setOrderDetails(null);
  };

  const handleBuy = (product) => {
    const uniqueCode = Math.floor(Math.random() * 200) + 100;
    const total = product.price + uniqueCode;
    const orderId = `INV-${Date.now().toString().slice(-6)}`;
    setSelectedProduct(product);
    setOrderDetails({ uniqueCode, total, orderId });
  };

  const waText = orderDetails && selectedProduct 
    ? `Halo Admin, saya *${username}* mau konfirmasi pesanan.\n\n*Order ID:* ${orderDetails.orderId}\n*Produk:* ${selectedProduct.name}\n*Total Transfer:* Rp ${orderDetails.total.toLocaleString('id-ID')}\n\n_(Saya lampirkan bukti transfer di bawah ini)_` 
    : '';
  const waLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waText)}`;

  // 1. TAMPILAN LOGIN
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <style>{globalStyles}</style>
        <div className="animate-fade" style={{ background: 'linear-gradient(145deg, #12121a, #050505)', padding: '3rem 2rem', borderRadius: '20px', border: '1px solid #4c1d95', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 50px rgba(76, 29, 149, 0.2)' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.2rem', textShadow: '0 0 15px #9333ea', letterSpacing: '2px' }}>YANZ</h1>
          <p style={{ color: '#a78bfa', marginBottom: '2.5rem', fontSize: '0.9rem', letterSpacing: '1px' }}>PREMIUM STORE ACCESS</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #4c1d95', backgroundColor: '#0a0a0f', color: '#fff', marginBottom: '1.5rem', outline: 'none', transition: '0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#d8b4fe'}
              onBlur={(e) => e.target.style.borderColor = '#4c1d95'}
            />
            <button 
              type="submit"
              className="btn-hover"
              style={{ width: '100%', padding: '1rem', background: 'linear-gradient(90deg, #7e22ce, #4c1d95)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 15px rgba(126, 34, 206, 0.4)' }}
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TAMPILAN PEMBAYARAN (QRIS)
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

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-hover" style={{ display: 'block', width: '100%', padding: '1.2rem', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', transition: '0.2s', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}>
            Saya Sudah Bayar
          </a>
          
          <button onClick={() => { setSelectedProduct(null); setOrderDetails(null); }} style={{ marginTop: '1.5rem', width: '100%', background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem', transition: '0.2s' }}>
            Batalkan Pesanan
          </button>
        </div>
      </div>
    );
  }

  // 3. TAMPILAN UTAMA (Katalog & Detail)
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '3rem' }}>
      <style>{globalStyles}</style>
      
      {/* BANNER HEADER */}
      <div style={{ width: '100%', backgroundColor: '#000', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img src="/banner.jpg" alt="Banner" style={{ width: '100%', maxWidth: '1000px', maxHeight: '350px', objectFit: 'cover', opacity: 0.9 }} />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #4c1d95' }}>
          <span style={{ fontSize: '0.85rem', color: '#d8b4fe' }}>Halo, <strong>{username}</strong></span>
          <button onClick={handleLogout} style={{ padding: '0.3rem 0.8rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', transition: '0.2s' }}>Keluar</button>
        </div>
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        
        {/* TAMPILAN DETAIL APLIKASI */}
        {selectedApp ? (
          <div className="animate-fade">
            <button onClick={() => setSelectedApp(null)} style={{ marginBottom: '1.5rem', background: 'rgba(76, 29, 149, 0.2)', border: '1px solid #4c1d95', color: '#d8b4fe', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem', borderRadius: '8px', transition: '0.2s' }}>
              ← Kembali ke Katalog
            </button>
            
            <div style={{ background: 'linear-gradient(90deg, #12121a, #1a103c)', borderRadius: '16px', padding: '2rem', border: '1px solid #4c1d95', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <img src={`https://logo.clearbit.com/${selectedApp.domain}`} alt={selectedApp.name} style={{ width: '80px', height: '80px', borderRadius: '16px', backgroundColor: '#fff', padding: '8px', objectFit: 'contain' }} />
              <div>
                <h1 style={{ margin: 0, fontSize: '2rem', textShadow: '0 0 10px rgba(147, 51, 234, 0.5)' }}>{selectedApp.name}</h1>
                <p style={{ margin: '0.5rem 0 0 0', color: '#9ca3af' }}>Pilih varian produk di bawah ini.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {selectedApp.products.map((p, index) => (
                <div key={p.id} className="animate-slide" style={{ animationDelay: `${index * 0.05}s`, opacity: 0, background: '#12121a', border: '1px solid #2a1b4d', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', transition: '0.3s' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#fff' }}>{p.name}</h3>
                    {p.desc && <span style={{ backgroundColor: '#4c1d95', color: '#d8b4fe', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{p.desc}</span>}
                    <p style={{ margin: '1rem 0 0 0', fontWeight: 'bold', fontSize: '1.4rem', color: '#d8b4fe', textShadow: '0 0 5px rgba(216, 180, 254, 0.5)' }}>Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => handleBuy(p)} className="btn-hover" style={{ padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #7e22ce 0%, #4c1d95 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s', boxShadow: '0 4px 15px rgba(126, 34, 206, 0.3)' }}>
                    Beli
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* TAMPILAN KATALOG UTAMA */
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#a78bfa', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Katalog Produk</h2>
              <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, transparent, #9333ea, transparent)', margin: '0.8rem auto' }}></div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.2rem' }}>
              {appsData.map((app, index) => (
                <div 
                  key={app.id} 
                  onClick={() => setSelectedApp(app)} 
                  className="app-card animate-slide" 
                  style={{ animationDelay: `${index * 0.03}s`, opacity: 0, background: 'rgba(18, 18, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid #2a1b4d', borderRadius: '16px', padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer' }}
                >
                  <img 
                    src={`https://logo.clearbit.com/${app.domain}`} 
                    alt={app.name} 
                    className="logo-img"
                    style={{ width: '64px', height: '64px', margin: '0 auto 1.2rem auto', borderRadius: '14px', backgroundColor: '#fff', padding: '10px', objectFit: 'contain' }} 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff&size=64`; }}
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
