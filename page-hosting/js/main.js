window.onload = function () {
  (function localFileVideoPlayerInit(global) {
    var URL = global.URL || global.webkitURL,
      displayMessage = (function displayMessageInit() {
        var node = document.querySelector('#message');

        return function displayMessage(message, isError) {
          node.innerHTML = message;
          node.className = isError ? 'error' : 'info';
        };
      }()),
      /**
       * 動画選択時に再生する
       */
      playSelectedFile = function playSelectedFileInit(event) {
        var file = event.target.files[0];
        var type = file.type;
        var videoNode = document.querySelector('video');
        var canPlay = videoNode.canPlayType(type); // 再生できる動画ファイル形式かチェック
        canPlay = (canPlay === '' ? 'no' : canPlay);

        var message = 'Can play type "' + type + '": ' + canPlay;
        var isError = canPlay === 'no';

        displayMessage(message, isError);

        if (isError) {
          return;
        }

        videoNode.src = URL.createObjectURL(file); // inputで選択した動画を再生する
      },
      inputNode = document.querySelector('input');

    if (!URL) {
      displayMessage('Your browser is not ' +
        '<a href="http://caniuse.com/bloburls">supported</a>!', true);

      return;
    }

    inputNode.addEventListener('change', playSelectedFile, false);
  }(window));

  /**
   * サムネイル画像生成用関数
   */
  function capture() {
    var cEle = document.querySelector('canvas');
    var cCtx = cEle.getContext('2d');
    var vEle = document.querySelector('video');

    cEle.width = vEle.videoWidth; // canvasの幅と高さを、動画の幅と高さに合わせる
    cEle.height = vEle.videoHeight;

    cCtx.drawImage(vEle, 0, 0); // canvasに関数実行時の動画のフレームを描画
  }

  var captureButton = document.querySelector('button');
  captureButton.addEventListener('click', capture, false);
};
