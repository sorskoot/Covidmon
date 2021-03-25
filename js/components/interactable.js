WL.registerComponent('interactable', {
}, {
    init: function() {
       this.onInteract = null;
    },
    interact:function(src){
        if(this.onInteract){
            this.onInteract(src, this);
        }
    }
});