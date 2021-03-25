/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('rotation', {    
    speedX: {type: WL.Type.Float, default: 2.0},
    speedY: {type: WL.Type.Float, default: 2.0},
    speedZ: {type: WL.Type.Float, default: 2.0},
}, {

    init: function() {
        this.current=[0,0,0];
    },
    update: function(dt) {              
        this.current[0] = dt * this.speedX;
        this.object.rotateAxisAngleDegObject([1,0,0], this.current[0])

        this.current[1] = dt * this.speedY;
        this.object.rotateAxisAngleDegObject([0,1,0], this.current[1])

        this.current[2] = dt * this.speedZ;
        this.object.rotateAxisAngleDegObject([0,0,1], this.current[2])        
    },
});