import { atom } from 'recoil';

export const plantState = atom({
  key: 'plantState',
  default: '토마토',
});

export const plantImage = atom({
  key: 'plantImage',
  default: 'https://cdn-icons-png.flaticon.com/128/877/877712.png',
});

export const plantDescription = atom({
  key: 'plantDescription',
  default: [
    "잿빛곰팡이병",
    "목화진딧물",
    "탄저병",
    "작은뿌리파리",
    "흰가루병",
    "점박이응애",
    "꽃노랑총채벌레",
    "파밤나방"
  ]
});