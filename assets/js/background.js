class Background {
  constructor() {
    this.state = {
      extensionWindow: null,
      extensionTab: null,
    };
  }

  generateRootUrl = () => {
    return `https://www.csdn.net`;
  };

  openAppWindow = (e) => {
    this.state.extensionWindow
      ? e && chrome.windows.update(this.state.extensionWindow, { focused: !0 })
      : chrome.windows.create({ url: e, type: "popup" }, async (e) => {
          (this.state.extensionWindow = e.id),
            (this.state.extensionTab = e.tabs[0].id);
          chrome.windows.onFocusChanged.addListener((windowId) => {}, {
            id: this.state.extensionWindow,
            windowTypes: ["popup"],
          });
          chrome.windows.update(this.state.extensionWindow, {});
        });
  };

  init = () => {
    chrome.windows.onRemoved.addListener((e) => {
      e == this.state.extensionWindow &&
        ((this.state.extensionWindow = null), (this.state.extensionTab = null));
    }),
      chrome.action.onClicked.addListener(async (e) => {
        const t = this.generateRootUrl();
        this.openAppWindow(t);
      }),
      chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
          chrome.runtime.setUninstallURL("https://chromewebstore.google.com");
        }
      }),
      chrome.runtime.onInstalled.addListener(async () => {
        (await chrome.tabs.query({ url: ["https://*.csdn.net/*"] })).forEach(
          ({ id: o }) => chrome.tabs.reload(o)
        );
      });
  };
}

new Background().init();
