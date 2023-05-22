export default class ScrollBox{
    constructor(params = {background: 0xffffff, size: {width: 300, height: 300}}){

        this.snap = 50;//стандартный шаг прокрутки
        this.drag_sensetive = 5;
        
        this.box = new PIXI.Container();

        this.box.background = new PIXI.Graphics().beginFill(params.background).drawRect(0, 0, params.size.width, params.size.height);

        this.box.background.alpha = params.alpha;

        this.box.show_box = new PIXI.Container();
        this.box.masker = new PIXI.Graphics().beginFill().drawRect(0, 0, params.size.width, params.size.height);

        this.box.show_box.mask = this.box.masker;

        this.box.addChild(this.box.background, this.box.show_box, this.box.masker);

        this.box.eventMode = 'static';//то же самое что interactive = true

        if (PIXI.VERSION[0] != '7') this.box.interactive = true;

        //Пробрасываем некоторые свойства класса в сам бокс
        this.box.addItem = this.addItem;
        this.box.params = this.params = params;

        this.box.on('wheel', e=>this.scrollWheel(e.deltaY))

        if (params['items']) this.constructBox();

        return this.box;
    }

    constructBox(){
        for(let key in this.params['items']){
            this.params['items'][key].y = this.box.show_box.height;
            this.box.show_box.addChild(this.params['items'][key]);
        }
    }

    addItem(name, item){
        this.params['items'][name] = item;

        this.params['items'][name].y = this.box.show_box.height;
        this.box.show_box.addChild(this.params['items'][name]);
    }

    scrollWheel(dY){
        let direct = dY/Math.abs(dY);

        if (typeof this.endY == 'undefined') this.endY  = this.box.show_box.y;

        if (this.endY - this.snap*direct > 0)return;
        if (this.endY - this.snap * direct < this.params.size.height - this.box.show_box.height)return;

        this.endY = this.endY - this.snap * direct;

        gsap.to(this.box.show_box, { duration: 0.325, y: this.endY})
    }

    startScroll(e){
        this.start_xy = {
            x: e.client.x - this.box.show_box.x,
            y: e.client.y - this.box.show_box.y
        }

        this.start_point = e.client.x + e.client.y;

        this.pointer_down = true;
    }

    trackDrag(e){
        this.move_trig = Math.abs((e.client.x + e.client.y) - this.start_point) >= this.drag_sensetive;

        this.box.move_trig = this.move_trig;

        if(!this.move_trig)return;

        
    }
}