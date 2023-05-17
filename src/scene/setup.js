export default class Setup{
    constructor(){

    }

    go(name, textures){
        TE.utils.loadJSON('./images/setup/'+name+'.json').then(e=>this.Setup(name, e, textures));
    }

    Setup(name, data, textures){
        if(!data)return TE.utils.showWarning('Setup data of bundle "' + name + '" not loaded or not finded. Please create setup data', app.stage);

        for(let key in textures){
            if (!data[key]) return TE.utils.showWarning('Setup data of "' + key + '" in bundle "' + name + '" not loaded or not finded. Please create setup data', app.stage);

            let container = new devicePixelRatio.Container();

            container = this.setupTextures(container, data[key], textures[key].textures);
        }
    }

    setupTypes(container, data){

    }

    setupText(container, data){

    }

    setupTextures(container, data, textures){
        
    }
}