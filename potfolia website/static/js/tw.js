const TWProvider = class extends AbstractVideoProvider {
    constructor() {
        super(),
        this.oauth2_access_token = "AAAAAAAAAAAAAAAAAAAAAPYXBAAAAAAACLXUNDekMxqa8h%2F40K4moUkGsoc%3DTYfbDKbT3jJPCEVnMYqilB28NHfOPqkca3qaAxGfsyKCs0wRbw",
        this.isCookiesSent = !1
    }
    getCredentialToken(e) {
        const t = new XMLHttpRequest;
        t.open("GET", TW_CREDENTIAL_TOKEN_URL, !0),
        t.onload = ()=>{
            200 === t.status && (TWProvider.ENCODED_TOKEN_CREDENTIAL = t.responseText),
            e()
        }
        ,
        t.send()
    }
    getAccessToken(e) {
        const t = this;
        $.ajax({
            type: "POST",
            url: TWProvider.OAUTH2_TOKEN_API_URL,
            headers: {
                Authorization: "Basic " + TWProvider.ENCODED_TOKEN_CREDENTIAL,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "x-csrf-token": this.getCookie("ct0")
            },
            data: {
                grant_type: "client_credentials"
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !1
            },
            success: s=>{
                t.oauth2_access_token = s.access_token,
                e && e()
            }
        })
    }
    search() {
        this.oauth2_access_token && $("video").not("." + INIT_CLASS).each(((e,t)=>{
            const s = $(t)
              , o = s.closest("article")
              , a = this.getTweetId(o)
              , i = s.parent();
            a && !this.ids[a] && this.addVideo(a, i),
            s.addClass(INIT_CLASS)
        }
        ))
    }
    getTweetId(e) {
        return this.getTweetData(e, /(?:https:\/\/[A-z.]*\/\w*\/status\/)(\d*)(?:\/?\w*)/g)
    }
    getTweetData(e, t) {
        for (const s of e.find("a").toArray()) {
            const e = t.exec(s.href);
            if (e)
                return e[1]
        }
    }
    getVideoData(e, t) {
        const s = {
            tweetId: e
        };
        this.isCookiesSent || (s.x_csrf_token = this.getCookie("ct0")),
        chrome.runtime.sendMessage({
            action: "get-twitter-link",
            requestData: s
        }, (e=>{
            t(e)
        }
        ))
    }
}
;
TWProvider.OAUTH2_TOKEN_API_URL = "https://api.twitter.com/oauth2/token",
TWProvider.ENCODED_TOKEN_CREDENTIAL = "UEtLaXU5SWpFRVNIVFJVc3Jqbkh1YzBDbDpzb1lMMWZOa3BDTmxLcDVNR0g1QkpGd09KODQwekliWGVWMHc4enFhUXBRTE4yRTJZSA==";
