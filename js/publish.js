document.getElementById('time').value = new Date().toISOString().slice(0,10);

document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault();
  const data = {
    type: document.getElementById('type').value,
    title: document.getElementById('title').value,
    category: document.getElementById('category').value,
    location: document.getElementById('location').value,
    time: document.getElementById('time').value,
    description: document.getElementById('description').value,
    contact: document.getElementById('contact').value,
    publisher: document.getElementById('publisher').value || '匿名'
  };
  const { valid, errors } = validatePublish(data);
  const errBox = document.getElementById('error');
  if (!valid) { errBox.textContent = errors.join('；'); return; }
  errBox.textContent = '';

  const item = Object.assign({}, data, {
    id: String(Date.now()),
    status: 'open',
    createdAt: Date.now()
  });
  add(item);
  location.href = 'detail.html?id=' + item.id;
});