/*
 * This is SOLBIN for Ku hackfest project
 */


//library imports
#include <Servo.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Arduino.h>
#include "HX711.h"

//for get and post request
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WifiClient.h>

const char* ssid = "TP-Link_6DE6";
const char* password = "AAAAPH69";

const int LOADCELL_DOUT_PIN = 12;
const int LOADCELL_SCK_PIN = 13;

HX711 scale;


int duration;
int distance;
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
 const int trigP = 0;  //D3 Or GPIO-2 of nodemcu
 const int echoP = 2;  //D4 Or GPIO-0 of nodemcu
 int posn=0;
 int angle;
 LiquidCrystal_I2C lcd(0x3F, 16, 2);

unsigned long lastTime = 0;
 // for nodemcu

void ultrasonicSetup() {
  pinMode(trigP, OUTPUT);
  pinMode(echoP, INPUT);
}

void lcdSetup() {

 lcd.begin();
 lcd.home();
 lcd.print("Hello, NodeMCU"); 
}

int getDistanceFromUltrasonic() {
  
digitalWrite(trigP, LOW);   // Makes trigPin low
delayMicroseconds(2);       // 2 micro second delay 

digitalWrite(trigP, HIGH);  // tigPin high
delayMicroseconds(10);      // trigPin high for 10 micro seconds
digitalWrite(trigP, LOW);   // trigPin low

duration = pulseIn(echoP, HIGH);   //Read echo pin, time in microseconds
distance= duration*0.034/2;        //Calculating actual/real distance
return distance;
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
  Serial.println("opening Dustbin");
  int posn = 180;
    for (posn = 180; posn >=90; posn -= 1)            // goes from 0 degrees to 180 degrees
 {                                                                       // in steps of 1 degree
    servo1.write (posn);
    servo2.write(180-posn);// tell servo to go to position in variable 'pos'
    delay (5);                                       // waits 10ms for the servo to reach the position
  }
}

void closeDustbin(){
  Serial.println("closing dustbin");
  int posn = 90;
      for (posn = 90; posn <=180; posn += 1)            // goes from 0 degrees to 180 degrees
 {                                                                       // in steps of 1 degree
    servo1.write (posn);
    servo2.write(180-posn);// tell servo to go to position in variable 'pos'
    delay (5);                                       // waits 10ms for the servo to reach the position
  }
}


void setup() {
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  ultrasonicSetup();
  setupWifi();
  attachServo();
  Serial.begin(115200);
  
  
            
  scale.set_scale(2.0052);
 
                       // this value is obtained by calibrating the scale with known weights; see the README for details

}

//void loop() {
//  delay(5000);
//  openDustbin();
//  delay(5000);
//  closeDustbin(); 
//  delay(1000);
//  int i = getDistanceFromUltrasonic();
//  delay(1000);
//   Serial.println(i);
//   Serial.println("data from scale");
//
//}






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
            bool weightAdded = false;
            float m = 0;
            int b_height = 0;
            for(int i =0; i <= 12; i++) {
              float k =  scale.read_average(20); //get load sensor value
              if(abs(k-m) > 300) {
                // weight was added
                weightAdded = true;
                break;
              }
              delay(1000);
            int height = getDistanceFromUltrasonic(); // get the height using ultrasonic sensor
            
            if(abs(height-b_height) > 3) {
              delay(100);
              height = getDistanceFromUltrasonic();
              if(abs(height-b_height) > 3) {
                weightAdded = true;
                break;
              }
            }
            m = k;
            b_height = height;
            delay(5000);
            }
            if(weightAdded) {
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
            closeDustbin();
          }
          
        }else{
          Serial.println(httpResponseCode);
        }
    }
        http.end();
       
    }else{
      Serial.println("wifi is disconnected");
    }
    lastTime = millis();
  }
}
