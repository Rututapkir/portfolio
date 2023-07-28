const AbstractVideoProvider = class {
    constructor() {
        this.ids = {},
        this.videos = [],
        this.setBadge()
    }
    run() {
        setInterval((()=>this.search()), 1e3)
    }
    search() {}
    addVideo(t) {
        this.ids[t] = !0,
        this.getVideoData(t, (t=>{
            this.videos = this.videos.concat(t),
            this.setBadge()
        }
        ))
    }
    getVideoData() {}
    setBadge() {
        chrome.runtime.sendMessage({
            action: "setBadge",
            value: this.videos.length
        })
    }
    updateVideoUrl(t, e, i) {
        this.getVideoData(t, (t=>{
            const s = t.find((t=>t.quality = e));
            i(s.url)
        }
        ))
    }
    download(t) {
        const e = t.getAttribute("vid")
          , i = this.videos.find((t=>t.vid === e));
        chrome.runtime.sendMessage({
            action: "downloadVideo",
            video: i
        })
    }
    getCookie(t) {
        var e = ("; " + document.cookie).split("; " + t + "=");
        if (2 == e.length)
            return e.pop().split(";").shift()
    }
    betweenStr(t, e, i) {
        if (!e && !i)
            return t;
        let s = "";
        const o = t.indexOf(e);
        if (-1 === o && (s = ""),
        o >= 0 && (s = t.substr(o + e.length, t.length)),
        !i)
            return s;
        const d = s.indexOf(i);
        return -1 === d && -1 !== o || -1 === d ? "" : (s = s.substr(0, d),
        s)
    }
    filterUnique(t) {
        return t.reduce(((t,e)=>-1 !== t.findIndex((t=>t.formatNote === e.formatNote)) ? t : [...t, e]), [])
    }
    sortFormatsByWidth(t) {
        return t.sort(((t,e)=>e.formatWidth >= t.formatWidth ? 1 : -1))
    }
}
;
