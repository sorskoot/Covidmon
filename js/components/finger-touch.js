/// <reference path="../../deploy/wonderland.js" />

WL.registerComponent('finger-touch', {
    handedness: { type: WL.Type.Enum, default: 'left', values: ['left', 'right'] }
}, {
    init: function () {
        this.handedness = ['left', 'right'][this.handedness];
    },
    start: function () {
        this.joints = [];
        this.session = null;
        this.refSpace = null;
        this.hasPose = false;
        this.isTouching = true;
        this.touchingObjects = [];

        if (!('XRHand' in window)) {
            console.warn("WebXR Hand Tracking not supported by this browser.");
            this.active = false;
            return;
        }
        this.tipCollider = WL.scene.addObject(this.object.parent);
        this.collision = this.tipCollider.addComponent("collision");
        this.collision.collider = WL.Collider.Sphere;
        this.collision.extents[0] = .05
        this.collision.group = (1 << 1);

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
                    }
                }

                const jointName = "index-finger-tip";
                const joint = this.tipCollider;
                if (joint == null) continue;

                let jointPose = null;
                if (inputSource.hand.get(jointName) !== null) {
                    jointPose = Module['webxr_frame'].getJointPose(inputSource.hand.get(jointName), this.refSpace);
                }
                if (jointPose !== null) {
                    joint.resetTransform();
                    joint.translate([
                        jointPose.transform.position.x,
                        jointPose.transform.position.y,
                        jointPose.transform.position.z]);

                    this.touchingObjects = this.collision.queryOverlaps();
                    if(!this.isTouching && this.touchingObjects.length > 0){
                        this.isTouching = true;
                        for (let i = 0; i < this.touchingObjects.length; i++) {                            
                            let inter = this.touchingObjects[i].object.getComponent("interactable");
                            if(inter){
                                inter.interact(this);
                            }
                        }
                    }
                    
                }
            }
        }
        if (!this.hasPose) {
            this.touchingObjects = [];
            this.isTouching = false;
        }
    },

    setupVREvents: function (s) {
        s.requestReferenceSpace('local').then(function (refSpace) { this.refSpace = refSpace; }.bind(this));
        this.session = s;
    },
});