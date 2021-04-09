/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('hand-menu', {
    handedness: { type: WL.Type.Enum, default: 'left', values: ['left', 'right'] },
    eye: { type: WL.Type.Object }
}, {
    init: function () {
        this.handedness = ['left', 'right'][this.handedness];
    },
    start: function () {
        this.joints = [];
        this.session = null;
        this.refSpace = null;
        this.hasPose = false;
        this.viz = this.object.children[0];
        if (!('XRHand' in window)) {
            console.warn("WebXR Hand Tracking not supported by this browser.");
            this.active = false;
            return;
        }
    },
    update: function (dt) {
        if (!this.session) {
            if (WL.xrSession) this.setupVREvents(WL.xrSession);
        }
        this.hasPose = false;
        if (this.session && this.session.inputSources && this.refSpace) {
            for (let i = 0; i <= this.session.inputSources.length; ++i) {
                const inputSource = this.session.inputSources[i];
                if (!inputSource || !inputSource.hand || inputSource.handedness != this.handedness) continue;
                this.hasPose = true;
                if (inputSource.hand.get('wrist') !== null) {
                    const p = Module['webxr_frame'].getJointPose(inputSource.hand.get('wrist'), this.refSpace);
                    if (p) {
                        this.object.resetTranslationRotation();
                        this.object.transformLocal.set([
                            p.transform.orientation.x,
                            p.transform.orientation.y,
                            p.transform.orientation.z,
                            p.transform.orientation.w]);
                        this.object.translate([
                            p.transform.position.x,
                            p.transform.position.y,
                            p.transform.position.z]);
                        
                        let forward = [0, 0, 0];
                        this.object.getForward(forward);
                        let eyepos = [0, 0, 0];
                        this.eye.getTranslationWorld(eyepos);
                        let containerpos = [0,0,0];
                        this.viz.getTranslationLocal(containerpos)
                        if (glMatrix.vec3.dot(forward, eyepos) >= 1) {
                            containerpos[1] = 0;// show menu
                            
                        } else {
                            containerpos[1] = 10000;// hide menu         
                        }
                        this.viz.setTranslationLocal(containerpos);
                    }
                }
            }
        }
    },

    setupVREvents: function (s) {
        s.requestReferenceSpace('local').then(function (refSpace) { this.refSpace = refSpace; }.bind(this));
        this.session = s;
    },
});