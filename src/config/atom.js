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

export const markerLat = atom({
  key: 'markerLat',
  default: 1,
});
export const markerLng = atom({
  key: 'markerLng',
  default: 1,
});

export const mapLocation = atom({
  key: 'mapLocation',
  default: '위치 설정하러 가기',
});

export const previewImage = atom({
  key : 'preview',
  default : null,
})

export const detailInfor = atom({
  key : 'detailInfor',
  default : null,
})

export const selectImage = atom({
  key : 'selectImage',
  default : null,
})

export const selectDetail = atom({
  key : 'selectDetail',
  default : null,
})