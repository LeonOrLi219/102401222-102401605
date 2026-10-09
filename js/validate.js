const CATEGORIES = ['证件卡类', '数码产品', '钥匙', '生活用品', '书籍', '其他'];

function validatePublish(data) {
  const errors = [];
  if (!data.title || !data.title.trim()) errors.push('请填写物品名称');
  else if (data.title.length > 30) errors.push('物品名称不能超过30字');
  if (!data.category) errors.push('请选择物品分类');
  if (!data.location || !data.location.trim()) errors.push('请填写丢失/拾取地点');
  if (!data.time) errors.push('请选择时间');
  if (!data.contact || !data.contact.trim()) errors.push('请填写联系方式');
  return { valid: errors.length === 0, errors };
}

if (typeof module !== 'undefined') {
  module.exports = { validatePublish, CATEGORIES };
}