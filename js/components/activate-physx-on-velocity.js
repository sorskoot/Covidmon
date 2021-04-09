WL.registerComponent('activate-physx-on-velocity', {
    ball: { type: WL.Type.Object },
    mat: { type: WL.Type.Material },
    targetParent: { type: WL.Type.Object }
}, {
    init: function () {
        this.hand = this.ball.parent;
        this.ballPhysics = this.ball.getComponent('ball-physics');
        this.ballPhysics.active = false;
        //this.physx = this.physxObject.getComponent('mesh');

        this.orgMaterial = this.ballPhysics.material;
        this.lastPosition = [0, 0, 0];
        this.object.getTranslationWorld(this.lastPosition);
        this.newPosition = Array.from(this.lastPosition);
    },
    start: function () {

    },
    update: function (dt) {
        if (this.ball.dropped) return;
        this.object.getTranslationWorld(this.newPosition);
        if (this.lastPosition) {
            let distance = glMatrix.vec3.distance(Array.from(this.newPosition), Array.from(this.lastPosition));
            let v = distance / dt;
            if (v > 2.5) {

                this.ball.parent = this.targetParent;
                this.ball.transformLocal.set(this.object.transformWorld);
                let direction = [];
                glMatrix.vec3.sub(direction, Array.from(this.newPosition), Array.from(this.lastPosition));
                glMatrix.vec3.normalize(direction, direction);
                let vVector = [];
                glMatrix.vec3.scale(vVector, direction, v);

                this.ballPhysics.velocity.set(vVector);
                this.ballPhysics.active = true;
                this.ball.dropped = true;
               //setTimeout(this.reset.bind(this), 5000);
                //  this.physx.addForce(vVector);

            }
        }
        // }else{
        //     this.physx.material = this.orgMaterial;
        // }
        this.lastPosition = Array.from(this.newPosition);
    },
    reset: function () {
        this.ball.parent = this.hand;
        this.ball.resetTranslationRotation();
        this.ballPhysics.active = false;
        this.ball.dropped = false;
        this.lastPosition = null;
    }
});