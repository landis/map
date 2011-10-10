OpenLayers.Util.OSMLocal = {};

/**
 * Constant: MISSING_TILE_URL
 * {String} URL of image to display for missing tiles
 */
OpenLayers.Util.OSMLocal.MISSING_TILE_URL = "http://localhost/images/404.png";
/**
 * Function: onImageLoadError
 */
OpenLayers.Util.onImageLoadError = function() {
    this.src = OpenLayers.Util.OSMLocal.MISSING_TILE_URL;
};

/**
 * Class: OpenLayers.Layer.OSM.LocalMassachusettsMapnik
 *
 * Inherits from:
 *  - <OpenLayers.Layer.OSM>
 */
OpenLayers.Layer.OSM.LocalPAMapnik = OpenLayers.Class(OpenLayers.Layer.OSM, {
    /**
     * Constructor: OpenLayers.Layer.OSM.LocalPAMapnik
     *
     * Parameters:
     * name - {String}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {
        var url = [
            "http://jimlandis.com/map/${z}/${x}/${y}.png",
            "http://token.jimlandis.com/map/${z}/${x}/${y}.png",
            "http://www.jimlandis.com/map/${z}/${x}/${y}.png"
        ];
        options = OpenLayers.Util.extend({
            numZoomLevels: 19,
            buffer: 0,
            transitionEffect: "resize"
        }, options);
        var newArguments = [name, url, options];
        OpenLayers.Layer.OSM.prototype.initialize.apply(this, newArguments);
    },

    CLASS_NAME: "OpenLayers.Layer.OSM.LocalPAMapnik"
});
