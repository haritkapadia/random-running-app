// ToastModule.java
package com.RandomRunningApp;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.*;
import android.os.*;
import android.app.*;
import android.content.*;
import android.location.*;
import androidx.core.app.ActivityCompat;
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
	@ReactMethod
	public void run() {
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
				toast("lat:"+loc.getLatitude()+", long: "+loc.getLongitude());
				// use the location here
			}
		},null);
	}
}
