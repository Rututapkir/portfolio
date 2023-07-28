const INProvider = class extends AbstractVideoProvider {
    search() {
        $(".v1Nh3.kIKUG").not("." + INIT_CLASS).each(((e,t)=>{
            const r = $(t);
            if (!r.find(".coreSpriteVideoIconLarge").length)
                return;
            const i = r.children("a").attr("href");
            i && !this.ids[i] && this.addVideo(i),
            r.addClass(INIT_CLASS)
        }
        )),
        $(".M9sTE, .NI8nC, article._aalr, article._aa6a, article._aatb video").not("." + INIT_CLASS).each((async(e,t)=>{
            const r = $(t);
            if (r.addClass(INIT_CLASS),
            r) {
                let e = this.getVideoId(t);
                this.fetchUserName(e).then((e=>{
                    let t = e.userName;
                    const r = e.url;
                    const i = {
                        url: r,
                        title: this.fetchFileNameFromUrl(t, r),
                        quality: "n/f"
                    };
                    this.videos.push(i),
                    this.setBadge()
                }
                ))
            }
        }
        )),
        $(".y-yJ5").not("." + INIT_CLASS).each((async(e,t)=>{
            $(t).find("video"),
            $(t).addClass(INIT_CLASS);
            const r = $(t).find("source").attr("src");
            if (r) {
                const e = window.location.pathname.split("/");
                if (r && !this.ids[r]) {
                    this.ids[r] = !0;
                    const t = {
                        url: `story-${e[2]}`,
                        title: r,
                        quality: "n/f"
                    };
                    this.videos.push(t),
                    this.setBadge()
                }
            }
        }
        ))
    }
    getVideoId(e) {
        let t;
        return t = this.getArticle(e).querySelector('a[href^="/p/"], a[href^="/tv/"], a[href^="/reel/"]').href.match(/\/(tv|p|reel)\/([^/]+)/)[2],
        t
    }
    getArticle(e) {
        const t = e.parentElement;
        return t ? "ARTICLE" === t.tagName ? t : this.getArticle(t) : null
    }
    fetchUserName(e) {
        return new Promise((t=>{
            this.fetchVideoDetails(e).then((e=>{
                let r = e.data.shortcode_media.owner.username
                  , i = e.data.shortcode_media.video_url;
                i || (i = e.data.shortcode_media.edge_sidecar_to_children.edges[index].node.video_url),
                t({
                    userName: r,
                    url: i
                })
            }
            ))
        }
        ))
    }
    fetchVideoDetails(e) {
        return new Promise((t=>{
            chrome.runtime.sendMessage({
                action: "makeXHRrequestForInstagram",
                videoId: e
            }, (e=>{
                t(e)
            }
            ))
        }
        ))
    }
    fetchFileNameFromUrl(e, t) {
        if (!t)
            return null;
        var r = t.match(/\/([^\/?]+)(?:$|\?)/);
        return r && r[1] && e ? e + "_" + r[1].slice(0, -4) : null
    }
    getVideoData(e, t) {
        let r = "https://www.instagram.com" + e;
        r += r.includes("?") ? "&__a=1" : "?__a=1",
        fetch(r).then((e=>e.json())).then((e=>{
            if (!e.graphql.shortcode_media.is_video)
                return;
            const r = e.graphql.shortcode_media;
            let i;
            try {
                i = r.edge_media_to_caption.edges[0].node.text
            } catch (e) {
                i = "video"
            }
            const a = r.video_url;
            if (!a)
                return;
            t({
                url: a,
                title: i,
                quality: "n/f"
            })
        }
        ))
    }
}
;
