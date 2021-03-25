/// <reference path="../../deploy/wonderland.js" />
WL.registerComponent('random-object', {    
    mesh: {type: WL.Type.Mesh, default: null},
    material: {type: WL.Type.Material, default: null}
}, {
    start: function() {
        const inter = this.object.getComponent('interactable');
        inter.onInteract = this.handleInteract.bind(this);
    },
    handleInteract:function(src, interactable){
        let obj = WL.scene.addObject();
        let m = obj.addComponent('mesh');
        m.mesh = this.mesh;
        m.material = this.material;
        obj.scale([.2,.2,.2]);
        obj.setTranslationWorld([Math.random()*2-1, Math.random() + .5, Math.random()*2-1]);
    }
});