import SetupUtility from './setuputility.js';

export default class Admin{
    constructor(){
        this.bundle_parts = [];

        this.setup = new SetupUtility();
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