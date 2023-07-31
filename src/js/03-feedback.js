import throttle from 'lodash.throttle';

const FEEDBACK_FORM_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const formData = {};

formEl.addEventListener('input', throttle(storageFormData, 500));
formEl.addEventListener('submit', onFormSubmit);

onLoad();

function storageFormData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (e.target.elements.email.value === '' || e.target.elements.message.value === '') {
    return alert('Заповніть всі поля!');
  }

  console.log(formData);

  formEl.reset();
  localStorage.removeItem(FEEDBACK_FORM_KEY);
  Object.keys(formData).forEach((key) => {
    formData[key] = '';
  });
}

function onLoad() {
  try {
    const data = localStorage.getItem(FEEDBACK_FORM_KEY);
    if (!data) {
      return;
    }
    const currentStorage = JSON.parse(data);
    Object.entries(currentStorage).forEach(([key, value]) => {
      formEl.elements[key].value = value;
      formData[key] = value;
    });
  } catch (error) {
    console.log(error.message);
  }
}
