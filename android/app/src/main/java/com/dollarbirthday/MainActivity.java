package com.dollarbirthday;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.widget.ImageView;

import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import android.content.Intent;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DollarBirthday";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {


      //  RCTSplashScreen.openSplashScreen(this);
        RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);
        super.onCreate(savedInstanceState);
        

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
