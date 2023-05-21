import {TextInput, ScrollBox, Button, } from '@pixi/ui';
import Setup_Utility from './setup_utility';

export default class Admin{
    constructor(){
        this.bundle_parts = [];

        this.setup = new Setup_Utility();
    }


    createSetup(){
        TE.utils.hideWarning();

        //тут анализируем что именно мы должны засетапить
        this.setup_bundle = TE.utils.loadJSON('./images/setup/' + this.bundle_name + '.json', true).then(data=>{
            if (!data) this.setup_bundle = {};

            this.setup.setupBundle();

        })
    }

    
}