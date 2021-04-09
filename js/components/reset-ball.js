WL.registerComponent('reset-ball', {
    hand: {type: WL.Type.Object},
    ball:  {type: WL.Type.Object},
    physicsObject: {type: WL.Type.Object}
}, {
    start: function() {
        this.physics = this.physicsObject.getComponent('activate-physx-on-velocity');
        
        const inter = this.object.getComponent('interactable');
        inter.onInteract = this.handleInteract.bind(this);
    },
    handleInteract:function(src, interactable){
        console.log("RESET");
        this.physics.reset();
    }
});