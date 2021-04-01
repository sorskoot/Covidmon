WL.registerComponent('ball-physics', {
    bounciness: {type: WL.Type.Float, default: 0.5},
    weight: {type: WL.Type.Float, default: 1.0}
}, {
    init: function() {        
        this.pos = new Float32Array(3);
        this.velocity = new Float32Array(3);
        this.floorHeight=0;       
    },
    start:function(){
        this.collision = this.object.getComponent('collision', 0);
        if(!this.collision) {
            console.warn("'ball-physics' component on object", this.object.name, "requires a collision component");
        }
    },
    onCollision:function(object){

    },
    update: function(dt) {
        if(!this.collision) return;
        /* Remember the last position */
        this.object.getTranslationWorld(this.pos);

        let overlaps = this.collision.queryOverlaps();
        if(overlaps.length>0){
            this.onCollision(overlaps[0].object)
            this.active = false;        
            return;
        }
        /* Don't fall through the floor */
        if(this.pos[1] <= this.floorHeight + this.collision.extents[0]) {
            if(Math.abs(this.velocity[0]) <= 0.001) {
                this.velocity[1] = 0;
            } else {
                /* bounce */
                this.velocity[1] *= -this.bounciness;
            }
            /* friction */
            this.velocity[0] *= 0.5;
            this.velocity[2] *= 0.5;
        }

        if(Math.abs(this.velocity[0]) <= 0.01 &&
           Math.abs(this.velocity[1]) <= 0.01 &&
           Math.abs(this.velocity[2]) <= 0.01)
        {
            /* Deactivating this object preserves performance,
             * update() will no longer be called */
            this.active = false;
            return;
        }

        /* Apply velocity to position */
        const tmp = [0, 0, 0];
        const quat = [0, 0, 0, 0];
        glMatrix.vec3.scale(tmp, this.velocity, dt);
        if(this.object.parent) {
            glMatrix.quat.conjugate(quat, this.object.parent.transformWorld);
            glMatrix.vec3.transformQuat(tmp, tmp, quat);
        }
        this.object.translate(tmp);

        /* Apply gravity to velocity */
        this.velocity[1] -= this.weight*9.81*dt;
    },
});