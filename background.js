let windowId = null;

// TODO:
//   - set windowId to null when closed.
//   - focus on input field when window is focused.
function showWindow() {
  if (windowId !== null) {
    chrome.windows.update(windowId, { focused: true });
    return;
  }

  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 800,
    height: 475
  };

  options.url = 'helm.html';
  chrome.windows.create(options, (win) => {
    windowId = win.id;
  });
}

chrome.browserAction.onClicked.addListener(showWindow);
