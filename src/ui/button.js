export default class Button{
    constructor(frames){//frames are textures
        let button = new PIXI.Container();

        button.eventMode = 'static';
        button.cursor = 'pointer';

        button.default = PIXI.Sprite.from(frames[0]);
        button.active = PIXI.Sprite.from(frames[1]);

        button.addChild(button.default, button.active);

        button.active.visible = false;

        let change = ()=>{
            button.active.visible = !button.active.visible; 
            button.default.visible = !button.default.visible;
        }


        button.on('pointerover', change);
        button.on('pointerout', change);

        return button;
    }
}