// Nur noch 2 Files checken statt 5
const files = ['sli/ready.on', 'js.ctrl.ler/raid.scsi.sli.ready'];
Promise.all(files.map(f=>fetch(f).then(r=>r.text()))).then(([a,b])=>{
  const ok = a.includes('ready') && b.includes('raid=ready') && b.includes('scsi=ready') && b.includes('sli=ready');
  if(ok) log('🛗 Alle 3 Drives ready · Corridor offen · 729 Sektoren');
});
