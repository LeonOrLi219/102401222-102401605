const { validatePublish } = require('../js/validate');

test('空表单应报错', () => {
  expect(validatePublish({}).valid).toBe(false);
});
test('完整表单应通过', () => {
  const r = validatePublish({ title:'伞', category:'生活用品', location:'图书馆', time:'2026-10-09', contact:'QQ123' });
  expect(r.valid).toBe(true);
});
test('名称超30字应报错', () => {
  const r = validatePublish({ title:'a'.repeat(31), category:'生活用品', location:'x', time:'2026-10-09', contact:'y' });
  expect(r.valid).toBe(false);
});