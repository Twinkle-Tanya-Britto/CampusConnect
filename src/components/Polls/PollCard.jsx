import React from 'react';

export default function PollCard({ poll, index, onVote, onDelete }){
  return (
    <div className="card">
      <h4>{poll.q}</h4>
      <div>
        {poll.options.map((o,oi)=> (
          <div key={oi} style={{marginBottom:8}}>
            <button className="primary" onClick={()=>onVote(index,oi)}>{o} ({poll.votes[oi]})</button>
          </div>
        ))}
      </div>
      <div>
        <button style={{background:'#facc15',color:'#000'}} onClick={()=>{const newQ=prompt('Edit poll question:',poll.q); if(newQ){ const arr=JSON.parse(localStorage.getItem('polls')||'[]'); const updated=arr.map(x=>x.id===poll.id?{...x,q:newQ}:x); localStorage.setItem('polls',JSON.stringify(updated)); window.location.reload(); }}}>✏️ Edit</button>
        <button style={{background:'#ef4444',marginLeft:8}} onClick={onDelete}>🗑️ Delete</button>
      </div>
    </div>
  )
}
