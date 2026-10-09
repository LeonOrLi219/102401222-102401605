const { add, getAll, getById, updateItem, stats } = require('../js/storage');

beforeEach(() => localStorage.clear());

test('add 后 getAll 能读到', () => {
  add({ id:'a', title:'伞', status:'open' });
  expect(getAll().length).toBe(1);
});

test('getById 命中与未命中', () => {
  add({ id:'a', title:'伞' });
  expect(getById('a').title).toBe('伞');
  expect(getById('nope')).toBeNull();
});

test('updateItem 修改状态', () => {
  add({ id:'a', title:'伞', status:'open' });
  expect(updateItem('a', { status:'done' })).toBe(true);
  expect(getById('a').status).toBe('done');
});

test('updateItem 不存在返回 false', () => {
  expect(updateItem('nope', { status:'done' })).toBe(false);
});

test('stats 统计进行中与已完成', () => {
  add({ id:'a', status:'open' });
  add({ id:'b', status:'done' });
  const s = stats();
  expect(s.total).toBe(2);
  expect(s.open).toBe(1);
  expect(s.done).toBe(1);
});