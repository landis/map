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

function init() {
    map = new OpenLayers.Map({
        div: "map",
//	theme: null,
        projection: new OpenLayers.Projection("EPSG:900913"),
//        units: "m",
//        maxResolution: 156543.0339,
//	controls: [
//		new OpenLayers.Control.Attribution(),
//		new OpenLayers.Control.TouchNavigation({
//			dragPanOptions: {enableKinetic: true}
//	}),
        maxExtent: new OpenLayers.Bounds(
            -20037508, -20037508, 20037508, 20037508.34
        )
    });
    
    var osm = new OpenLayers.Layer.OSM("OpenStreetMap", null, {
		transitionEffect: 'resize'
	      });            
    var overlay = new OpenLayers.Layer.WMS("Overlay",
	"http://jimlandis.com/geoserver/northeast/wms/",
	{layers: 'track_v1', transparent: true, transitionEffect: 'resize'}
    );
  
    map.addLayers([osm, overlay]);

    map.addControl(
		   new OpenLayers.Control.LayerSwitcher(),
		   new OpenLayers.Control.Attribution(),
                   new OpenLayers.Control.TouchNavigation({
                       dragPanOptions: {enableKinetic: true}})
    );

    map.setCenter(
        new OpenLayers.LonLat(-75.2,40.0).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 
        11
    );
}
