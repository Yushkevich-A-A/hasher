import DrawWidget from "./DrawWidget/DrawWidget";
import WidgetController from "./WidgetController/WidgetController";
import Worker from './WebWorker/web.worker.js';

const widget = new DrawWidget(document.body);
const worker = new Worker();
const controllerWidget = new WidgetController(widget, worker);

