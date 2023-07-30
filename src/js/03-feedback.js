import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const inputEl = formEl.querySelector('input[name="email"]');
const textareaEl = formEl.querySelector('textarea[name="message"]');

let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

formEl.addEventListener('input', throttle(storageFormData, 500));
formEl.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (inputEl.value === '' || textareaEl.value === '') {
    return alert('Заповніть всі поля!');
  }

  console.log(formData);

  formEl.reset();
  localStorage.removeItem(LOCAL_KEY);
  formData = {};
}

function reloadPage() {
  inputEl.value = formData.email || '';
  textareaEl.value = formData.message || '';
}