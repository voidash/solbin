/*
 * This is SOLBIN for Ku hackfest project
 */


//library imports
#include <Servo.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>


//for get and post request
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WifiClient.h>

const char* ssid = "TP-Link_6DE6";
const char* password = "AAAAPH69";

String serverName = "http://solanabin.pythonanywhere.com";
String uid = "1a77d81f-4ed4-45f0-bdf6-c8980cbfac1e";
// for nodemcu pins 
#define D0 16
#define D1 5
#define D2 4
#define D3 0
#define D4 2
#define D5 14
#define D6 12
#define D7 13
#define D8 15


// we have sensors
/*
 * hx711 : 
 * d7 is connected to SCK
 * d6 is connected to DT
 * 
 * two servo motors
 * one PWM pin is connected to D8
 * another servo PWM pin is connected to d5
 * 
 * LCD pin 
 * D3 SDL
 * D4 SDA
 * 
 * ultrasonic pins
 * ECHO d1
 * TRIGGER d2
 */


 Servo servo1;
 Servo servo2;
 int angle;
 LiquidCrystal_I2C lcd(0x3F, 16, 2);

unsigned long lastTime = 0;
 // for nodemcu

void lcdSetup() {

 lcd.begin();
 lcd.home();
 lcd.print("Hello, NodeMCU"); 
}
void setupWifi() {
  WiFi.begin(ssid,password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void attachServo() {
  servo1.attach (D8);  
  servo2.attach (D5);
  servo1.write(180);
  servo2.write(0);
}

void openDustbin() {
  int posn = 180;
    for (posn = 180; posn >=90; posn -= 1)            // goes from 0 degrees to 180 degrees
 {                                                                       // in steps of 1 degree
    servo1.write (posn);
    servo2.write(180-posn);// tell servo to go to position in variable 'pos'
    delay (10);                                       // waits 10ms for the servo to reach the position
  }
}

void closeDustbin(){
  int posn = 90;
      for (posn = 90; posn <=180; posn += 1)            // goes from 0 degrees to 180 degrees
 {                                                                       // in steps of 1 degree
    servo1.write (posn);
    servo2.write(180-posn);// tell servo to go to position in variable 'pos'
    delay (10);                                       // waits 10ms for the servo to reach the position
  }
}
 
void setup() {
  Serial.begin(115200);
  setupWifi();
  //attachServo();

}

// the loop function runs over and over again forever
void loop() {
  if((millis() - lastTime) > 5000) {
    if(WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;
     
       String serverPath = serverName + "/should_open_dustbin/" + uid + "/";
       Serial.println(serverPath);
       http.begin(client, serverPath.c_str());
       int httpResponseCode = http.GET();

        if(httpResponseCode == 200) {
          String payload = http.getString();
          Serial.println(payload);
          if(payload.indexOf("open") > 0){

            // if we want to open the dustbin
           // openDustbin();
           
            
//            for(int i =0; i <= 12; i++) {
//            
//               // get the load sensor value
//            // get the height using ultrasonic sensor
//            // show it on our LCD
// delay(5000);
//              
//            }
            http.end();
         
            String postServerPath = serverName + "/unit_value_history/" + uid + "/";
              http.begin(client,postServerPath);
              http.addHeader("Content-Type","application-json");
              String httpRequestData="{\"weight_value\":4, \"height_value\": 9, \"redeemed\": false}";
              int postResponseCode = http.POST(httpRequestData);
              if(postResponseCode == 201) {
                Serial.println("successfully sent data");
              }else{
                Serial.println(http.getString());
              }
              Serial.println(postResponseCode);
            Serial.println("it means open");
          }
          
        }else{
          Serial.println(httpResponseCode);
        }
        http.end();
       
    }else{
      Serial.println("wifi is disconnected");
    }
    lastTime = millis();
  }
}
