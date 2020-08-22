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
			double radius = 6371;
			double dlat = Math.toRadians(nodeB.lat - nodeA.lat);
			double dlon = Math.toRadians(nodeB.lon - nodeA.lon);
			double sdlat = Math.sin(dlat / 2);
			double sdlon = Math.sin(dlon / 2);
			double a = sdlat * sdlat + Math.cos(Math.toRadians(nodeA.lat)) * Math.cos(Math.toRadians(nodeB.lat)) * sdlon * sdlon;
			double c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));
			length = radius * c;
		}
		public MapNode getOther(MapNode node)
		{
			return node == nodeA ? nodeB : nodeA;
		}
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
			return;
		}
		toast("getting location...");
		// https://stackoverflow.com/questions/7979230/how-to-read-location-only-once-with-locationmanager-gps-and-network-provider-a
		locMan.requestSingleUpdate(LocationManager.GPS_PROVIDER,new LocationListener() {
			@Override public void onProviderDisabled(String str) { log("provider disabled: "+str); }
			@Override public void onProviderEnabled(String str) { log("provider enabled: "+str); }
			@Override public void onStatusChanged(String str,int status,Bundle extras) { log("status changed: "+str); }
			private boolean initialized = false;
			private Map<MapNode,List<MapEdge>> adjList = new HashMap<>();
			private void maybeInit(Location loc) {
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
//				try {
					toast("lat:"+loc.getLatitude()+", long: "+loc.getLongitude());
/*				} catch(MalformedURLException e) {
					throw new RuntimeException(e);
				} catch(IOException e) {
					log("couldn't open stream");
				}*/
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
				Map<Integer,MapNode> mapNodes = new HashMap<>();
				NodeList ways = doc.getElementsByTagName("way");
				List<MapEdge> edgeList = new ArrayList<>();
				int length = ways.getLength();
				for(int i = 0;i < length;i++)
				{
					Node way = ways.item(i);
					NodeList children = way.getChildNodes();
					int numChildren = children.getLength();
					boolean isRoute = false;
					List<Integer> nodeIdList = new ArrayList<>();
					for(int j = 0;j < numChildren;j++)
					{
						Node child = children.item(j);
						String childName = child.getNodeName();
						NamedNodeMap nnm = child.getAttributes();
						if(childName.equals("nd"))
						{
							int nodeId = Integer.parseInt(nnm.getNamedItem("ref").getTextContent());
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
						for(int nodeId : nodeIdList)
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
			@Override
			public void onLocationChanged(Location loc) {
				//maybeInit(loc);
				toast("test");
			}
		},null);
	}
}
