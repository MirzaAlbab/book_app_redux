package com.bookapp__redux;
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);  // here
        super.onCreate(savedInstanceState);
    }
    @Override
  protected String getMainComponentName() {
    return "bookapp__redux";
  }
} 

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  
  
