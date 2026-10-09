function esc(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

// 渲染分类栏
const CATS = ['all','证件卡类','数码产品','钥匙','生活用品','书籍','其他'];
let activeCat = 'all';

function renderCats() {
  document.getElementById('cats').innerHTML = CATS.map(c =>
    `<div class="cat ${c===activeCat?'active':''}" data-cat="${c}">
      ${c==='all'?'全部':c}
    </div>`).join('');
  document.querySelectorAll('.cat').forEach(el => {
    el.onclick = () => { activeCat = el.dataset.cat; renderCats(); render(); };
  });
}

// 渲染列表 + 统计
function render() {
  const keyword = document.getElementById('keyword').value;
  const all = getAll().sort((a,b)=>b.createdAt - a.createdAt);
  const st = stats();
  document.getElementById('sOpen').textContent = st.open;
  document.getElementById('sDone').textContent = st.done;
  document.getElementById('sTotal').textContent = st.total;

  const list = filterItems(all, { keyword, category: activeCat });

  const box = document.getElementById('list');
  if (!list.length) { box.innerHTML = '<div class="empty">还没有符合条件的物品</div>'; return; }

  box.innerHTML = list.map(i => `
    <div class="card ${i.status==='done'?'done':''}" onclick="location.href='detail.html?id=${i.id}'">
      <div class="thumb">${i.type==='found'?'招领':'寻物'}</div>
      <div class="info">
        <div class="title">${esc(i.title)}
          <span class="badge ${i.type}">${i.type==='lost'?'寻物中':'招领'}</span>
          ${i.status==='done'?'<span class="badge done">已解决</span>':''}
        </div>
        <div class="meta">
          📍 ${esc(i.location)}<br>
          🕒 ${esc(i.time)}<br>
          👤 ${esc(i.publisher||'匿名')}
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById('keyword').addEventListener('input', render);
renderCats();
render();