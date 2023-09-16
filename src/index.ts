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

    const drillMaterial = manager.materials!.findMaterialsByName("Drill_01")[0] as MeshStandardMaterial2

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

    if(isMobile) {
        position.set(-3.10, -3.46, 7.45)
        target.set(-0.51, -0.01, -0.42)
        camera.setCameraOptions({fov: 30})
    }

    window.scrollTo(0, 0)
    
    function setupScrollanimation() {

        const tl = gsap.timeline();

        // First to second

        tl
        .to(position, {x: isMobile ? -4 : 0.285, y: isMobile ? 6.06 : 0.05, z: isMobile ? -2.72 : 7.3,
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
        .to(target, {x: isMobile ? -0.08 : -0.076, y: isMobile ? 0.08 : 0.423 , z: isMobile ? 0.04 : 0.077,
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

    // KNOW MORE EVENT
	document.querySelector('.button--hero')?.addEventListener('click', () => {
		const element = document.querySelector('.second')
		window.scrollTo({ top: element?.getBoundingClientRect().top, left: 0, behavior: 'smooth' })
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

    //CUSTOMIZE
    const sections = document.querySelector(".container") as HTMLElement
    const mainContainer = document.getElementById("webgi-canvas-container") as HTMLElement
    document.querySelector(".button--customize")?.addEventListener("click", () => {

        sections.style.visibility = "hidden"
        mainContainer.style.pointerEvents = "all"
        document.body.style.cursor = "grab"

        gsap.to(position, {x: -2.6, y: 0.2, z: -9.6, duration: 2, ease: "power3.inOut", onUpdate})
        gsap.to(target, {x: 0, y: 0 , z: 0.12, duration: 2, ease: "power3.inOut", onUpdate, onComplete: enableControlers})

    })

    function enableControlers(){
        exitButton.style.visibility = "visible"
        customizerInterface.style.visibility = "visible"
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled: true})
    }

    // EXIT CUSTOMIZER
	exitButton.addEventListener('click', () => {
        gsap.to(position, {x: -3, y: -0.6, z: 1.5, duration: 1, ease: "power3.inOut", onUpdate})
        gsap.to(target, {x: -1, y: 1 , z: -0.44, duration: 1, ease: "power3.inOut", onUpdate})

        viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})
        sections.style.visibility = "visible"
        mainContainer.style.pointerEvents = "none"
        document.body.style.cursor = "default"
        exitButton.style.visibility = "hidden"
        customizerInterface.style.visibility = "hidden"

	})

    document.querySelector('.button--colors.black')?.addEventListener('click', () => {
        changeColor(new Color(0x383830))
	})

    document.querySelector('.button--colors.red')?.addEventListener('click', () => {
        changeColor(new Color(0xfe2d2d))
	})

    document.querySelector('.button--colors.yellow')?.addEventListener('click', () => {
        changeColor(new Color(0xffffff))
	})


    function changeColor(_colorToBeChanged: Color){
        drillMaterial.color = _colorToBeChanged;
        viewer.scene.setDirty()
    }

}

setupViewer()
