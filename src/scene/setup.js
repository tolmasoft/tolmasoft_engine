export default class Setup{
    constructor(){
        this.layers = [];
        this.containers = {};
    }

    go(name, textures){
        TE.utils.AdminPanel.textures = textures;

        return new Promise(function (resolve, reject){
            TE.utils.loadJSON('./images/setup/' + name + '.json').then(e => {
                let result = TE.setup.Setup(name, e, textures);

                if(result){
                    resolve(result)
                }else{
                    reject('error of setup ' + name)
                }

                TE.utils.AdminPanel.bundle_name = name;
            })
        })
    }

    Setup(name, data, textures){
        if(!data)return TE.utils.showWarning('Setup data of bundle "' + name + '" not loaded or not finded. Please create setup data', app.stage);

        let BASE_container = new PIXI.Container();

        for(let key in textures){
            if (!data[key]){
                TE.utils.AdminPanel.bundle_part = key;

                return TE.utils.showWarning('Setup data of "' + key + '" in bundle "' + name + '" not loaded or not finded. Please create setup data', app.stage);
            }

            let container = new PIXI.Container();

            container = this.setupTextures(container, data[key], textures[key].textures);

            this.setupLayers(container);

            BASE_container[key] = container;

            BASE_container.addChild(container);
        }

        return BASE_container;
    }

    setupLayers(container){
        for (let key in this.layers) container.addChild(this.layers[key]);
    }

    setupType(container, data, textures, sprite){
        switch (data.type) {
            case "Button":
                sprite.active_button = PIXI.Sprite.from(textures[data.texture[1]]);

                sprite.addChild(sprite.active_button);
                sprite.active_button.visible = false;

                sprite.eventMode = 'static';
                sprite.cursor = 'pointer';

                sprite.on('pointerover', () => sprite.active_button.visible = true != sprite.children[0].visible);
                sprite.on('pointerout', () => sprite.children[0].visible = true != sprite.active_button.visible);
                break;
        
            default://Sprite

                break;
        }

        return container;
    }

    setupText(container, data){

    }

    setupTextures(container, data, textures){
        //тут разделяем типы на анимации/обычные текстуры

        //дальше только для обычных текстуры

        this.layers = [];

        for(let key in data){
            let spr = typeof data[key].texture == 'string' ? PIXI.Sprite.from(textures[data[key].texture]) : PIXI.Sprite.from(textures[data[key].texture[0]]);//проверяем массив текстур или одна

            if (textures[data[key].name]) container[textures[data[key].name]] = spr;//если нужно задать четкое имя - задаем

            //инициализация основных параметров
            spr.x = data[key].position.x;
            spr.y= data[key].position.y;

            spr.scale.x = spr.scale.y =  data[key].position.scale;

            spr.alpha = data[key].position.alpha;

            spr.visible = data[key].visible;

            //применяем основные свойства
            container = this.setupType(container, data[key], textures, spr);

            //тут рисуем маску

            this.layers[data[key].layer] = spr;
        }

        return container;
    }

    
}