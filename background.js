console.log("in background.js");

// chrome.tabs.getCurrent(function(tab) {
//   tab.onActivated.addListener(function(){
//     console.log("GOT HERE onActivated (inside tab)");
//   });
// });

// chrome.tabs.getCurrent(function(tab) {
//   tab.onZoomChange.addListener(function(){
//     console.log("GOT HERE onZoomChange (inside tab)");
//   });
// });

// // this is actually part of the message passing test
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//       sendResponse({farewell: "goodbye"});
//   });