import Admin from "../admin/admin";

export default class Utils {
    constructor(){
        this.AdminPanel = new Admin();
    }

    sayHello(){
        console.log('%c%s', 'font-weight: bold; font-size: 15px', 'Tolmasoft Engine 5.0 beta');
    }

    drawTestRect(x = 0, y = 0, width = 50, height = 50, color = 0xffffff){
        let rect = new PIXI.Graphics();
        rect.beginFill(color);
        rect.drawRect(x, y, width, height);
        rect.endFill();

        return rect;
    }

    drawButton(text = 'Tap Me', x = 0, y = 0, width = 100, height = 30, color = 0x2980b9){
        let butt = new PIXI.Container();
        butt.addChild(this.drawTestRect(x - width / 2, y - height / 2, width, height, color));

        let tf = new PIXI.Text(text, {
            align: "center",
            fontFamily: "Tahoma",
            fill: 0xecf0f1,
            wordWrap: true,
            wordWrapWidth: width,
            breakWords: true,
            fontSize: height/2+'px'
        });

        tf.x = x - tf.width /2;
        tf.y = y - tf.height/2;

        butt.tf = tf;

        butt.addChild(tf);

        butt.eventMode = 'static';
        butt.cursor = 'pointer';

        return butt;
    }

    showWarning(text = false, stage, custom_win = false){
        if(!text || typeof text != 'string')return;
        console.warn(text);

        if(!window.warning){
            window.warning = new PIXI.Container();

            let bg = this.drawTestRect(0, 0, stage.width, stage.height, 0);

            bg.alpha = 0.7;

            window.warning.addChild(bg);
        }

        if(!custom_win){
            custom_win = new PIXI.Container();

            custom_win.tf = new PIXI.Text(text, {
                align: "center",
                fontFamily: "Tahoma",
                wordWrap: true,
                fill: 0xffffff,
                wordWrapWidth: 500,
                breakWords: true
            });

            //Тут должно проверяться наличие админ-прав
            custom_win.butt = this.drawButton('Admin Panel', stage.width / 2, stage.height / 2 + custom_win.tf.height);

            custom_win.addChild(custom_win.butt);

            custom_win.butt.on('pointertap', () => TE.utils.AdminPanel.createSetup())
            //
            

            custom_win.addChild(custom_win.tf);

            custom_win.tf.x = stage.width / 2 -  custom_win.tf.width/2;
            custom_win.tf.y = stage.height / 2 - custom_win.tf.height / 2;
        }

        

        while (window.warning.children.length > 1) window.warning.removeChildAt(1);

        window.warning.addChild(custom_win);

        

        if (!window.warning.parent)stage.addChild(window.warning);
    }

    hideWarning(){
        if (!window.warning || !window.warning.parent)return;
        window.warning.parent.removeChild(window.warning);
    }

    parseJSON(json){
        let arr = [];

        try {
            arr = JSON.parse(json);
        } catch (e) { }

        return arr;
    }

    copyJSON(json = false) {
        if (!json) return [];
        return JSON.parse(JSON.stringify(json));
    }

    loadJSON(url = false, hash = false) {
        if (!url) return false;

        if(hash)url += '?'+Math.random();

        return new Promise(function (resolve, reject) {//reject для возврата ошибок
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload =  () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(TE.utils.parseJSON(xhr.response));
                } else {
                    resolve(false);
                }
            };
            xhr.onerror = () => resolve(false);

            /*
            reject({
                status: xhr.status,
                statusText: xhr.statusText
                    }); 
            */

            xhr.send();
        });
    }
}