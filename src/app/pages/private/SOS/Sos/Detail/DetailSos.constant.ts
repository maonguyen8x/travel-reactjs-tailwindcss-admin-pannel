import Images from 'app/assets/images';

export const DATA_INFORMATION = {
  users: 'Manh hoan',
  phone: '0904024155',
  rallyPoint: '17.547060,106.150794 Bố Trạch -Quảng Bình',
  checkPoint: [
    {
      coordinate: '17.547060, 106.150794',
      location: 'Xuân Trạch, Bố Trạch, Quảng Bình, Việt Nam',
      createdAt: '2021.04.20 5:00',
    },
    {
      coordinate: '17.547060, 106.150794',
      location: 'Xuân Trạch, Bố Trạch, Quảng Bình, Việt Nam',
      createdAt: '2021.04.20 5:00',
    },
    {
      coordinate: '17.547060, 106.150794',
      location: 'Xuân Trạch, Bố Trạch, Quảng Bình, Việt Nam',
      createdAt: '2021.04.20 5:00',
    },
  ],
  finalPoint: 'Hồ Chí Minh Tây, Phúc Trạch, Bố Trạch, Quảng Bình, Việt Nam',
  status: 'Public',
  rescue: '2021.04.30 20:30',
  supporter: [
    {
      name: 'Manh Hoan',
      phone: '+84 904 024 155',
      email: 'hoan.ntt@utotechzone.com',
    },
    {
      name: 'Ngọc Nguyễn',
      phone: '+84 904 024 155',
      email: 'hoan.ntt@utotechzone.com',
    },
  ],
};

export const DATA_MESSAGE = [
  {
    avatar: Images.user.default,
    name: 'Tran Vo',
    message:
      'Ngừời gửi: Hang nguyen | +84 904 024 155Check point cuối : 7.547060, 106.150794  Bố Trạch, Quảng Bình, Việt Nam                                 ',
    createdAt: '2021.04.26 05:17',
  },
  {
    avatar: Images.food.default,
    name: 'Tran Vo',
    message:
      'Mình có thể lập nhóm cứu trợ bạn này,Mình có thể lập nhóm cứu trợ bạn này.',
    createdAt: '2021.04.26 05:17',
  },
  {
    avatar: Images.background.default,
    name: 'Tran Vo',
    message: 'Mình có thể giúp.',
    createdAt: '2021.04.26 05:17',
  },
  {
    avatar: Images.avatar_defautl.default,
    name: 'Tran Vo',
    message: 'Mình đã đến và không thấy ai cả.',
    createdAt: '2021.04.26 05:17',
  },
];
