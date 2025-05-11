const btn = document.getElementById('sbtn');
const form = document.getElementById('form');
const slider = document.querySelector('.slider');
const backBtn = document.getElementById('backBtn');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  btn.textContent = 'Sending...';

  const serviceID = 'service_3rf6xjl';
  const templateID = 'template_ozcnqys';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.textContent = 'Send';
      slider.style.transform = 'translateX(-100%)';
    }, (err) => {
      btn.textContent = 'Send';
      alert('Failed to send message: ' + JSON.stringify(err));
    });
});

backBtn.addEventListener('click', () => {
  slider.style.transform = 'translateX(0%)';
  form.reset();
});