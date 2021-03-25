/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('virus', {
    top: { type: WL.Type.Mesh, default: null },
    stem: { type: WL.Type.Mesh, default: null },
    sphere: { type: WL.Type.Mesh, default: null },
    materialBase: { type: WL.Type.Material },    
    spikes: {type: WL.Type.Int, default: 128}
}, {
    init: function () {
        // add sphere
        const randomDiameter = Math.random() / 8 + .125;
        const stemLength = Math.random()/4+.25;
        const topDiameter = Math.random()/4+.25;

        const sphere =  WL.scene.addObject(this.object);
        
        sphere.scale([randomDiameter,randomDiameter,randomDiameter]);
        const sphereMesh = sphere.addComponent('mesh');
        sphereMesh.mesh = this.sphere;

        sphereMesh.material = this.materialBase.clone();
        sphereMesh.material.diffuseColor = [.5,.5,.5,1];

        const stemMaterial = this.materialBase.clone();
        stemMaterial.diffuseColor = [.7,.3,.3,1];

        const topMaterial = this.materialBase.clone();
        topMaterial.diffuseColor = [1,.1,.1,1];

        const objects = WL.scene.addObjects(this.spikes*2, this.object, 1);
        for (let i = 0; i < this.spikes; i+=2) {
            const newStem = objects[i];
            const randomY = (i/16) * 22.5; //Math.random() * 360;
            const randomZ = (i/16 + i%16) * 22.5; //Math.random() * 360;
            
            newStem.rotateAxisAngleDeg([0,1,0], randomY);
            newStem.rotateAxisAngleDeg([0,0,1], randomZ);            
            newStem.translateObject([0,0,-randomDiameter]);
            newStem.scale([.5,.5,stemLength]);
            let newStemMesh = newStem.addComponent('mesh');
            newStemMesh.mesh=this.stem;
            newStemMesh.material = stemMaterial;

            const newTop = objects[i+1];
            
            newTop.rotateAxisAngleDeg([0,1,0], randomY);
            newTop.rotateAxisAngleDeg([0,0,1], randomZ);
            newTop.translateObject([0,0,-randomDiameter +.01 ]);
            newTop.scale([topDiameter,topDiameter,stemLength]);
            let newTopMesh = newTop.addComponent('mesh');
            newTopMesh.mesh=this.top;
            newTopMesh.material = topMaterial;
        }

    },    
    update: function (dt) {
        
    },
});