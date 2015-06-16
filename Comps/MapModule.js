'use strict'

// React Native Parts
var React = require('react-native');
var Carousel = require('react-native-carousel');
var Icons = require("react-native-vector-icons");
var MapBox = require("react-native-mapbox-gl");
var Reflux = require("reflux");
var TimerMixin = require('react-timer-mixin');

// Personal Components

// STORES && ACTIONS
var MapStore = require("../Stores/MapStore");
var MapActions = require("../Actions/MapActions");

// Utilities
var _ = require("lodash");
var MapUtils = require("googlemaps-utils");
var GetBounds = require('getboundingbox');

var {
	MapView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} = React;

var styles = StyleSheet.create({
	button: {
		margin: 10,
		padding: 5,
		backgroundColor: "blue",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		flex: 1,
	}
})

var MapModule = React.createClass({
	mixins: [Reflux.connect(MapStore), Reflux.ListenerMixin],
	getInitialState: function() {
		return {
			items: null,
			mapParams: null
		}
	},

	componentWillMount: function() {
		var items = this.props.items;
		var _mapParams = null;

		if (items != null) {
			_mapParams = this._prepMapParams(items);
		}

		this.setState({
			mapParams: _mapParams
		});
	},

	componentDidMount: function() {
		MapActions.activateMap();
	},

	componentWillReceiveProps: function(nextProps) {
		var _mapParams = null;
		
		if (nextProps.items != null) {
			_mapParams = _prepMapParams(items);
		}	else {

		}

		this.setState({
			mapParams: _mapParams
		})
	},

	componentWillUpdate: function(nextProps, nextState) {
		debugger;
		console.log("this component has updated...");
	},

	_prepMapParams: function(items) {
		// var centerPoint = this._calcCenterPoint(_.pluck(items, "geoPoint"));
		var dims = this.props.dims;
		var geoPoints = _.pluck(items, "geoPoint");
		var bounds = this._getBounds(geoPoints);
		var centerPoint = {
			long: (bounds.minY + bounds.maxY) / 2,
			longitude: (bounds.minY + bounds.maxY) / 2,
			lat: (bounds.minX + bounds.maxX) / 2,
			latitude: (bounds.minX + bounds.maxX) / 2,
		};

		// calculate the zoom for a given bounds (l, b, r, t), width and height 
		var zoomLevel = MapUtils.calcZoomForBounds(
			[bounds.minY, bounds.minX, bounds.maxY, bounds.maxX],
			dims.width,
			dims.height,
		);

		var params = {
			annotations: this._makeAnnotations(items),
			centerPoint: centerPoint,
			region: this._makeRegion(zoomLevel, centerPoint, dims),
			zoomLevel: zoomLevel,
		};

		return params;
	},

	_makeAnnotations: function(items) {
		var annotations = _.map(items, function(item) {
			return {
				latitude: item.geoPoint.lat,
				longitude: item.geoPoint.long,
				title: item.name,
				subtitle: item.desc,
				hasLeftCallout: true,
        onLeftCalloutPress: function() {
        	console.log("map item pressed");
        } 
			};
		});

		return annotations;
	},

	_makeRegion: function(zoomLevel, centerPoint, dims) {
		// radiusInKM / earthRadiusInKM;
		var radiusInRad = this._radiusFromZoom(zoomLevel) / this.state.mapConstants.earthRadius.value;
		
		// rad2deg(radiusInRad / Math.cos(deg2rad(latitude)));
		var longitudeDelta = this._rad2Deg( radiusInRad / Math.cos(this._deg2Rad(centerPoint.lat)) );

		// aspectRatio * rad2deg(radiusInRad);
		var latitudeDelta = (dims.width / dims.height) * this._rad2Deg(radiusInRad);

		return {
			latitude: centerPoint.lat,
			longitude: centerPoint.long,
			latitudeDelta: latitudeDelta,
			longitudeDelta: longitudeDelta,
		};
	},

	_radiusFromZoom: function(zoomLevel) {
		var kmPerMileRatio = 1.60934;

		return kmPerMileRatio * Math.pow(2, (15 - zoomLevel));
	},

	_rad2Deg: function(angle) {
		return angle * 57.29577951308232;
	},

	_deg2Rad: function(deg) {
		return deg / 57.29577951308232;
	},

	_getBounds: function(geoPoints) {
		var filteredGeoPoints = _.map( geoPoints, (geoPoint) => {
			return _.omit(geoPoint, ["latitude", "longitude"]);
		});

		var rawGeoPoints = _.map(filteredGeoPoints, (geoPoint) => {
			return _.values(geoPoint);
		});

		debugger;
		return GetBounds(rawGeoPoints);
	},

	_calcCenterPoint: function(geoPoints) {
		// find center based on bounds (which is based on markers)
		var total = geoPoints.length;
		var X = 0, Y = 0, Z = 0;

		_.each(geoPoints, function(geoPoint) {
		  var lat = geoPoint.lat * Math.PI / 180;
		  var long = geoPoint.long * Math.PI / 180;

		  var x = Math.cos(lat) * Math.cos(long);
		  var y = Math.cos(lat) * Math.sin(long);
		  var z = Math.sin(lat);

		  X += x;
		  Y += y;
		  Z += z;
		});

		X = X / total;
		Y = Y / total;
		Z = Z / total;

		var Hyp = Math.sqrt(X * X + Y * Y);
		var circleConverter = 180 / Math.PI;

		return {
		  lat: Math.atan2(Z, Hyp) * circleConverter,
		  long: Math.atan2(Y, X) * circleConverter,
		  latitude: Math.atan2(Z, Hyp) * circleConverter,
		  longitude: Math.atan2(Y, X) * circleConverter
		};
	},

	_onChange: function(e) {
    this.setState({
    	mapParams: {
    		annotations: this.state.annotations,
	    	centerPoint: this.state.centerPoint,
	    	zoomLevel: e.zoom,
	    }
    });
  },
  
  _onUpdateUserLocation: function(location) {
    console.log(location)
  },
  
  _onOpenAnnotation: function(annotation) {
    console.log(annotation)
  },

	render: function() {
		var mapParams = this.state.mapParams;
		var component;

		debugger;

		if (!mapParams)
			component = <View style={styles.map}><Text>Still Loading</Text></View>
		else
			component =
					// <MapBox
					// 	refs="map"
					// 	style={styles.map}
		   //      direction={10}
		   //      rotateEnabled={true}
		   //      showsUserLocation={true}
		   //      accessToken={'sk.eyJ1IjoiYWxiZXJ0d2NoYW5nIiwiYSI6IjI0NDEzMzNlMWM5MmYwMWQ5Y2UxY2UwZDJiNTU2OTU3In0.I-R3iWN1YIq-DeWrS8cSPg'}
		   //      styleURL={'asset://styles/dark-v7.json'}
		   //      centerCoordinate={mapParams.centerPoint}
		   //      userLocationVisible={true}
		   //      zoomLevel={mapParams.zoomLevel}
		   //      onRegionChange={this.onChange}
		   //      annotations={mapParams.annotations}
		   //      onOpenAnnotation={this._onOpenAnnotation}
		   //      onUpdateUserLocation={this._onUpdateUserLocation} />

			  <MapView
		   		style={styles.map}
          region={mapParams.region}
          annotations={mapParams.annotations} />
		
		return component;
	}
})

module.exports = MapModule;