import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

export default function Events(){
  const [events,setEvents] = useState([]);
  const [title,setTitle] = useState('');
  const [date,setDate] = useState('');
  const [venue,setVenue] = useState('');

  useEffect(()=>{ setEvents(JSON.parse(localStorage.getItem('events'))||[]); },[]);
  useEffect(()=>{ localStorage.setItem('events', JSON.stringify(events)); },[events]);

  const addEvent = ()=>{
    if(!title||!date||!venue) return alert('Please fill all fields');
    setEvents(prev=>[...prev,{title,date,venue,id:Date.now()}]);
    setTitle(''); setDate(''); setVenue('');
  }

  const deleteEvent = (id)=>{ if(window.confirm('Delete event?')) setEvents(prev=>prev.filter(e=>e.id!==id)); }

  return (
    <section className="section">
      <h3>Event Calendar 📅</h3>
      <div className="card">
        <h4>Add New Event</h4>
        <input placeholder="Event title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input placeholder="Venue and Time" value={venue} onChange={e=>setVenue(e.target.value)} />
        <button className="primary" onClick={addEvent}>Add Event</button>
      </div>

      <Calendar events={events} />

      <div>
        {events.map(ev=> (
          <div className="card" key={ev.id}>
            <strong>{ev.title}</strong> — {ev.date} @ {ev.venue}
            <div>
              <button style={{background:'#ef4444',marginLeft:8}} onClick={()=>deleteEvent(ev.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

