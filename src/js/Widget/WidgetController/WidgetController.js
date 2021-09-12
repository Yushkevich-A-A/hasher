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
        document.addEventListener('click', event => {
            event.preventDefault();

            if (event.target.closest('.file-wrapper')) {
                this.widget.inputFile.dispatchEvent(new MouseEvent('click'));
            }
        })

        this.widget.inputFile.addEventListener('input', event => {
            event.preventDefault();
            this.uploadFile(event);
        });

        this.worker.addEventListener('message', event => {
            console.log(event.data);
            this.widget.drawHash(event.data);
        })

    }

    uploadFile(value) {
        const { target } = value;

        const file = target.files && target.files[0];
        this.widget.inputFile.value = '';
        if (!file) {
            return;
        }

        this.worker.postMessage(file);
    }
}