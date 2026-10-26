function isLegit(name){
  const legitList = ['1.nen.html','eye.md','9.md','ecke.md','dia.html','org.html','ID.html',...];
  const stored = JSON.parse(localStorage.getItem('stage-reich-v1')||'{}');
  return stored[name] || legitList.includes(name);
}
