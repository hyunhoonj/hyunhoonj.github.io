/* The public pages are static; this is the only script they load.
   The contact form has no server behind it — the design says so out loud
   ("내용은 메일로만 전달되고 저장되지 않습니다"), so submitting hands the
   message to the visitor's own mail client. With JavaScript off the form
   simply does nothing and the address above it is still a live mailto. */
(function () {
  'use strict';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

    var data = new FormData(form);
    var name = (data.get('name') || '').toString().trim();
    var from = (data.get('email') || '').toString().trim();
    var message = (data.get('message') || '').toString().trim();

    var subject = name ? name : document.title;
    var body = message + (from ? '\n\n— ' + name + ' <' + from + '>' : '');

    window.location.href = 'mailto:' + form.dataset.email +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
})();
