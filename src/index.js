import Setup from './scene/setup.js';
import UI from './ui/ui.js';
import Utils from './utils/utils.js';

window.TE = { utils: new Utils(), setup: new Setup(), ui: new UI()};

TE.utils.sayHello();