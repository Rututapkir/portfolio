const XXProvider = class extends AbstractVideoProvider {
    search() {
        chrome.runtime.sendMessage({
            action: "getTabVideos"
        }, (e=>{
            e && e.length !== this.videos.length && (this.videos = e.map((e=>({
                vid: e.vid,
                title: e.title,
                url: e.url,
                provider: "xx",
                quality: e.type
            }))),
            this.setBadge())
        }
        ))
    }
}
;
