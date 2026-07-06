import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard';

export default function Clubs(){
  const [clubs,setClubs] = useState([]);
  const [name,setName] = useState('');
  const [desc,setDesc] = useState('');

  useEffect(()=>{ setClubs(JSON.parse(localStorage.getItem('clubs'))||[]); },[]);
  useEffect(()=>{ localStorage.setItem('clubs', JSON.stringify(clubs)); },[clubs]);

  const addClub = ()=>{ if(!name||!desc) return alert('Fill all fields'); setClubs(prev=>[...prev,{n:name,d:desc,id:Date.now()}]); setName(''); setDesc(''); }
  const deleteClub = (id)=>{ if(window.confirm('Delete this club?')) setClubs(prev=>prev.filter(c=>c.id!==id)); }

  return (
    <section className="section">
      <h3>Clubs 🏛</h3>
      <div className="card">
        <h4>Add Club</h4>
        <input placeholder="Club name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea placeholder="Club description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button className="primary" onClick={addClub}>Add Club</button>
      </div>

      <div>
        {clubs.map(c=> <ClubCard key={c.id} club={c} onDelete={()=>deleteClub(c.id)} />)}
      </div>
    </section>
  )
}