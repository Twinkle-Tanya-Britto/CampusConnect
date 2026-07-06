import React, { useState, useEffect } from 'react';
import MarketItem from './MarketItem';

export default function Market(){
  const [market,setMarket] = useState([]);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [contact,setContact] = useState('');
  const [imageFile,setImageFile] = useState(null);
  const [showPayment,setShowPayment] = useState(null); // {name,price,contact}

  useEffect(()=>{ setMarket(JSON.parse(localStorage.getItem('market'))||[]); },[]);
  useEffect(()=>{ localStorage.setItem('market', JSON.stringify(market)); },[market]);

  const toDataUrl = (file)=> new Promise((res,rej)=>{ const reader=new FileReader(); reader.onload=e=>res(e.target.result); reader.onerror=err=>rej(err); reader.readAsDataURL(file); });

  const addItem = async ()=>{
    if(!name||!price||!contact) return alert('Please fill all fields');
    const img = imageFile? await toDataUrl(imageFile):'';
    setMarket(prev=>[...prev,{name,price,contact,img,id:Date.now()}]);
    setName('');setPrice('');setContact('');setImageFile(null);
    document.getElementById('itemImage').value='';
  }

  const deleteItem = (id)=>{ if(window.confirm('Delete this item?')) setMarket(prev=>prev.filter(m=>m.id!==id)); }

  const openPayment = (item)=> setShowPayment(item);
  const closePayment = ()=> setShowPayment(null);

  return (
    <section className="section">
      <h3>Marketplace 🛒</h3>
      <div className="card">
        <h4>Add Item</h4>
        <input placeholder="Item name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Price (₹)" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Contact email" value={contact} onChange={e=>setContact(e.target.value)} />
        <input id="itemImage" type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} />
        <button className="primary" onClick={addItem}>Add</button>
      </div>

      <div>
        {market.map((m,i)=> <MarketItem key={m.id} item={m} onBuy={()=>openPayment(m)} onDelete={()=>deleteItem(m.id)} />)}
      </div>

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-box">
            <h3>Payment for {showPayment.name}</h3>
            <p className="small">Price: ₹{showPayment.price}</p>
            <p className="small">Contact: {showPayment.contact}</p>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <input placeholder="UPI ID" />
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:12}}>
              <button onClick={closePayment}>Cancel</button>
              <button className="primary" onClick={()=>{alert('Payment simulated!'); closePayment();}}>Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

