// ALT — jedes Mal neues Array = Log geht verloren
function getSharedLog(){ return [] }

// NEU — gleiche Referenz, wie du es im Log geschrieben hast
window._sharedLog = window._sharedLog || [];
function getSharedLog(){ return window._sharedLog; }
