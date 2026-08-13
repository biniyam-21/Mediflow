import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { IconHeart, IconHeartOff, IconShoppingCart, IconArrowLeft, IconPill } from '@tabler/icons-react';
import { getAllMedicines } from '../services/medicineService';
import { getFavoriteIds, toggleFavorite } from '../services/favoriteService';
import { useToast } from '../context/ToastContext';
import { Medicine } from '../types';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const allMeds = getAllMedicines();

  const [favIds, setFavIds] = useState<string[]>(getFavoriteIds());

  const favoriteMeds = allMeds.filter((m) => favIds.includes(m._id));

  const handleRemove = (id: string, title: string) => {
    toggleFavorite(id);
    setFavIds(getFavoriteIds());
    showToast(`Removed "${title}" from favorites`, 'info');
  };

  const handleAddToCart = (med: Medicine) => {
    showToast(`Added "${med.Title}" to cart!`, 'success');
  };

  const handleAddAllToCart = () => {
    if (favoriteMeds.length === 0) return;
    showToast(`Added all ${favoriteMeds.length} favorite items to cart!`, 'success');
    setTimeout(() => navigate('/cart'), 1000);
  };

  return (
    <DashboardLayout title="Fast Reorder & Saved Favorites" subtitle="Quickly order your hospital's frequently required medicines">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <button
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}
          onClick={() => navigate('/product')}
        >
          <IconArrowLeft size={15} /> Browse Medicine Catalog
        </button>

        {favoriteMeds.length > 0 && (
          <button
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', fontSize: '0.88rem' }}
            onClick={handleAddAllToCart}
          >
            <IconShoppingCart size={16} /> Add All ({favoriteMeds.length}) to Cart
          </button>
        )}
      </div>

      {favoriteMeds.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <IconHeart size={48} color="#cbd5e1" style={{ marginBottom: 14 }} />
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-secondary)' }}>No saved favorite medicines</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Click the heart icon on any medicine card to save it for fast re-ordering.
          </div>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/product')}>
            Browse Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {favoriteMeds.map((med) => (
            <div key={med._id} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Unfavorite button top right */}
              <button
                onClick={() => handleRemove(med._id, med.Title)}
                style={{
                  position: 'absolute', top: 12, right: 12, zIndex: 10,
                  width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                  border: '1px solid #fee2e2', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}
                title="Remove from favorites"
              >
                <IconHeartOff size={16} color="#ef4444" />
              </button>

              <div style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'center' }}>
                <img
                  src={med.ImageUrl}
                  alt={med.Title}
                  style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100'; }}
                />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary-dark)', textTransform: 'uppercase' }}>
                    {med.Category || 'General Medicine'}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginTop: 2, lineHeight: 1.3 }}>
                    {med.Title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{med.Unit}</div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Price per unit</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-dark)' }}>{med.Price}</div>
                </div>

                <button
                  className="btn-primary"
                  style={{ padding: '7px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5 }}
                  onClick={() => handleAddToCart(med)}
                >
                  <IconShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Favorites;
