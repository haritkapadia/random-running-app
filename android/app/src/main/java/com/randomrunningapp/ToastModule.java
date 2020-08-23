// ToastModule.java
package com.RandomRunningApp;
import java.io.*;
import java.net.*;
import java.util.*;
import android.os.*;
import android.app.*;
import org.w3c.dom.*;
import org.xml.sax.*;
import android.util.*;
import android.widget.*;
import android.content.*;
import android.location.*;
import androidx.core.app.*;
import javax.xml.parsers.*;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
public class ToastModule extends ReactContextBaseJavaModule {
	private static ReactApplicationContext reactContext;
	private static final String DURATION_SHORT_KEY = "SHORT";
	private static final String DURATION_LONG_KEY = "LONG";
	ToastModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
	}
	@Override
	public String getName() {
		return "ToastExample";
	}
	@Override
	public Map<String, Object> getConstants() {
		final Map<String, Object> constants = new HashMap<>();
		constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
		constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
		return constants;
	}
	@ReactMethod
	public void show(String message, int duration) {
		Toast.makeText(getReactApplicationContext(), message, duration).show();
	}
	private void sendEvent(String eventName,WritableMap params) {
		getReactApplicationContext()
			.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
			.emit(eventName,params);
	}
	private void toast(String str) {
		Toast.makeText(getReactApplicationContext(),str,Toast.LENGTH_SHORT).show();
	}
	// run "adb -d logcat RandomRunningApp *:S" to see log messages
	private void log(String str) {
		Log.d("RandomRunningApp",str);
	}
	public static class MapNode
	{
		public final double lat;
		public final double lon;
		public MapNode(final double lat,final double lon)
		{
			this.lat = lat;
			this.lon = lon;
		}
		public double distanceTo(final double latB,final double lonB)
		{
			final double radius = 6371;
			double dlat = Math.toRadians(latB - this.lat);
			double dlon = Math.toRadians(lonB - this.lon);
			double sdlat = Math.sin(dlat / 2);
			double sdlon = Math.sin(dlon / 2);
			double a = sdlat * sdlat + Math.cos(Math.toRadians(this.lat)) * Math.cos(Math.toRadians(latB)) * sdlon * sdlon;
			double c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));
			return radius * c;
		}
		public double distanceTo(final MapNode nodeB)
		{
			return distanceTo(nodeB.lat,nodeB.lon);
		}
	}
	public static class MapEdge
	{
		public final MapNode nodeA;
		public final MapNode nodeB;
		public final double length;
		public MapEdge(final MapNode nodeA,final MapNode nodeB)
		{
			this.nodeA = nodeA;
			this.nodeB = nodeB;
			length = nodeA.distanceTo(nodeB);
		}
		public MapNode getOther(MapNode node)
		{
			return node == nodeA ? nodeB : nodeA;
		}
	}
	public static class RouteStep
	{
		public final double dist;
		public final MapNode node;
		public RouteStep(double dist,MapNode node)
		{
			this.dist = dist;
			this.node = node;
		}
	}
	private boolean initialized = false;
	private Map<MapNode,List<MapEdge>> adjList = new HashMap<>();
	@ReactMethod private void maybeInit(Location loc) {
		if(initialized)
			return;
		initialized = true;
		Set<String> permissibleHighways= new HashSet<String>(){{
			addAll(Arrays.asList(new String[]{
				"tertiary","unclassified","residential","tertiary_link","living_street","pedestrian","footway","steps"
			}));
		}};
		double d= .01;
		String url= "http://www.overpass-api.de/api/xapi_meta?*[bbox="
			+ (loc.getLongitude()-d)+","
			+ (loc.getLatitude()-d)+","
			+ (loc.getLongitude()+d)+","
			+ (loc.getLatitude()+d)
		+"]";
		log("creating BufferedInputStream wth URL: "+url);
		BufferedInputStream iStream = null;
		try {
			iStream= new BufferedInputStream(new URL(url).openStream());
			toast("lat:"+loc.getLatitude()+", long: "+loc.getLongitude());
		} catch(MalformedURLException e) {
			throw new RuntimeException(e);
		} catch(IOException e) {
			log("couldn't open stream");
		}
		DocumentBuilderFactory dbf= DocumentBuilderFactory.newInstance();
		DocumentBuilder db;
		try {
			db = dbf.newDocumentBuilder();
		} catch(ParserConfigurationException e) {
			throw new RuntimeException(e);
		}
		log("parsing!");
		Document doc;
		try {
			doc = db.parse(iStream);
		} catch(IOException e) {
			throw new RuntimeException(e);
		} catch(SAXException e) {
			throw new RuntimeException(e);
		}
		Map<Long,MapNode> mapNodes = new HashMap<>();
		NodeList ways = doc.getElementsByTagName("way");
		List<MapEdge> edgeList = new ArrayList<>();
		int length = ways.getLength();
		for(int i = 0;i < length;i++)
		{
			Node way = ways.item(i);
			NodeList children = way.getChildNodes();
			int numChildren = children.getLength();
			boolean isRoute = false;
			List<Long> nodeIdList = new ArrayList<>();
			for(int j = 0;j < numChildren;j++)
			{
				Node child = children.item(j);
				String childName = child.getNodeName();
				NamedNodeMap nnm = child.getAttributes();
				if(childName.equals("nd"))
				{
					long nodeId = Long.parseLong(nnm.getNamedItem("ref").getTextContent());
					nodeIdList.add(nodeId);
				} else if(childName.equals("tag")) {
					String k = nnm.getNamedItem("k").getTextContent();
					String v = nnm.getNamedItem("v").getTextContent();
					if(k.equals("highway") && permissibleHighways.contains(v))
						isRoute = true;
				}
			}
			if(isRoute)
			{
				log("found route " + i);
				for(long nodeId : nodeIdList)
				{
					if(mapNodes.get(nodeId) == null)
					{
						Node node = doc.getElementById(String.valueOf(nodeId));
						NamedNodeMap nnm = node.getAttributes();
						double lat = Double.parseDouble(nnm.getNamedItem("lat").getTextContent());
						double lon = Double.parseDouble(nnm.getNamedItem("lon").getTextContent());
						MapNode mapNode = new MapNode(lat,lon);
						adjList.put(mapNode,new ArrayList<>());
						mapNodes.put(nodeId,mapNode);
					}
				}
				int nilLength = nodeIdList.size();
				for(int j = 0;j < nilLength - 1;j++)
				{
					MapNode nodeA = mapNodes.get(nodeIdList.get(j));
					MapNode nodeB = mapNodes.get(nodeIdList.get(j + 1));
					log("edge " + nodeIdList.get(j) + " " + nodeIdList.get(j + 1));
					edgeList.add(new MapEdge(nodeA,nodeB));
				}
			}
		}
		for(MapEdge edge : edgeList)
		{
			adjList.get(edge.nodeA).add(edge);
			adjList.get(edge.nodeB).add(edge);
		}
	}
	private Map<MapNode,RouteStep> shortestPaths(MapNode start,double r) {
		PriorityQueue<RouteStep> pq = new PriorityQueue<>(256,new Comparator<RouteStep>() {
			@Override
			public int compare(final RouteStep a,final RouteStep b) {
				if(a.dist > b.dist)
					return 1;
				if(a.dist < b.dist)
					return -1;
				return 0;
			}
		});
		pq.add(new RouteStep(0,start));
		Map<MapNode,RouteStep> dist = new HashMap<>();
		dist.put(start,new RouteStep(0,null));
		while(pq.size() > 0) {
			RouteStep rs = pq.poll();
			MapNode u = rs.node;
			if(rs.dist > dist.get(u).dist)
				continue;
			for(MapEdge e : adjList.get(u)) {
				MapNode v = e.getOther(u);
				RouteStep old = dist.get(v);
				double odist;
				if(old == null)
					odist = Double.POSITIVE_INFINITY;
				else
					odist = old.dist;
				double ndist = rs.dist + e.length;
				if(ndist > r)
					continue;
				if(ndist < odist) {
					dist.put(v,new RouteStep(ndist,u));
					pq.add(new RouteStep(ndist,v));
				}
			}
		}
		return dist;
	}
	@ReactMethod public double[][] calculateRoute(double lat,double lon,double r)
	{
		MapNode start = null;
		double dist = Double.POSITIVE_INFINITY;
		for(MapNode node : adjList.keySet())
		{
			double cdist = node.distanceTo(lat,lon);
			if(dist > cdist)
			{
				start = node;
				dist = cdist;
			}
		}
		Map<MapNode,RouteStep> distStart = shortestPaths(start,r);
		List<MapNode> anchors = new ArrayList<>();
		for(Map.Entry<MapNode,RouteStep> entry : distStart.entrySet()) {
			log("dist start " + entry.getValue().dist);
			double cdist = entry.getValue().dist;
			if(r / 3 <= cdist && cdist <= r / 2)
				anchors.add(entry.getKey());
		}
		log("# of anchors " + anchors.size());
		Collections.shuffle(anchors);
		MapNode primary = null;
		MapNode secondary = null;
		Map<MapNode,RouteStep> anchorDist = null;
		for(MapNode anchor : anchors) {
			anchorDist = shortestPaths(anchor,r / 2);
			List<MapNode> possibleSecondaries = new ArrayList<>();
			for(Map.Entry<MapNode,RouteStep> entry : anchorDist.entrySet()) {
				double cdist = entry.getValue().dist + distStart.get(anchor).dist + distStart.get(entry.getKey()).dist;
				if(0.8 * r <= cdist && cdist <= r * 1.2)
					possibleSecondaries.add(entry.getKey());
			}
			log("secondaries " + possibleSecondaries.size());
			if(possibleSecondaries.size() > 0) {
				Collections.shuffle(possibleSecondaries);
				primary = anchor;
				secondary = possibleSecondaries.get(0);
				break;
			}
		}
		if(secondary == null)
			return null;
		List<MapNode> route = new ArrayList<>();
		MapNode next = secondary;
		do {
			route.add(next);
			next = anchorDist.get(next).node;
		} while(next != primary);
		next = primary;
		do {
			route.add(next);
			next = distStart.get(next).node;
		} while(next != null);
		Collections.reverse(route);
		next = secondary;
		do {
			next = distStart.get(next).node;
			if(next == null)
				break;
			route.add(next);
		} while(true);
		double[][] res = new double[2][route.size()];
		for(int i = 0;i < route.size();i++) {
			res[0][i] = route.get(i).lat;
			res[1][i] = route.get(i).lon;
		}
		return res;
	}
	@ReactMethod void getLocation(Callback successCallback) {
		((LocationManager)getCurrentActivity().getSystemService(Context.LOCATION_SERVICE)).requestSingleUpdate(LocationManager.GPS_PROVIDER,new LocationListener() {
			@Override public void onProviderDisabled(String str) { log("provider disabled: "+str); }
			@Override public void onProviderEnabled(String str) { log("provider enabled: "+str); }
			@Override public void onStatusChanged(String str,int status,Bundle extras) { log("status changed: "+str); }
			@Override public void onLocationChanged(Location loc) {
				successCallback.invoke(loc.getLatitude(),loc.getLongitude());
			}
		},null);
	}
	@ReactMethod
	public void run() {
		log("test log");
		System.out.println("test log");
		Activity act= getCurrentActivity();
		LocationManager locMan= (LocationManager)act.getSystemService(Context.LOCATION_SERVICE);
		if(!locMan.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
			toast("GPS is off and i haven't bothered prompting you to turn it on");
			//return;
		}
		log("starting location updates");
		locMan.requestLocationUpdates(
			LocationManager.GPS_PROVIDER,
			0, // minTimeMs
			0, // minDistanceM
			new LocationListener(){
				@Override public void onProviderDisabled(String str) { log("provider disabled: "+str); }
				@Override public void onProviderEnabled(String str) { log("provider enabled: "+str); }
				@Override public void onStatusChanged(String str,int status,Bundle extras) { log("status changed: "+str); }
				@Override public void onLocationChanged(Location loc) {
					log("got an update, forwarding to JS-land");
					// https://www.programcreek.com/java-api-examples/?class=com.facebook.react.bridge.WritableMap&method=putArray
					WritableMap event= Arguments.createMap();
					event.putDouble("lat",loc.getLatitude());
					event.putDouble("lon",loc.getLongitude());
					sendEvent("locUpdate",event);
				}
			}
		);
	}
}
