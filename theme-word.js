document.addEventListener('DOMContentLoaded',()=>{
  const label=document.getElementById('theme-word');
  if(!label)return;
  const sync=()=>{label.textContent=document.documentElement.dataset.theme==='light'?'Light':'Dark'};
  sync();
  document.getElementById('theme-toggle')?.addEventListener('click',sync);
});
