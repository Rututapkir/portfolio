const FBProvider = class extends AbstractVideoProvider {
    constructor() {
        super(),
        this.dtsgToken = null,
        this.initMessageListeners(),
        this.getDtsgToken()
    }
    initMessageListeners() {
        chrome.runtime.onMessage.addListener(((e,s,t)=>{
            switch (e.action) {
            case "sendFbVideoId":
                const s = this.prepareId(e.vid);
                if (!s)
                    return;
                this.serchVideoInfo(s),
                t("ok");
                break;
            case "pageUpdated":
                this.videos = [],
                this.setBadge()
            }
        }
        ))
    }
    async serchVideoInfo(e) {
        if (await this.getDtsgToken(),
        this.dtsgToken) {
            const s = this.getCookie("c_user")
              , t = {};
            fetch(`https://www.facebook.com/video/video_data_async/?video_id=${e}&fb_dtsg_ag=${this.dtsgToken}&__user=${s}&__a=1`).then((e=>e.text())).then((e=>JSON.parse(e.replace("for (;;);", "")))).then((s=>{
                t.sd_src = s.payload.sd_src,
                t.hd_src = s.payload.hd_src,
                this.filled = !0;
                const i = {
                    title: `video_ ${e}`,
                    quality: "n/f",
                    url: t.sd_src || t.hd_src
                };
                this.addVideo(e, i)
            }
            ))
        }
    }
    prepareId(e) {
        if (!e || e.error)
            return !1;
        const s = e.split(":");
        return s[s.length - 1]
    }
    getDtsgToken() {
        return new Promise((e=>{
            chrome.runtime.sendMessage({
                action: "getDtsgToken"
            }, (s=>{
                this.dtsgToken = s,
                e(s)
            }
            ))
        }
        ))
    }
    search() {
        window.location.href !== this.location && ($("*").removeClass(INIT_CLASS),
        this.location = window.location.href)
    }
    addVideo(e, s) {
        this.ids[e] || (this.ids[e] = !0,
        this.videos = this.videos.concat(s),
        this.setBadge())
    }
}
;
FBProvider.location = "https://facebook.com";
