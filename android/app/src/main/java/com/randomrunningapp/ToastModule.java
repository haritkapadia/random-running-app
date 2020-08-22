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
			@Override
			public void onProviderDisabled(String str) {
				toast("provider disabled: "+str);
			}
			@Override
			public void onProviderEnabled(String str) {
				toast("provider enabled: "+str);
			}
			@Override
			public void onStatusChanged(String str,int status,Bundle extras) {
				toast("status changed: "+str);
			}
			@Override
			public void onLocationChanged(Location loc) {
				try {
					toast("lat:"+loc.getLatitude()+", long: "+loc.getLongitude());
					// URL looks like this: http://www.overpass-api.de/api/xapi_meta?*[bbox=11.5,48.1,11.6,48.2]
					double d= .01;
					String url= "http://www.overpass-api.de/api/xapi_meta?*[bbox="
						+ (loc.getLongitude()-d)+","
						+ (loc.getLatitude()-d)+","
						+ (loc.getLongitude()+d)+","
						+ (loc.getLatitude()+d)
					+"]";
					log("creating BufferedInputStream wth URL: "+url);
					BufferedInputStream iStream= new BufferedInputStream(new URL(url).openStream());
					// start parsing the xml
					DocumentBuilderFactory dbf= DocumentBuilderFactory.newInstance();
					DocumentBuilder db= dbf.newDocumentBuilder();
					log("parsing!");
					Document doc= db.parse(iStream);
					log("parsed!");
					// build an index of nodes
					Map<String,Node> nodeMap= new HashMap<String,Node>(){{
						NodeList nodes= doc.getElementsByTagName("node");
						for(int i=0;i<nodes.getLength();++i) {
							String id= nodes.item(i).getAttributes().getNamedItem("id").getTextContent();
							log("node id: "+id);
							put(id,nodes.item(i));
						}
					}};
					// what types of roads are people allowed to jog on? (https://wiki.openstreetmap.org/wiki/Key:highway)
					Set<String> permissibleHighways= new HashSet<String>(){{
						addAll(Arrays.asList(new String[]{
							"tertiary","unclassified","residential","tertiary_link","living_street","pedestrian","footway","steps"
						}));
					}};
					NodeList nodes= doc.getElementsByTagName("way");
					for(int i=0;i<nodes.getLength();++i) {
						String id= nodes.item(i).getAttributes().getNamedItem("id").getTextContent();
						log("way id= "+id);
						log("way name="+nodes.item(i).getNodeName());
						NodeList childs= nodes.item(i).getChildNodes();
						log("childs.getLength(): "+childs.getLength());
						for(int j=0;j<childs.getLength();++j) {
							Node child= childs.item(j);
							//log("child name: "+child.getNodeName());
							if(!child.getNodeName().equals("tag")) {
							//	log("not a tag");
								continue;
							}
							log("child is a tag");
							NamedNodeMap nm= child.getAttributes();
							log("nm: "+nm);
							for(int k=0;k<nm.getLength();++k)
								log("key: "+nm.item(k));
							String highway= nm.getNamedItem("k").getTextContent();
							log("highway: "+highway);
							if(!permissibleHighways.contains(highway)) {
								log("can't jog here");
								continue;
							}
							log("can jog here");
						}
					}
					toast("done");
				} catch(MalformedURLException e) {
					log("malformed URL");
				} catch(IOException e) {
					log("couldn't open stream");
				} catch(ParserConfigurationException e) {
					log("couldn't create new document builder");
				} catch(SAXException e) {
					log("SAXException while parsing xml");
				}
			}
		},null);
	}
}
