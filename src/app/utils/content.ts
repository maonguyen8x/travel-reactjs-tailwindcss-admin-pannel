const handleType = (name: string) => {
  switch (name) {
    case 'CULINARY_DESTINATION':
      return 'Điểm đến ẩm thực';
    case 'TOURIST_DESTINATION':
      return 'Điểm đến du lịch';
    case 'BOOKING_ROOM':
      return 'Đặt phòng';
    case 'BOOKING_TOUR':
      return 'Đặt chuyến đi';
    default:
      return '';
  }
};

const handleCurrency = (id: number) => {
  switch (id) {
    case 1:
      return 'VND';
    case 2:
      return 'AFN';
    case 3:
      return 'ZAR';
    case 4:
      return 'BRL';
    case 5:
      return 'HUF';
    case 6:
      return 'EGP';
    case 7:
      return 'EUR';
    case 8:
      return 'OMR';
    case 40:
      return 'USD';
    default:
      return '';
  }
};
const HandleSwitchCase = {
  handleType,
  handleCurrency
};
export default HandleSwitchCase;
