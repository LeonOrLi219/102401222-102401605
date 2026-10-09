function esc(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

const id = new URLSearchParams(location.search).get('id');
const item = getById(id);
const box = document.getElementById('detail');
const bar = document.getElementById('bar');

function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 1500);
}

if (!item) {
  box.innerHTML = '<div class="empty">未找到该信息</div>';
  bar.style.display = 'none';
} else {
  box.innerHTML = `
    <div class="detail-img">物品图片占位</div>
    <div class="detail-block">
      <h2>${esc(item.title)}
        <span class="badge ${item.type}">${item.type==='lost'?'寻物中':'招领'}</span>
        ${item.status==='done'?'<span class="badge done">已解决</span>':''}
      </h2>
      <div class="detail-row"><div class="k">📍 地点</div><div class="v">${esc(item.location)}</div></div>
      <div class="detail-row"><div class="k">🕒 时间</div><div class="v">${esc(item.time)}</div></div>
      <div class="detail-row"><div class="k">🏷 分类</div><div class="v">${esc(item.category)}</div></div>
      <div class="detail-row"><div class="k">👤 发布者</div><div class="v">${esc(item.publisher||'匿名')}</div></div>
      <div class="detail-row" style="border:none;">
        <div class="k">📞 联系方式</div>
        <div class="v"><strong id="contactText">${esc(item.contact)}</strong></div>
      </div>
    </div>
    <div class="detail-block">
      <h2 style="font-size:15px;">物品描述</h2>
      <p style="line-height:1.7;color:#555;">${esc(item.description||'（暂无描述）')}</p>
    </div>
  `;

  // 底部操作栏
  if (item.status === 'open') {
    bar.innerHTML = `
      <button class="btn ghost" id="copyBtn" style="flex:1;">复制联系方式</button>
      <button class="btn" id="doneBtn" style="flex:1;">标记为${item.type==='lost'?'已找到':'已归还'}</button>`;
  } else {
    bar.innerHTML = `<button class="btn gray block" disabled>该信息已完成</button>`;
  }

  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) copyBtn.onclick = async () => {
    try { await navigator.clipboard.writeText(item.contact); toast('已复制到剪贴板'); }
    catch(e) { toast('复制失败，请手动复制：' + item.contact); }
  };

  const doneBtn = document.getElementById('doneBtn');
  if (doneBtn) doneBtn.onclick = () => {
    if (!confirm('确认标记为已完成？')) return;
    updateItem(item.id, { status: 'done' });
    location.reload();
  };
}