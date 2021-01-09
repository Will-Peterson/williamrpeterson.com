// BAR CHART
  $('.chart').each(function(){
    jQuery(this).find('.chart-bar').animate({
      width:$(this).attr('data-percent')
    },2000);
  });

// PROJECTS POPUP
const openPopupButtons = document.querySelectorAll('[data-popup-target]');
const closePopupButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openPopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.popupTarget);
    openPopup(popup);
  });
});

closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

overlay.addEventListener('click', () => {
  const popups = document.querySelectorAll('.popup.active');
  popups.forEach(popup => {
    closePopup(popup);
  })
});

function openPopup(popup) {
  if (popup == null) return;
  popup.classList.add('active');
  overlay.classList.add('active');
}

function closePopup(popup) {
  if (popup == null) return;
  popup.classList.remove('active');
  overlay.classList.remove('active');
}

// FORM
window.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('portfolio-form');
    var status = document.getElementById('status');

    function success() {
      form.reset();
      status.classList.add('success');
      status.innerHTML = 'Thanks!';
    }

    function error() {
      status.classList.add('error');
      status.innerHTML = 'Oops! There was a problem.';
    }

    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }