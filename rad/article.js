/* یک صفحه برای همه‌ی مقاله‌ها: article.html?id=1 */
(function () {
    var $ = function (s) { return document.querySelector(s); };
    var DIGITS = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    var fa = function (n) { return String(n).replace(/\d/g, function (d) { return DIGITS[d]; }); };
  
    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (text != null) e.textContent = text;
      return e;
    }
  
    var list = window.ARTICLES || [];
    var id = new URLSearchParams(location.search).get('id') || 'featured';
    var a = list.filter(function (x) { return x.id === id; })[0];
  
    if (!a) {
      document.title = 'مقاله پیدا نشد | راد مدرن';
      $('#title').textContent = 'مقاله‌ای پیدا نشد';
      ['#tags', '.meta', '.hero-img', '.side', '.bottom'].forEach(function (s) { var n = $(s); if (n) n.style.display = 'none'; });
      var c = $('#content');
      var p = el('p', 'lead', 'آدرس این مقاله درست نیست یا حذف شده است. ');
      var link = el('a', null, 'بازگشت به همه مقالات');
      link.href = 'maghalat.html';
      link.style.color = 'var(--blue)';
      p.appendChild(link);
      c.appendChild(p);
      return;
    }
  
    document.title = a.title + ' | راد مدرن';
    $('#desc').setAttribute('content', a.lead.slice(0, 150));
    var ogTitle = $('#ogTitle');
    var ogDesc = $('#ogDesc');
    if (ogTitle) ogTitle.setAttribute('content', a.title + ' | راد مدرن');
    if (ogDesc) ogDesc.setAttribute('content', a.lead.slice(0, 150));
    var shareText = encodeURIComponent(a.title + ' | راد مدرن');
    var shareUrl = encodeURIComponent(window.location.href);
    var shareTelegram = $('#shareTg');
    var shareWhatsApp = $('#shareWa');
    if (shareTelegram) shareTelegram.href = 'https://t.me/share/url?url=' + shareUrl + '&text=' + shareText;
    if (shareWhatsApp) shareWhatsApp.href = 'https://wa.me/?text=' + shareText + '%20' + shareUrl;
    $('#title').textContent = a.title;
    $('#av').textContent = a.av;
    $('#author').textContent = a.author;
    $('#date').textContent = a.date;
    $('#date').setAttribute('datetime', a.iso);
    $('#read').textContent = a.read + ' دقیقه مطالعه';
    $('#readSide').textContent = a.read + ' دقیقه';
    var img = $('#heroImg');
    img.src = a.img;
    img.alt = a.title;
  
    var tags = $('#tags');
    a.tags.forEach(function (t) {
      var l = el('a', 'tag', t);
      l.href = 'maghalat.html';
      tags.appendChild(l);
    });
  
    var content = $('#content');
    content.appendChild(el('p', 'lead', a.lead));
    var n = 0;
    a.secs.forEach(function (s) {
      if (s.q) {
        var bq = el('blockquote', 'callout');
        bq.appendChild(el('p', null, s.q));
        content.appendChild(bq);
      } else {
        n++;
        content.appendChild(el('h2', null, a.num ? fa(n) + '. ' + s.h : s.h));
        (Array.isArray(s.p) ? s.p : [s.p]).forEach(function (t) { content.appendChild(el('p', null, t)); });
      }
    });
  
    // مقالات مرتبط: اول هم‌دسته، بعد بقیه
    var others = list.filter(function (x) { return x.id !== a.id; });
    var same = others.filter(function (x) { return x.cat === a.cat; });
    var rest = others.filter(function (x) { return x.cat !== a.cat; });
    var rel = $('#related');
    same.concat(rest).slice(0, 3).forEach(function (x) {
      var card = el('a', 'r-card');
      card.href = 'article.html?id=' + encodeURIComponent(x.id);
      var ico = el('span', 'r-ico', x.ico); ico.setAttribute('aria-hidden', 'true');
      card.appendChild(ico);
      card.appendChild(el('h3', null, x.title));
      card.appendChild(el('small', null, x.read + ' دقیقه مطالعه'));
      rel.appendChild(card);
    });
  })();