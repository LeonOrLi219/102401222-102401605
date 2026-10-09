const { filterItems } = require('../js/search');

const mock = [
  { id:'1', type:'lost',  title:'校园一卡通', category:'证件卡类', location:'图书馆', description:'姓名王同学', status:'open' },
  { id:'2', type:'found', title:'白色无线耳机', category:'数码产品', location:'食堂',   description:'带充电仓',   status:'done' },
  { id:'3', type:'lost',  title:'宿舍钥匙',   category:'钥匙',    location:'操场',   description:'小熊挂件',   status:'open' },
];

test('关键词命中标题', () => {
  expect(filterItems(mock, { keyword:'一卡通' }).length).toBe(1);
});
test('关键词命中描述', () => {
  expect(filterItems(mock, { keyword:'充电仓' })[0].id).toBe('2');
});
test('按类别筛选', () => {
  expect(filterItems(mock, { category:'钥匙' })[0].id).toBe('3');
});
test('按类型筛选', () => {
  expect(filterItems(mock, { type:'found' }).length).toBe(1);
});
test('组合筛选：寻物 + 进行中', () => {
  expect(filterItems(mock, { type:'lost', status:'open' }).length).toBe(2);
});
test('空条件返回全部', () => {
  expect(filterItems(mock, {}).length).toBe(3);
});