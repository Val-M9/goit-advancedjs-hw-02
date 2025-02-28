const formData = {
  email: JSON.parse(localStorage.getItem('feedback-form-state'))?.email || '',
  message:
    JSON.parse(localStorage.getItem('feedback-form-state'))?.message || '',
};

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

email.value = formData.email;
message.value = formData.message;

const handleFormInput = (event) => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const handleSubmitForm = (event) => {
  event.preventDefault();
  const { email, message } = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (!email || !message) {
    return alert('Fill please all fields!');
  }

  console.log({ email, message });

  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
};

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleSubmitForm);
