(function() {
    
    let remoteWindow = window.open("about:blank");
    let remoteDocument = remoteWindow.document;
    
    function showDir(parent, dirname, rootElem) {
        let thisPath = FS.joinPath([parent, dirname]);
        let entries = FS.readdir(thisPath).filter(entry => entry !== "." && entry !== "..");
        console.log(entries);
        for(let entry of entries) {
            let li = remoteDocument.createElement("li");
            let fullEntryPath = FS.joinPath([thisPath, entry]);
            try {
                if(FS.isDir(FS.stat(fullEntryPath).mode)) {
                    li.textContent = entry;
                    let ul = remoteDocument.createElement("ul");
                    li.appendChild(ul);
                    showDir(thisPath, entry, ul);
                } else {
                    try { 
                        let blob = new Blob([FS.readFile(fullEntryPath)], {type: "application/octet-stream"});
                        let url = remoteWindow.URL.createObjectURL(blob);
                        let a = remoteDocument.createElement("a");
                        a.textContent = entry;
                        a.href = url;
                        a.download = entry;
                        li.appendChild(a);
                    } catch(e) {
                        li.textContent = entry; // Unable to read "file"
                    }
                }
            } catch(e) {
                console.error("Unable to descend", fullEntryPath, ": ", e);
                li.textContent = entry;
            }
            rootElem.appendChild(li);
        }
    }
    
    let rootUl = remoteDocument.createElement("ul");
    remoteDocument.body.appendChild(rootUl);
    showDir("", "/", rootUl);

    
    
})();
