WL.registerComponent('reset-ball', {
    hand: {type: WL.Type.Object},
    ball:  {type: WL.Type.Object}
}, {
    start: function() {
        const inter = this.object.getComponent('interactable');
        inter.onInteract = this.handleInteract.bind(this);
    },
    handleInteract:function(src, interactable){
         
    }
});