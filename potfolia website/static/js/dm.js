const DMProvider = class extends AbstractVideoProvider {
    search() {
        const t = this.getIdFromLocation();
        t && !this.ids[t] && this.addVideo(t, ".dmp_Player.np_Player")
    }
    getIdFromLocation() {
        return /^\/\w{0,2}$/.test(location.pathname) ? null : location.pathname.replace("/video/", "")
    }
    validationId(t) {
        return /[\w\d]{1,9}/i.test(t)
    }
    parseMpegString(t) {
        return t.split("\n").slice(1, -1).reduce(((t,e,a,r)=>a % 2 != 0 ? t : [...t, {
            props: e,
            stream: r[a + 1]
        }]), [])
    }
    mapKeys(t, e) {
        return {
            formatId: e,
            formatName: "mp4",
            formatNote: `${t.NAME}p`,
            formatWidth: Number(t.NAME),
            formatType: "video",
            formatCodec: t.CODECS,
            url: t["PROGRESSIVE-URI"]
        }
    }
    parseMPEGData(t, e) {
        const {props: a} = t
          , r = a.match(/[A-Z\-_]+=/g);
        if (!r)
            return;
        const o = r.map((t=>t.replace("=", ""))).reduce(((t,e,r,o)=>{
            const s = o[r + 1]
              , n = this.betweenStr(a, `${e}=`, s ? `,${s}` : void 0).replace(/\"/g, "");
            return n ? {
                ...t,
                [e]: n
            } : t
        }
        ), {});
        return this.mapKeys(o, e)
    }
    getFormats(t={}) {
        return new Promise(((e,a)=>{
            const {qualities: r={}} = t
              , {auto: o} = r;
            o && 0 !== o.length || e([]);
            const s = o[0];
            fetch(s.url).then((t=>t.text())).then((t=>{
                t || e([]);
                const a = this.parseMpegString(t).map(((t,e)=>this.parseMPEGData(t, e)));
                e(this.sortFormatsByWidth(this.filterUnique(a)))
            }
            ))
        }
        ))
    }
    getVideoData(t, e) {
        if (!this.validationId(t))
            throw Error("No valid id");
        const a = new URL("https://www.dailymotion.com/player/metadata/video/");
        a.pathname = a.pathname + t,
        a.searchParams.append("app", "com.dailymotion.neon"),
        a.searchParams.append("locale", "en"),
        a.searchParams.append("client_type", "website");
        let r = "";
        fetch(a.href).then((t=>t.text())).then((t=>{
            if (!t)
                throw new Error("There are no metadata!");
            return JSON.parse(t)
        }
        )).then((t=>(r = t.title,
        Promise.all([t.posters, this.getFormats(t)])))).then((t=>{
            const a = t[1];
            if (Object.keys(a).length) {
                const t = {
                    title: r,
                    url: a[0].url,
                    quality: a[0].formatNote
                };
                e(t)
            }
        }
        )).catch((t=>{}
        ))
    }
}
;
