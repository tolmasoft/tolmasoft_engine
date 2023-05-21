export default class Setup_Utility{
    constructor(){
        this.move_trig_coef = 5;
        this.texture_tap_trigger = false;
    }

    setupBundle() {
        if (!TE.utils.AdminPanel.bundle_part) for (let key in this.textures) if (!TE.utils.AdminPanel.setup_bundle[key]) {
            TE.utils.AdminPanel.bundle_part = key;
            TE.utils.AdminPanel.setup_bundle[key] = {};

            break;
        }


        this.drawSetupInterface();
    }

    drawSetupInterface() {
        if (!this.setup_interface) {
            this.setup_interface = new PIXI.Container();

            this.initSetupButon('textures', 50, 100, () => this.texturetapSetup());
            this.initSetupButon('components', 50, 150);
            this.initSetupButon('proteries', 50, 200);
        }

        if (!this.setup_interface.parent) app.stage.addChild(this.setup_interface);

    }

    texturetapSetup() {
        console.log('Texture button was taped');
    }

    initSetupButon(name, x, y, callback) {
        this.setup_interface[name + '_button'] = TE.utils.drawButton(name[0].toUpperCase() + name.slice(1));
        this.setup_interface[name + '_button'].x = x;
        this.setup_interface[name + '_button'].y = y;

        this.setup_interface[name + '_button'].on('pointerdown', e => {
            this.setup_interface[name + '_start_point'] = e.client.x + e.client.y;
            this.setup_interface[name + '_startxy'] = {
                x: e.client.x - this.setup_interface[name + '_button'].x,
                y: e.client.y - this.setup_interface[name + '_button'].y
            };

            this.setup_interface[name + '_trig'] = true;
        });



        app.stage.on('pointermove', (e) => {

            if (!this.setup_interface[name + '_trig']) return;

            this.setup_interface[name + '_move_trig'] = Math.abs((e.client.x + e.client.y) - this.setup_interface[name + '_start_point']) >= this.move_trig_coef;

            if (!this.setup_interface[name + '_move_trig']) return;

            this.setup_interface[name + '_button'].x = Math.max(this.setup_interface[name + '_button'].width / 2, Math.min(app.stage.width - this.setup_interface[name + '_button'].width / 2, e.client.x - this.setup_interface[name + '_startxy'].x));
            this.setup_interface[name + '_button'].y = Math.max(this.setup_interface[name + '_button'].height / 2, Math.min(app.stage.height - this.setup_interface[name + '_button'].height / 2, e.client.y - this.setup_interface[name + '_startxy'].y));
        })


        app.stage.on('pointerup', e => {
            this.setup_interface[name + '_trig'] = false;
        });

        this.setup_interface.addChild(this.setup_interface[name + '_button']);

        this.setup_interface[name + '_button'].on('pointertap', e => {
            if (!this.setup_interface[name + '_move_trig'] && callback) callback();
            this.setup_interface[name + '_move_trig'] = false;
        });
    }
}