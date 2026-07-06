import React, { useState, useEffect } from 'react';
import PollCard from './PollCard';

export default function Polls(){
  const [polls,setPolls] = useState([]);
  const [q,setQ] = useState('');
  const [opts,setOpts] = useState('');

  useEffect(()=>{ setPolls(JSON.parse(localStorage.getItem('polls'))||[]); },[]);
  useEffect(()=>{ localStorage.setItem('polls', JSON.stringify(polls)); },[polls]);

  const addPoll = ()=>{
    const o = opts.split(',').map(x=>x.trim()).filter(Boolean);
    if(!q || o.length<2) return alert('Enter a question and at least two options');
    setPolls(prev=>[...prev,{q,options:o,votes:new Array(o.length).fill(0),id:Date.now()}]); setQ(''); setOpts('');
  }
  const vote = (pi,oi)=>{ setPolls(prev=>prev.map((p,i)=> i===pi?{...p,votes:p.votes.map((v,ii)=> ii===oi? v+1:v)}:p)); }
  const deletePoll = (id)=>{ if(window.confirm('Delete this poll?')) setPolls(prev=>prev.filter(p=>p.id!==id)); }

  return (
    <section className="section">
      <h3>Polls & Surveys 📊</h3>
      <div className="card">
        <h4>Create Poll</h4>
        <input placeholder="Poll question" value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Options (comma separated)" value={opts} onChange={e=>setOpts(e.target.value)} />
        <button className="primary" onClick={addPoll}>Add Poll</button>
      </div>

      <div>
        {polls.map((p, i)=> <PollCard key={p.id} poll={p} index={i} onVote={vote} onDelete={()=>deletePoll(p.id)} />)}
      </div>
    </section>
  )
}