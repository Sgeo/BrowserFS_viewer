# BrowserFS_viewer
Bookmarklet to view active BrowserFS tree.

Add the below to your bookmarks:

```javascript
javascript:!function(){let e=window.open("about:blank"),t=e.document;let n=t.createElement("ul");t.body.appendChild(n),function n(l,o,a){let d=FS.joinPath([l,o]),c=FS.readdir(d).filter(e=>"."!==e&&".."!==e);console.log(c);for(let l of c){let o=t.createElement("li"),c=FS.joinPath([d,l]);try{if(FS.isDir(FS.stat(c).mode)){o.textContent=l;let e=t.createElement("ul");o.appendChild(e),n(d,l,e)}else try{let n=new Blob([FS.readFile(c)],{type:"application/octet-stream"}),a=e.URL.createObjectURL(n),d=t.createElement("a");d.textContent=l,d.href=a,d.download=l,o.appendChild(d)}catch(e){o.textContent=l}}catch(e){console.error("Unable to descend",c,": ",e),o.textContent=l}a.appendChild(o)}}("","/",n)}();
```

