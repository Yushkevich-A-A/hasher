export default class WidgetController {
  constructor(widget, worker) {
    this.widget = widget;
    this.worker = worker;
    this.init();
  }

  init() {
    this.listeners();
  }

  listeners() {
    document.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.closest('.file-wrapper')) {
        this.widget.inputFile.dispatchEvent(new MouseEvent('click'));
      }

      if (event.target.closest('.selected-mode')) {
        this.widget.openModeList();
        return;
      }

      if (event.target.closest('.mode-item')) {
        const item = event.target.closest('.mode-item');
        this.widget.selectionMode(item.textContent);
        this.worker.postMessage({
          type: 'mode',
          mode: item.dataset.mode,
        });
      }

      this.widget.closeModeList();
    });

    document.addEventListener('dragover', (event) => {
      event.preventDefault();
      this.widget.fileWrapperActivate();
      this.widget.closeModeList();
    });

    document.addEventListener('dragleave', (event) => {
      event.preventDefault();
      if (event.relatedTarget === null) {
        this.widget.fileWrapperDisactivate();
        this.widget.closeModeList();
      }
    });

    document.addEventListener('drop', (event) => {
      event.preventDefault();
      if (event.target.closest('.file-wrapper')) {
        this.uploadFile({ target: event.dataTransfer });
      }

      this.widget.fileWrapperDisactivate();
      this.widget.closeModeList();
    });

    this.widget.inputFile.addEventListener('input', (event) => {
      event.preventDefault();
      this.uploadFile(event);
    });

    this.worker.addEventListener('message', (event) => {
      if (event.data.type === 'error') {
        return;
      }

      this.widget.drawHash(event.data);
    });
  }

  uploadFile(value) {
    const { target } = value;

    const file = target.files && target.files[0];
    this.widget.inputFile.value = '';
    if (!file) {
      return;
    }

    this.worker.postMessage({
      type: 'file',
      file,
    });
  }
}
