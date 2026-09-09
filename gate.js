/* 站点密码门 v2 —— 使用浏览器原生 crypto.subtle (Web Crypto API)
   适用：GitHub Pages (强制HTTPS) / 现代浏览器（Chrome 37+, Edge, Firefox 34+, Safari 10.1+）
   验证：SHA-256(盐+密码) 与预存哈希比对，通过后写 sessionStorage（本会话免重复输入） */
(function () {
  var SALT = "xhc-site-gate-v1:";
  var HASH = "fef47222d45126737bd72993fbfcb12046b4e6af801e02e4227dd2c927db0b81";

  if (sessionStorage.getItem("site-gate-ok") === "1") { return; }

  function sha256hex(str) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function gate() {
    var css = document.createElement("style");
    css.textContent =
      ".gate-mask{position:fixed;inset:0;z-index:99999;background:#0f172a;display:flex;align-items:center;justify-content:center;font-family:'PingFang SC','Microsoft YaHei',sans-serif}" +
      ".gate-card{background:#1e293b;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:36px 34px;width:320px;max-width:88vw;box-shadow:0 20px 60px rgba(0,0,0,.5)}" +
      ".gate-card h1{color:#e2e8f0;font-size:20px;margin:0 0 6px;font-weight:600}" +
      ".gate-card p{color:#94a3b8;font-size:13px;margin:0 0 22px}" +
      ".gate-card input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px 12px;color:#e2e8f0;font-size:15px;outline:none;margin-bottom:10px}" +
      ".gate-card input:focus{border-color:#4f6ef7}" +
      ".gate-card button{width:100%;background:#4f6ef7;border:none;border-radius:8px;color:#fff;font-size:15px;padding:10px;cursor:pointer;font-weight:600}" +
      ".gate-card button:hover{background:#3b5ae0}" +
      ".gate-err{color:#f87171;font-size:13px;min-height:18px;margin-bottom:6px;text-align:center}";
    document.head.appendChild(css);

    var mask = document.createElement("div");
    mask.className = "gate-mask";
    mask.innerHTML =
      '<div class="gate-card">' +
      "<h1>🔒 本站需要密码访问</h1>" +
      "<p>请输入访问密码</p>" +
      '<input id="gate-pw" type="password" placeholder="访问密码" autofocus>' +
      '<div class="gate-err" id="gate-err"></div>' +
      '<button id="gate-go">进入网站</button>' +
      "</div>";
    document.body.appendChild(mask);

    var input = document.getElementById("gate-pw");
    input.focus();

    function tryPw() {
      var v = input.value;
      if (!v) { input.focus(); return; }
      sha256hex(SALT + v).then(function (h) {
        if (h === HASH) {
          sessionStorage.setItem("site-gate-ok", "1");
          mask.remove(); css.remove();
        } else {
          document.getElementById("gate-err").textContent = "密码错误，请重试";
          input.value = "";
          input.focus();
        }
      });
    }
    document.getElementById("gate-go").onclick = tryPw;
    input.onkeydown = function (e) { if (e.key === "Enter") tryPw(); };
  }

  if (!(window.crypto && crypto.subtle && window.TextEncoder)) {
    /* 浏览器过旧不支持 Web Crypto —— 概率极低（GitHub Pages 是 HTTPS）。
       显示提示而非降级到不可靠实现。 */
    document.addEventListener("DOMContentLoaded", function () {
      document.title = "浏览器版本过低";
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#e2e8f0;font-family:sans-serif;text-align:center;padding:20px">' +
        '<div><h2>🔒 浏览器版本过低</h2><p style="color:#94a3b8">本站需要现代浏览器（Chrome / Edge / Firefox / Safari 近期版本）访问。<br>请升级浏览器后重试。</p></div></div>';
    });
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", gate);
  } else { gate(); }
})();
