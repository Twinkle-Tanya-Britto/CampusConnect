import React from 'react';

export default function MarketItem({ item, onBuy, onDelete }){
  return (
    <div className="card">
      <h4>{item.name}</h4>
      <p>₹{item.price} • {item.contact}</p>
      {item.img? <img src={item.img} className="market-img" alt={item.name} /> : null}
      <div>
        <button className="primary" onClick={onBuy}>💳 Buy Now</button>
        <button style={{background:'#facc15',color:'#000',marginLeft:8}} onClick={()=>{const newName=prompt('Edit item name:',item.name); const newPrice=prompt('Edit price:',item.price); if(newName && newPrice){ item.name=newName; item.price=newPrice; localStorage.setItem('market', JSON.stringify(JSON.parse(localStorage.getItem('market')).map(m=>m.id===item.id?{...m,name:newName,price:newPrice}:m))); window.location.reload(); }}}>✏️ Edit</button>
        <button style={{background:'#ef4444',marginLeft:8}} onClick={onDelete}>🗑️ Delete</button>
      </div>
    </div>
  )
}

