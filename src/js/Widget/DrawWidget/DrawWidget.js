export default class DrawWidget {
    constructor(element) {
        this.element = element;
        this.mode = 'MD5';

        this.defaultHashValue = 'XXXXXXXXXXXXXXXX';
        this.init();
    }

    init() {
        this.drawWidget();
    }

    drawWidget() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('widget-wrapper');
        this.wrapper.innerHTML = `<div class="widget">
        <div class="block-hasher">
          <div class="block-hasher-input">
            <h1 class="block-hasher_title">Hasher</h1>
            <div class="block-input-file">
              <div class="block-input">
                <input type="file" class="input input_file">
              </div>
              <div class="file-wrapper">
                <p class="file-wrapper_text">Drop file here</p>
                <p class="file-wrapper_text">or</p>
                <p class="file-wrapper_text">Click to select</p>
              </div>
            </div>
          </div>
          <div class="block-hasher-mode">
            <div class="block-mode-info">
              <span class="block-hasher-algorithm">Hash algorithm:</span>
              <div class="selected-mode">MD5</div>
            </div>
            <ul class="mode-list disable">
              <li class="mode-item">MD5</li>
              <li class="mode-item">SHA1</li>
              <li class="mode-item">SHA256</li>
              <li class="mode-item">SHA512</li>
            </ul>
          </div>
        </div>
        <div class="block-calculated-hash">
          <h2 class="block-calculated-hash_title">
            Calculated Hash
          </h2>
          <p class="block-calculated-hash-result"></p>
        </div>
      </div>`;
      this.element.appendChild(this.wrapper);
      this.blockCalculatedHashResult = this.wrapper.querySelector('.block-calculated-hash-result');
      this.blockCalculatedHashResult.textContent = this.defaultHashValue;

      this.modeList = this.wrapper.querySelector('.mode-list');
      this.inputFile = this.wrapper.querySelector('.input_file');
      this.fileWrapper = this.wrapper.querySelector('.file-wrapper');
    }

    drawHash(data) {
        this.blockCalculatedHashResult.textContent = data;
    }
}