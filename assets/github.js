/* The studio's way back into the repository.
 *
 * GitHub's REST API answers CORS from a browser, so the writing desk can commit
 * assets/content.js — and upload a figure into images/ — straight from a phone,
 * with no server in between. A workflow (.github/workflows/build.yml) picks the
 * commit up and rebuilds the eight pages.
 *
 * The token is a fine-grained personal access token scoped to this one
 * repository with Contents: Read and write, and it lives in this browser's
 * localStorage — per device, never committed, never sent anywhere but
 * api.github.com. Anyone holding the unlocked device holds the token, so give
 * it an expiry and revoke it if the device goes missing.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SiteGitHub = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var REPO = { owner: 'hyunhoonj', repo: 'hyunhoonj.github.io', branch: 'main' };
  var TOKEN_KEY = 'personal-site:token';
  var API = 'https://api.github.com';

  function token() {
    try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; }
  }
  function setToken(value) {
    try {
      if (value) localStorage.setItem(TOKEN_KEY, value);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (e) { /* private browsing — the token just will not persist */ }
  }
  function hasToken() { return !!token(); }

  function headers(extra) {
    var h = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': 'Bearer ' + token()
    };
    if (extra) Object.keys(extra).forEach(function (k) { h[k] = extra[k]; });
    return h;
  }

  function contentsUrl(path) {
    return API + '/repos/' + REPO.owner + '/' + REPO.repo + '/contents/' +
      path.split('/').map(encodeURIComponent).join('/');
  }

  function request(url, init) {
    return fetch(url, init).then(function (res) {
      return res.json().catch(function () { return null; }).then(function (body) {
        if (res.ok) return body;
        var err = new Error((body && body.message) || (res.status + ' ' + res.statusText));
        err.status = res.status;
        throw err;
      });
    });
  }

  /* btoa only speaks latin-1, so text has to become bytes first. Chunked
     because a figure is far past the argument limit of String.fromCharCode. */
  function bytesToBase64(bytes) {
    var out = '';
    for (var i = 0; i < bytes.length; i += 0x8000) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(out);
  }
  function encodeText(text) { return bytesToBase64(new TextEncoder().encode(text)); }

  /* The blob sha of a path, or null if it is not there yet. */
  function sha(path) {
    return request(contentsUrl(path) + '?ref=' + encodeURIComponent(REPO.branch), {
      headers: headers(), cache: 'no-store'
    }).then(function (json) {
      return json && json.sha;
    }).catch(function (err) {
      if (err.status === 404) return null;
      throw err;
    });
  }

  /* Writes and returns the new blob sha. Passing the sha we read makes GitHub
     reject the write if someone else moved the file underneath us. */
  function put(path, base64, message, prevSha) {
    var body = { message: message, content: base64, branch: REPO.branch };
    if (prevSha) body.sha = prevSha;
    return request(contentsUrl(path), {
      method: 'PUT',
      headers: headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body)
    }).then(function (json) { return json && json.content && json.content.sha; });
  }

  function putText(path, text, message, prevSha) {
    return put(path, encodeText(text), message, prevSha);
  }

  function putFile(path, file, message) {
    return file.arrayBuffer().then(function (buf) {
      return put(path, bytesToBase64(new Uint8Array(buf)), message, null);
    });
  }

  return {
    REPO: REPO,
    token: token, setToken: setToken, hasToken: hasToken,
    sha: sha, put: put, putText: putText, putFile: putFile, encodeText: encodeText
  };
});
