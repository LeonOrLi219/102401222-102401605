function esc(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

function render() {
  const all = getAll().sort((a,b)=>b.createdAt - a.createdAt);
  const st = stats();
  document.getElementById('mTotal').textContent = st.total;
  document.getElementById('mOpen').textContent = st.open;
  document.getElementById('mDone').textContent = st.done;

  const box = document.getElementById('list');
  if (!all.length) { box.innerHTML = '<div class="empty">还没有发布过信息</div>'; return; }

  box.innerHTML = all.map(i => `
    <div class="card ${i.status==='done'?'done':''}" data-id="${i.id}">
      <div class="thumb">${i.type==='found'?'招领':'寻物'}</div>
      <div class="info">
        <div class="title">${esc(i.title)}
          <span class="badge ${i.type}">${i.type==='lost'?'寻物中':'招领'}</span>
          ${i.status==='done'?'<span class="badge done">已解决</span>':''}
        </div>
        <div class="meta">📍 ${esc(i.location)} · 🕒 ${esc(i.time)}</div>
        <div style="margin-top:8px;">
          <a class="btn ghost" style="padding:4px 12px;font-size:12px;" href="detail.html?id=${i.id}">查看</a>
          ${i.status==='open' ? `<button class="btn" style="padding:4px 12px;font-size:12px;margin-left:6px;" onclick="markDone('${i.id}')">标记为已解决</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

window.markDone = function(id) {
  if (!confirm('确认标记为已解决？')) return;
  updateItem(id, { status: 'done' });
  render();
};

render();