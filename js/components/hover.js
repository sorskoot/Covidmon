/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('hover', {
    depth: {type: WL.Type.Float, default: 0.01},
    speed: {type: WL.Type.Float, default: 2.0},
}, {

    init: function() {
        this.count = Math.random() * Math.PI * 2;                      
    },
    update: function(dt) {      
        if(!this.count) return;
        if(!this.y){
            let p = [];
            this.object.getTranslationLocal(p);  
            this.y = p[1];
        }
        this.count += dt * this.speed;        
        if(this.count > Math.PI*2){
            this.count -= Math.PI*2;
        }        
        let orgPosition = [];
        this.object.getTranslationLocal(orgPosition);     
        this.object.setTranslationLocal(
            [orgPosition[0],             
            this.y+(Math.sin(this.count) * this.depth),
            orgPosition[2]]);
    },
});