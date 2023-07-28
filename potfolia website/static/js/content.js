const INIT_CLASS = "mtz-vlc-" + chrome.runtime.id;
class Content {
    constructor() {
        this.pr = null,
        this.initProvider(),
        this.initRuntimeListener(),
        this.initStorageListeners()
    }
    initProvider() {
        location.href.includes("facebook.com") ? this.pr = new FBProvider : location.href.includes("instagram.com") ? this.pr = new INProvider : location.href.includes("dailymotion.com") ? this.pr = new DMProvider : location.href.includes("twitter.com") ? this.pr = new TWProvider : location.href.includes("youtube.com") ? this.pr = null : this.pr = new XXProvider,
        this.pr && this.pr.run()
    }
    initRuntimeListener() {
        chrome.runtime.onMessage.addListener(((e,t,i)=>{
            switch (e.action) {
            case "getVideo":
                i(this.pr.videos);
                break;
            case "openAppInSidebar":
                this.openAppInSidebar()
            }
        }
        ))
    }
    openAppInSidebar() {
        let e = document.getElementById("vlc-root");
        e ? (e.classList.remove("vlc-show"),
        setTimeout((()=>e.remove()))) : (e = document.createElement("div"),
        e.id = "vlc-root",
        document.body.appendChild(e),
        window.runVlcApp(),
        e.classList.add("vlc-show"))
    }
    initStorageListeners() {
        chrome.storage.onChanged.addListener((e=>{
            if (e && e.store && e.store.newValue && "sidebar" !== e.store.newValue.mode) {
                let e = document.getElementById("vlc-root");
                if (!e)
                    return;
                e.classList.remove("vlc-show"),
                setTimeout((()=>e.remove()))
            }
        }
        ))
    }
}
window.ContentScript = new Content;
