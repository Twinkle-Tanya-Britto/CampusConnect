import React, { useState, useEffect, useRef } from 'react';
import PostCard from './PostCard';
import FilePreview from './FilePreview';

export default function Forum(){
  const [posts,setPosts] = useState([]);
  const [user,setUser] = useState('');
  const [text,setText] = useState('');
  const [file,setFile] = useState(null);
  const fileInputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(()=>{ setPosts(JSON.parse(localStorage.getItem('posts'))||[]); },[]);

  useEffect(()=>{ localStorage.setItem('posts', JSON.stringify(posts)); },[posts]);

  const toDataUrl = (file)=> new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // file restrictions
  const MAX_BYTES = 3 * 1024 * 1024; // 3MB
  const ALLOWED = ['png','jpg','jpeg','gif','webp','pdf','doc','docx','txt','rtf'];

  const validateFile = (f) =>{
    if(!f) return {ok:true};
    if(f.size > MAX_BYTES) return {ok:false, msg:'File too large (max 3MB)'};
    const ext = f.name.split('.').pop().toLowerCase();
    if(!ALLOWED.includes(ext)) return {ok:false, msg:'File type not allowed'};
    return {ok:true};
  }

  const addPost = async ()=>{
    if(!user || !text) return alert('Please fill all fields');

    const v = validateFile(file);
    if(!v.ok) return alert(v.msg);

    const fileData = file ? await toDataUrl(file) : null;

    setPosts(prev=>[
      ...prev,
      { user, text, file:fileData, fileName:file?file.name:null, id:Date.now(), replies:[] }
    ]);

    setUser(''); setText(''); setFile(null); if(fileInputRef.current) fileInputRef.current.value='';

    // scroll to bottom
    setTimeout(()=>{ listRef.current?.scrollIntoView({behavior:'smooth', block:'end'}); }, 100);
  }

  const updatePost = (id,newText)=>{
    setPosts(prev=>prev.map(p=> p.id===id?{...p,text:newText}:p ));
  }
  const deletePost = (id)=>{ if(window.confirm('Delete post?')) setPosts(prev=>prev.filter(p=>p.id!==id)); }

  const addReply = async (postId, replyUser, replyText, replyFile, replyFileName)=>{
    const v = validateFile(replyFile);
    if(!v.ok) return alert(v.msg);
    const fileData = replyFile ? await toDataUrl(replyFile) : null;

    setPosts(prev=> prev.map(p=> p.id===postId?{...p, replies:[...p.replies, {user:replyUser, text:replyText, file:fileData, fileName: replyFileName || null }]}:p ));

    setTimeout(()=>{ document.getElementById(`post-${postId}`)?.scrollIntoView({behavior:'smooth', block:'end'}); }, 100);
  }

  const editReply = (postId, idx, newText)=>{
    setPosts(prev=>prev.map(p=>{ if(p.id!==postId) return p; const r=[...p.replies]; r[idx].text=newText; return {...p,replies:r}; }));
  }
  const deleteReply = (postId, idx)=>{
    setPosts(prev=>prev.map(p=>{ if(p.id!==postId) return p; const r=p.replies.filter((_,i)=>i!==idx); return {...p,replies:r}; }));
  }

  return (
    <section className="section">
      <h3>Discussion Forum 💬</h3>
      <div className="card">
        <h4>Add a New Post</h4>
        <input placeholder="Your name" value={user} onChange={e=>setUser(e.target.value)} />
        <textarea placeholder="Write something..." value={text} onChange={e=>setText(e.target.value)} />

        <div className="flex-row">
          <input ref={fileInputRef} id="postFile" type="file" onChange={e=>setFile(e.target.files[0])} />
          <div className="tag">Max 3MB • png/jpg/pdf/doc</div>
        </div>

        {file && <FilePreview fileData={URL.createObjectURL(file)} fileName={file.name} />}

        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="primary" onClick={addPost}>Post</button>
          <button className="ghost" onClick={()=>{ setUser(''); setText(''); setFile(null); if(fileInputRef.current) fileInputRef.current.value=''; }}>Clear</button>
        </div>
      </div>

      <div ref={listRef}>
        {posts.map((p)=> (
          <div id={`post-${p.id}`} key={p.id}>
            <PostCard post={p} onEdit={updatePost} onDelete={deletePost}
              onAddReply={addReply} onEditReply={editReply} onDeleteReply={deleteReply} />
          </div>
        ))}
      </div>
    </section>
  )
}