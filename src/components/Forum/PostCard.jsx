import React, { useState, useRef } from 'react';
import FilePreview from './FilePreview';

export default function PostCard({ post, onEdit, onDelete, onAddReply, onEditReply, onDeleteReply }){
  const [showReply,setShowReply] = useState(false);
  const [rUser,setRUser] = useState('');
  const [rText,setRText] = useState('');
  const [rFile,setRFile] = useState(null);
  const fileRef = useRef(null);

  const [editing,setEditing] = useState(false);
  const [editText,setEditText] = useState(post.text);

  const saveEdit = ()=>{
    if(editText.trim()==='') return alert('Post cannot be empty');
    onEdit(post.id, editText.trim()); setEditing(false);
  }

  const sendReply = ()=>{
    if(!rUser || !rText) return alert('Enter reply name and text');
    onAddReply(post.id, rUser, rText, rFile, rFile ? rFile.name : null);
    setRUser(''); setRText(''); setRFile(null); if(fileRef.current) fileRef.current.value=''; setShowReply(false);
  }

  return (
    <div className="card" style={{marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h4 style={{margin:0}}>@{post.user}</h4>
        <div style={{display:'flex',gap:8}}>
          <button className="ghost" onClick={()=>{const t=prompt('Confirm edit? Do you want inline editor instead?') ; setEditing(true);}}>✏️</button>
          <button className="ghost" style={{background:'#ef4444',color:'#fff'}} onClick={()=>onDelete(post.id)}>🗑️</button>
        </div>
      </div>

      {editing ? (
        <div>
          <textarea value={editText} onChange={e=>setEditText(e.target.value)} />
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button className="primary" onClick={saveEdit}>Save</button>
            <button className="ghost" onClick={()=>{setEditing(false); setEditText(post.text)}}>Cancel</button>
          </div>
        </div>
      ) : (
        <p style={{whiteSpace:'pre-wrap'}}>{post.text}</p>
      )}

      {post.file && <FilePreview fileData={post.file} fileName={post.fileName} />}

      <div style={{marginTop:8}}>
        <button className="primary" onClick={()=>setShowReply(s=>!s)}>💬 Reply</button>
      </div>

      {post.replies && post.replies.map((r,idx)=> (
        <div className="reply" key={idx} style={{marginTop:8}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <strong>{r.user}</strong>
            <div style={{display:'flex',gap:6}}>
              <button className="ghost" onClick={()=>{ const t=prompt('Edit reply:', r.text); if(t!==null && t.trim()!=='') onEditReply(post.id, idx, t.trim()); }}>✏️</button>
              <button className="ghost" style={{background:'#ef4444',color:'#fff'}} onClick={()=>onDeleteReply(post.id, idx)}>🗑️</button>
            </div>
          </div>
          <div>{r.text}</div>
          {r.file && <FilePreview fileData={r.file} fileName={r.fileName} />}
        </div>
      ))}

      {showReply && (
        <div className="reply-box">
          <input placeholder="Your name" value={rUser} onChange={e=>setRUser(e.target.value)} />
          <textarea placeholder="Reply..." value={rText} onChange={e=>setRText(e.target.value)} />
          <div className="flex-row">
            <input ref={fileRef} type="file" onChange={e=>setRFile(e.target.files[0])} />
            <div className="tag">Max 3MB • png/jpg/pdf/doc</div>
          </div>
          {rFile && <FilePreview fileData={URL.createObjectURL(rFile)} fileName={rFile.name} />}
          <div style={{display:'flex',gap:8}}>
            <button className="primary" onClick={sendReply}>Send Reply</button>
            <button className="ghost" onClick={()=>{setRUser(''); setRText(''); setRFile(null); if(fileRef.current) fileRef.current.value='';}}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  )
}