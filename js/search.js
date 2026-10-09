function filterItems(items, opt) {
  const { keyword = '', category = 'all', type = 'all', status = 'all' } = opt || {};
  const kw = keyword.trim().toLowerCase();
  return items.filter(it => {
    const hitKw = !kw ||
      (it.title || '').toLowerCase().includes(kw) ||
      (it.description || '').toLowerCase().includes(kw) ||
      (it.location || '').toLowerCase().includes(kw);
    const hitCat = category === 'all' || it.category === category;
    const hitType = type === 'all' || it.type === type;
    const hitStat = status === 'all' || it.status === status;
    return hitKw && hitCat && hitType && hitStat;
  });
}

if (typeof module !== 'undefined') module.exports = { filterItems };