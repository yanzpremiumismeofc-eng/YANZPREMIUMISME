'use client';

import { useState } from 'react';

// GANTI NOMOR INI DENGAN NOMOR WA KAMU (format: 628xxx)
const ADMIN_PHONE = '6285702355713';

const products = [
  { id: 'capcut-1m', name: 'CapCut Team 1 Bulan', price: 30000, desc: '1 Akun | Garansi Penuh' },
  { id: 'chatgpt-plus', name: 'ChatGPT Plus 1 Bulan', price: 105000, desc: 'Garansi 7 Hari' },
  { id: 'netflix-1m', name: 'Netflix 1 Bulan', price: 40000, desc: '1 Profile 1 User' },
  { id: 'canva-pro', name: 'Canva Pro 1 Bulan', price: 10000, desc: 'Head 1 Akun' },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleBuy = (product) => {
    const uniqueCode = Math.floor(Math.random() * 200) + 100;
    const total = product.price + uniqueCode;
    const orderId = `INV-${Date.now().toString().slice(-6)}`;

    setSelectedProduct(product);
    setOrderDetails({ uniqueCode, total, orderId });
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setOrderDetails(null);
  };

  const waText = orderDetails && selectedProduct 
    ? `Halo Admin, saya mau konfirmasi pesanan.\n\n*Order ID:* ${orderDetails.orderId}\n*Produk:* ${selectedProduct.name}\n*Total Transfer:* Rp ${orderDetails.total.toLocaleString('id-ID')}\n\n_(Saya lampirkan bukti transfer di bawah ini)_` 
    : '';
  
  const waLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waText)}`;

  if (selectedProduct && orderDetails) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Selesaikan Pembayaran</h1>
        
        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '12px', backgroundColor: '#fafafa' }}>
          <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Order ID: <strong>{orderDetails.orderId}</strong></p>
          <h2 style={{ margin: '0 0 1rem 0' }}>{selectedProduct.name}</h2>
          
          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', border: '1px dashed #ccc', marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Total Transfer (Wajib Tepat):</p>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#e11d48' }}>
              Rp {orderDetails.total.toLocaleString('id-ID')}
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#999' }}>
              (Harga: Rp {selectedProduct.price.toLocaleString('id-ID')} + Kode Unik: Rp {orderDetails.uniqueCode})
            </p>
          </div>

          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Scan QRIS di bawah ini:</p>
          <img 
            src="/qris.jpg" 
            alt="QRIS Pembayaran" 
            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', margin: '0 auto 1.5rem auto', display: 'block' }} 
          />

          <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'left', marginBottom: '1.5rem' }}>
            <strong>⚠️ PERHATIAN:</strong><br/>
            1. Transfer wajib <strong>tepat angka</strong> hingga 3 digit terakhir.<br/>
            2. Jika nominal tidak sesuai, pesanan otomatis gagal.<br/>
            3. Setelah transfer, klik tombol di bawah untuk kirim bukti ke Admin.
          </div>

          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', padding: '1rem', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            💬 Konfirmasi ke WhatsApp
          </a>

          <button 
            onClick={handleCancel}
            style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Batalkan Pesanan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>YANZ PREMIUMISME</h1>
        <p style={{ color: '#666' }}>Pusat Layanan Digital Premium. Cepat, Aman, Terpercaya.</p>
      </div>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{p.name}</h2>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{p.desc}</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: '#e11d48' }}>
                Rp {p.price.toLocaleString('id-ID')}
              </p>
            </div>
            <button 
              onClick={() => handleBuy(p)}
              style={{ padding: '0.8rem 2rem', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
