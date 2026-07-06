import React from 'react';

// Props: { fileData, fileName }
// fileData = base64 data URL (data:...)

function getFileType(fileName){
  const ext = fileName?.split('.').pop()?.toLowerCase() || '';
  if(['png','jpg','jpeg','gif','webp'].includes(ext)) return 'image';
  if(['pdf'].includes(ext)) return 'pdf';
  if(['doc','docx','txt','rtf'].includes(ext)) return 'doc';
  return 'file';
}

export default function FilePreview({ fileData, fileName }){
  if(!fileData) return null;
  const type = getFileType(fileName || 'file');

  return (
    <div className="file-card" style={{marginTop:8}}>
      {type === 'image' ? (
        <img src={fileData} alt={fileName} className="file-thumb" />
      ) : (
        <div className="file-thumb" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#fafafa',fontSize:18,color:'#666'}}>
          {type.toUpperCase()}
        </div>
      )}

      <div className="file-meta">
        <div className="file-name">{fileName || 'attachment'}</div>
        <div className="file-type">{type.toUpperCase()} • Click to open / download</div>
      </div>

      <div className="file-actions">
        <a href={fileData} download={fileName} className="ghost" style={{textDecoration:'none',padding:'6px 8px'}}>Download</a>
        <a href={fileData} target="_blank" rel="noopener noreferrer" className="ghost" style={{textDecoration:'none',padding:'6px 8px'}}>Open</a>
      </div>
    </div>
  );
}