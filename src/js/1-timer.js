import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let userSelectedDate = null;

const errorMessage = () => {
  return iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
    transitionIn: 'fadeInDown',
    resetOnHover: true,
  });
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.start.disabled = true;
      errorMessage();
      return;
    }

    userSelectedDate = selectedDates[0].getTime();
    refs.start.disabled = false;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => {
  return value < 10 ? value.toString().padStart(2, 0) : value;
};

flatpickr(refs.input, flatpickrOptions);

refs.start.addEventListener('click', () => {
  refs.start.disabled = true;
  refs.input.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const timer = userSelectedDate - currentDate;

    if (timer <= 0) {
      clearInterval(timerId);
      Object.entries(refs).forEach(([key, element]) => {
        if (key === 'input' || key === 'start') return;
        element.textContent = addLeadingZero(0);
      });
      return;
    }

    const timeData = convertMs(timer);

    Object.entries(refs).forEach(([key, element]) => {
      if (key === 'input' || key === 'start') return;
      element.textContent = addLeadingZero(timeData[key]);
    });
  }, 1000);
});
