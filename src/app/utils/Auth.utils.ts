import Swal from 'sweetalert2';
import moment from 'moment';

export const getTimeLogged = (currentTime: any) => {
  const getTime = moment().format();
  const subtractTime =
    moment(getTime).minutes() - moment(currentTime).minutes() >= 5;
  const compareTime = moment(currentTime).isBefore(moment(getTime));
  return subtractTime || (subtractTime && compareTime);
};

export const loggingMultipleChecks = (handleSubmit: any) => {
  const timeout = localStorage.getItem('timeout');
  const count = localStorage.getItem('lastSubmit');
  const minutes = localStorage.getItem('minutes');
  if (!timeout) {
    localStorage.setItem('timeout', '5');
  } else if (Number(count) > 4 && !!timeout) {
    if (getTimeLogged(minutes)) {
      localStorage.setItem('timeout', '5');
      localStorage.setItem('lastSubmit', '0');
    } else {
      let timerInterval: any;
      Swal.fire({
        title: 'You have logged in over the specified number of times!',
        html: 'You have to wait within <b></b> minutes.',
        timer: Number(timeout) * 60000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const regexTime = /\d+/g;
              const time: any = content?.textContent?.match(regexTime);
              localStorage.setItem('timeout', `${time?.[0]}.${time?.[1]}`);
              const b: any = content?.querySelector('b');
              if (b) {
                // @ts-ignore
                b.textContent = (Swal.getTimerLeft() / 60000).toFixed(1);
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          localStorage.clear();
        }
      });
      return;
    }
  }
  handleSubmit();
};
