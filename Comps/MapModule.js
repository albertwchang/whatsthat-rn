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
var MapAction = require("../Actions/MapAction");

// Utilities
var _ = require("lodash");

var {
	StyleSheet,
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
		height: 450,
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
		})
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
		console.log("this component has updated...");
	},

	_prepMapParams: function(items) {
		var params = {
			annotations: this._makeAnnotations(items),
			centerPoint: this._calcCenterPoint(_.pluck(items, "geoPoint")),
			zoomLevel: this._calcZoomLevel(),
		};

		debugger;
		return params;
	},

	_makeAnnotations: function(items) {
		return _.map(items, function(item) {
			return {
				latitude: item.geoPoint.lat,
				longitude: item.geoPoint.long,
				title: item.name,
				subtitle: item.desc,
			};
		});
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

	_calcZoomLevel: function(bounds, containerDims, maxZoomLevel) {
		// var WORLD_DIM = { height: 256, width: 256 };

  //   function latRad(lat) {
  //     var sin = Math.sin(lat * Math.PI / 180);
  //     var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  //     return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  //   }

  //   function zoom(mapPx, worldPx, fraction) {
  //     return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  //   }

  //   var ne = bounds.getNorthEast();
  //   var sw = bounds.getSouthWest();

  //   var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  //   var lngDiff = ne.lng() - sw.lng();
  //   var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  //   var latZoom = zoom(containerDims.height, WORLD_DIM.height, latFraction);
  //   var lngZoom = zoom(containerDims.width, WORLD_DIM.width, lngFraction);

  //   return Math.min(latZoom, lngZoom, maxZoomLevel);

    return 14;

  	// var radiusInRad = radiusInKM / earthRadiusInKM;
		// var longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(latitude)));
		// var latitudeDelta = aspectRatio * rad2deg(radiusInRad);
	},

  _calcMaxZoomLevel: function(centerPoint) {
    // var qMaxZoomLevel = $q.defer();
    // var zoomService = new google.maps.MaxZoomService();
    // var position = new google.maps.LatLng(centerPoint.latitude, centerPoint.longitude);

    // zoomService.getMaxZoomAtLatLng(position, function(response) {
    //   if (response.status == google.maps.MaxZoomStatus.OK) {
    //       var maxZoom = 0;
    //       maxZoom = (_maxZoomLevel < response.zoom) ? _maxZoomLevel : response.zoom;
    //       qMaxZoomLevel.resolve(maxZoom);
    //   } else
    //       qMaxZoomLevel.reject({errMsg: "Couldn't get MaxZoomLevel"});
    // });

    // zoomService = null;
    // return qMaxZoomLevel.promise;
  },

	_createBounds: function(maps, geoPoints) {
	  // var bounds = new maps.LatLngBounds();

	  // _.each(geoPoints, function(geoPoint) {
	  //   bounds.extend(new maps.LatLng(geoPoint.lat,geoPoint.long));
	  // });

	  // maps = null;
	  // return bounds;
	},

	_onChange: function(e) {
    this.setState({
    	annotations: this.state.annotations,
    	centerPoint: this.state.centerPoint,
    	zoomLevel: e.zoom,
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

		if (mapParams == null)
			component = <View style={styles.map}><Text>Still Loading</Text></View>
		else
			component =
				<View>
					<TouchableHighlight
						underlayColor="#A4A4A4"
						style={styles.button}
						onPress={() => this._rowPressed(rowId, item)}>
						<View>
							<Text>Update GMaps</Text>
						</View>
					</TouchableHighlight>
					<MapBox
						style={styles.map}
		        direction={10}
		        rotateEnabled={true}
		        showsUserLocation={true}
		        accessToken={'sk.eyJ1IjoiYWxiZXJ0d2NoYW5nIiwiYSI6IjI0NDEzMzNlMWM5MmYwMWQ5Y2UxY2UwZDJiNTU2OTU3In0.I-R3iWN1YIq-DeWrS8cSPg'}
		        styleURL={'asset://styles/dark-v7.json'}
		        centerCoordinate={mapParams.centerPoint}
		        userLocationVisible={true}
		        zoomLevel={mapParams.zoomLevel}
		        onRegionChange={this.onChange}
		        annotations={mapParams.annotations}
		        onOpenAnnotation={this._onOpenAnnotation}
		        onUpdateUserLocation={this._onUpdateUserLocation} />
		    </View>
		
		return component;
	}
})

module.exports = MapModule;