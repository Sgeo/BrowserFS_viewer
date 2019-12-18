# BrowserFS_viewer
Bookmarklet to view active BrowserFS tree.

Add the below to your bookmarks:

```javascript
javascript:(function(){var js=document.body.appendChild(document.createElement("script"));js.onerror=function(){alert("Sorry, the script could not be loaded.")};js.src="https://gitcdn.xyz/repo/Sgeo/BrowserFS_viewer/master/inject.js"})();
```

