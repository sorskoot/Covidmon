WL.registerComponent('capture-virus', {
    weight: { type: WL.Type.Float, default: 1.0 }
}, {
    init: function () {
        console.log('Gotta catch them all!')
    },
    start: function () {
    },
    onCollision: function (object) {     
        let virus = object.getComponent('virus');   
        let catchRate = Math.random()*255;
        // virus.hp = 255;
        // let catchValue = ((3*virus.hp - 2*virus.hp) * (catchRate * 1) / (3*virus.hp)) * 1;
         let cought = catchRate*1; //1048560 / Math.sqrt(Math.sqrt(16711680 / catchValue));

        if(128 > cought) {
            object.destroy();            
        }else{
           this.object.translate([0,-1000,0]);
        }
        //CatchValue = (((3 *MaxHP - 2*HP ) * (Catch Rate * Ball Modifier ) / (3 * Max HP) ) * Status Modifier        
    },
    update: function (dt) {
        if (!this.ballPhysics) {
            this.ballPhysics = this.object.getComponent('ball-physics');
            this.ballPhysics.onCollision = this.onCollision.bind(this);
        }
    },
});