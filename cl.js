// ALT — crasht wenn Ziel nicht existiert
node.classList.add('active')

// NEU — Guard
const node = document.getElementById(id);
if(!node) return;
node.classList?.add('active');
