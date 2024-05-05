class Content {
  constructor() {}

  init() {
    const contentViews = document.querySelector("#content_views");
    if (contentViews?.id) contentViews.id = null;
    document
      .querySelectorAll(".hljs-button.signin.active")
      .forEach((copyBtn) => {
        copyBtn.dataset.title = "复制代码";
        copyBtn.title = "复制代码";
        copyBtn.addEventListener(
          "click",
          (e) => {
            const range = document.createRange();
            const code = e.target.parentNode;
            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            try {
              const result = document.execCommand("copy");
              if (result) {
                copyBtn.dataset.title = "复制成功✔";
              }
            } catch (err) {
              console.error(err);
            }

            window.getSelection().removeAllRanges();
            e.stopImmediatePropagation();
          },
          true
        );

        copyBtn.addEventListener(
          "mouseout",
          (e) => {
            copyBtn.dataset.title = "复制代码";
            e.stopImmediatePropagation();
          },
          true
        );
      });

    document.addEventListener(
      "copy",
      (e) => {
        e.stopImmediatePropagation();
      },
      true
    );

    document.querySelectorAll(".hide-preCode-bt").forEach((e) => {
      e.click();
    });

    const loginBox = document.querySelector(".passport-login-box");
    const closeImg = loginBox?.querySelector("img");
    closeImg?.click();

    document.querySelectorAll("a").forEach((e) => {
      e.target = "_self";
    });

    document.querySelectorAll(".vip").forEach((e) => {
      e.style.display = "none";
    });
  }
}

new MutationObserver(new Content().init).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});
