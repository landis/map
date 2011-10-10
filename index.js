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
	controls: [
		new OpenLayers.Control.LayerSwitcher(),
		new OpenLayers.Control.Attribution(),
		new OpenLayers.Control.TouchNavigation({
			dragPanOptions: {enableKinetic: true}}),
		new OpenLayers.Control.ZoomPanel()
	],
        maxExtent: new OpenLayers.Bounds(
            -20037508, -20037508, 20037508, 20037508.34
        )
    });
    
    var osm = new OpenLayers.Layer.OSM("OpenStreetMap", null, {
		transitionEffect: 'resize'
	      });            

    var hot = new OpenLayers.Layer.WMS("0-15",
	"http://jimlandis.com/geoserver/northeast/wms/",
	{layers: 'track_v2_0-15', transparent: true, transitionEffect: 'resize'}
    );

    var slow = new OpenLayers.Layer.WMS("15-30",
        "http://jimlandis.com/geoserver/northeast/wms/",
        {layers: 'track_v2_15-30', transparent: true, transitionEffect: 'resize'}
    );

    var meh = new OpenLayers.Layer.WMS("30-50",
        "http://jimlandis.com/geoserver/northeast/wms/",
        {layers: 'track_v2_30-50', transparent: true, transitionEffect: 'resize'}
    );
  
    var movin = new OpenLayers.Layer.WMS("50+",
        "http://jimlandis.com/geoserver/northeast/wms/",
        {layers: 'track_v2_50p', transparent: true, transitionEffect: 'resize'}
    );

    map.addLayers([osm, movin, meh, slow, hot]);

//    map.addControl(
//		   new OpenLayers.Control.LayerSwitcher(),
//		   new OpenLayers.Control.Attribution(),
//                 new OpenLayers.Control.TouchNavigation({
//                       dragPanOptions: {enableKinetic: true}}),
//		   new OpenLayers.Control.ZoomPanel()
//    );

    map.setCenter(
        new OpenLayers.LonLat(-75.2,40.0).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 
        11
    );
}
