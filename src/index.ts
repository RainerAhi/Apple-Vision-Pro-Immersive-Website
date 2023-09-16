import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    BloomPlugin,
    DiamondPlugin,
    mobileAndTabletCheck,
    GammaCorrectionPlugin,

    // addBasePlugins,
    CanvasSnipperPlugin,
    MeshStandardMaterial2,
    Color,
    AssetImporter,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false,
    })

    const isMobile = mobileAndTabletCheck()
    console.log(isMobile)

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target
    const exitButton = document.querySelector(".button--exit") as HTMLElement
    const customizerInterface = document.querySelector(".customizer--container") as HTMLElement

    // Add a popup(in HTML) with download progress when any asset is downloading.
    // await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(BloomPlugin)
    await viewer.addPlugin(DiamondPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    //LOADER
    const importer = manager.importer as AssetImporter

    importer.addEventListener("onProgress", (event) => {
        const progressRatio = (event.loaded / event.total)
        console.log(progressRatio)
        document.querySelector('.progress')?.setAttribute('style', `transform: scaleX(${progressRatio})`)
    })

    importer.addEventListener("onLoad", (event) => {
        gsap.to('.loader', {opacity: 0, delay: 1, onComplete: () =>{
            document.body.style.overflowY = 'auto'
        }})
    })

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    // Import and add a GLB file.
    await viewer.load("./assets/vision.glb")

    console.log(viewer.scene.modelObject.position)

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

    if(isMobile) {
        position.set(9.32, 0.523, 0.2)
        target.set(-1.21, 0.87, -0.027)
        camera.setCameraOptions({fov: 30})
    }

    window.scrollTo(0, 0)
    
    function setupScrollanimation() {

        const tl = gsap.timeline();

        // First to second

        tl
        .to(position, {x: isMobile ? 0.57 : 0.285, y: isMobile ? 0.27 : 0.05, z: isMobile ? 14.12 : 7.3,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--one--container", { yPercent:'-10' , opacity: 0,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top 90%", scrub: 1,
                immediateRender: false
        }})
        .to(target, {x: isMobile ? -0.02 : -0.076, y: isMobile ? 0.132 : 0.423 , z: isMobile ? 0.14 : 0.077,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

        // Second to third

        .to(position, {x: -5.16, y: -2.31, z: 2.75,
            scrollTrigger: {
                trigger: ".third",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--two--container", { yPercent:'-10' , opacity: 1,
        scrollTrigger: {
            trigger: ".second",
            start:"top center",
            end: "top 10%", scrub: 1,
            immediateRender: false
        }})

        .to(target, {x: -0.73, y: 0.135 , z: -0.7,
            scrollTrigger: {
                trigger: ".third",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

                // Third to forth

                .to(position, {x: -4.25, y: 3, z: -3.9,
                    scrollTrigger: {
                        trigger: ".forth",
                        start:"top bottom",
                        end: "top top", scrub: true,
                        immediateRender: false
                }, onUpdate})

                .to(".section--third--container", { yPercent:'-10' , opacity: 1,
                scrollTrigger: {
                    trigger: ".third",
                    start:"top center",
                    end: "top 10%", scrub: 1,
                    immediateRender: false
                }})
        
                .to(target, {x: -1.2, y: 0.38 , z: -0.13,
                    scrollTrigger: {
                        trigger: ".forth",
                        start:"top bottom",
                        end: "top top", scrub: true,
                        immediateRender: false
                }})

                .to(".section--forth--container", { yPercent:'-10' , opacity: 1,
                scrollTrigger: {
                    trigger: ".forth",
                    start:"top center",
                    end: "top 10%", scrub: 1,
                    immediateRender: false
                }})

                .to(".section--fifth--container", { yPercent:'-10' , opacity: 1,
                scrollTrigger: {
                    trigger: ".fifth",
                    start:"top center",
                    end: "top 10%", scrub: 1,
                    immediateRender: false
                }})

                // Final

                .to(position, {x: 6, y: 1.3, z: -2.46,
                    scrollTrigger: {
                        trigger: ".seventh",
                        start:"top bottom",
                        end: "top top", scrub: true,
                        immediateRender: false
                }, onUpdate})

                .to(".section--sixth--container", { opacity: 0,
                scrollTrigger: {
                    trigger: ".seventh",
                    start:"top bottom",
                    end: "top 70%", scrub: 1,
                    immediateRender: false
                }})

                .to(".section--seventh--container", { yPercent:'-10' , opacity: 1,
                scrollTrigger: {
                    trigger: ".seventh",
                    start:"top center",
                    end: "top 10%", scrub: 1,
                    immediateRender: false
                }})
        
                .to(target, {x: -0.075, y: -0.39 , z: 1.51,
                    scrollTrigger: {
                        trigger: ".seventh",
                        start:"top bottom",
                        end: "top top", scrub: true,
                        immediateRender: false
                }})

    }

    setupScrollanimation();

    //WEBGI UPDATE

    let needsUpdate = true;

    function onUpdate() {
        needsUpdate = true;
        viewer.renderer.resetShadows()
    }

    viewer.addEventListener("preFrame", () => {
        if( needsUpdate ) {
            camera.positionUpdated(true);
            camera.targetUpdated(true);
            needsUpdate = false;
        }
    })

	// SCROLL TO TOP
	document.querySelectorAll('.button--footer')?.forEach(item => {
		item.addEventListener('click', () => {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		})
	})

    // VIEW MORE
	document.querySelectorAll('.view-more')?.forEach(item => {
		item.addEventListener('click', () => {
			window.scrollTo({ top: 2000, left: 0, behavior: 'smooth' })
		})
	})

}

setupViewer()
