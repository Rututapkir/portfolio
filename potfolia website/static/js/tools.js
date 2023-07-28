String.prototype.htmlSymDecode = function() {
    const e = document.createElement("div");
    return e.innerHTML = this,
    e.innerText
}
;
