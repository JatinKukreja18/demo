var baseURL="pics.sbicard.com/SBICardsCEJ8/",jsFile="sf_plugChat-V3.1.42.min.js",chartFile ="ChartPlugin.js",cssfile="css/sf_style-V3.0.27.min.css";function getStyleSheet(e){var t=document.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=e,document.getElementsByTagName('head')[0].appendChild(t)}function getScript(e){var t=document.createElement("script");t.type="text/javascript",t.src=baseURL+e,document.getElementsByTagName('head')[0].appendChild(t)}getStyleSheet((baseURL="https:"==window.location.protocol?"https://"+baseURL:"http://"+baseURL)+cssfile),getScript(jsFile),getScript(chartFile);
