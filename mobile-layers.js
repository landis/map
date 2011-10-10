// initialize map when page ready
var map;

// Get rid of address bar on iphone/ipod
var fixSize = function() {
    window.scrollTo(0, 0);
    document.body.style.height = '100%';
    if (!(/(iphone|ipod)/.test(navigator.userAgent.toLowerCase()))) {
        if (document.body.parentNode) {
            document.body.parentNode.style.height = '100%';
        }
    }
};
setTimeout(fixSize, 700);
setTimeout(fixSize, 1500);

// allow testing of specific renderers via "?renderer=Canvas", etc
//var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
//renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

//OpenLayers.ProxyHost = "proxy.cgi?url=";

function init() {

    var geographic = new OpenLayers.Projection("EPSG:4326");
    var mercator = new OpenLayers.Projection("EPSG:900913");

    map = new OpenLayers.Map({
        div: "map",
	projection: mercator,
//        theme: null,
	layers: [
		new OpenLayers.Layer.OSM()
		new OpenLayers.Layer.WMS("OpenLayers WMS", {
			url: "http://jimlandis.com/geoserver/northeast/wms/",
			(layers: 'track_v1', transparent: "true"),
			(isBaseLayer: false, transitionEffect: 'resize') })
        	controls: [
            		new OpenLayers.Control.Attribution(),
            		new OpenLayers.Control.TouchNavigation({
                		dragPanOptions: {
                    		enableKinetic: true
                		}
            		}),
            	new OpenLayers.Control.ZoomPanel()
        	]
	]
    });

    map.setCenter(new OpenLayers.LonLat(-104, 42), 3);
};
