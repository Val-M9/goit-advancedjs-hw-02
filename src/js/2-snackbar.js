import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  delay: document.querySelector('.delay'),
  radioBtns: document.querySelectorAll('.radio-btn'),
  submitBtn: document.querySelector('.submit-btn'),
};

const showMessage = (formStatus, delay = 0) => {
  switch (formStatus) {
    case 'required':
      return iziToast.warning({
        title: 'Error',
        message: 'Please fill in all fields',
        position: 'topRight',
        transitionIn: 'fadeInDown',
        resetOnHover: true,
      });
    case 'fulfilled':
      return iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInDown',
        resetOnHover: true,
      });
    case 'rejected':
      return iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInDown',
        resetOnHover: true,
      });
    default:
      return;
  }
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const delay = Number(refs.delay.value);
  const checkedRadio = [...refs.radioBtns].find((radio) => radio.checked);

  if (!checkedRadio || !delay) {
    return showMessage('required');
  }

  const formStatus = checkedRadio.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formStatus === 'fulfilled') {
        resolve(formStatus);
      } else {
        reject(formStatus);
      }
    }, delay);
  });

  return promise
    .then((value) => showMessage(value, delay))
    .catch((error) => showMessage(error, delay));
};

refs.submitBtn.addEventListener('click', onFormSubmit);
