/* The public pages are static; this is the only script they load.
   The contact form has no server of its own. When the content gives it a sheet
   address (`contact.<lang>.endpoint`), it posts the message to a Google Apps
   Script web app that adds it as a row in the owner's Google Sheet, and the
   visitor stays on the page. Without one, submitting hands the message to the
   visitor's own mail client. With JavaScript off the form simply does nothing
   and the address above it is still a live mailto. */
(function () {
  'use strict';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

    var data = new FormData(form);
    var name = (data.get('name') || '').toString().trim();
    var from = (data.get('email') || '').toString().trim();
    var message = (data.get('message') || '').toString().trim();

    if (form.dataset.endpoint && status) {
      save(data);
      return;
    }

    var subject = name ? name : document.title;
    var body = message + (from ? '\n\n— ' + name + ' <' + from + '>' : '');

    window.location.href = 'mailto:' + form.dataset.email +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });

  /* Post the message to the sheet. The fields are sent as a plain form body, which
     a browser sends without asking first, and the script answers {ok: true}. */
  function save(data) {
    var body = new URLSearchParams();
    ['name', 'email', 'message', 'website'].forEach(function (k) { body.append(k, (data.get(k) || '').toString()); });
    body.append('lang', document.documentElement.lang || '');
    body.append('page', location.pathname);

    button.disabled = true;
    say(form.dataset.sending);
    fetch(form.dataset.endpoint, { method: 'POST', body: body })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok) throw new Error((res && res.error) || 'not saved');
        form.reset();
        say(form.dataset.sent);
      })
      .catch(function () {
        /* Whatever went wrong, the visitor keeps what they wrote and gets the address. */
        say(form.dataset.failed + ' ');
        var a = document.createElement('a');
        a.href = 'mailto:' + form.dataset.email;
        a.textContent = form.dataset.email;
        status.appendChild(a);
      })
      .then(function () { button.disabled = false; });
  }

  function say(text) { status.textContent = text || ''; }
})();
