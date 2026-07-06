import React from 'react';

export default function ClubCard({ club, onDelete }){
  return (
    <div className="card">
      <h4>{club.n}</h4>
      <p>{club.d}</p>
      <div>
        <button style={{background:'#facc15',color:'#000'}} onClick={()=>{const nn=prompt('Edit club name:',club.n); const dd=prompt('Edit description:',club.d); if(nn && dd){ const arr=JSON.parse(localStorage.getItem('clubs')||'[]'); const updated=arr.map(x=>x.id===club.id?{...x,n:nn,d:dd}:x); localStorage.setItem('clubs',JSON.stringify(updated)); window.location.reload(); }}}>✏️ Edit</button>
        <button style={{background:'#ef4444',marginLeft:8}} onClick={onDelete}>🗑️ Delete</button>
      </div>
    </div>
  )
}
