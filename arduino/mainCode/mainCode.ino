/*
 * This is SOLBIN for Ku hackfest project
 */


//library imports
#include <Servo.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

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
 Servo s1;
 Servo s2;
 int angle;
 LiquidCrystal_I2C lcd(0x27, 16, 2);

 // for nodemcu

void lcdSetup() {
 Wire.begin(D3,D4);
 lcd.begin();
 lcd.home();
 lcd.print("Hello, NodeMCU"); 
}

void attachServo() {
  s1.attach(D8);
  s2.attach(D5);
  s1.write(0);
  s2.write(0);
}
void rotateServo(int start, int stop, bool shouldIncrease) {
  if(shouldIncrease) {
  for(angle = start; angle < stop; angle=angle+1)  
  {                                  
    s1.write(angle);               
    s2.write(angle);
    delay(15);                   
  } 
  }else {
    for(angle = start; angle > stop; angle=angle-1)  
  {                                  
    s1.write(angle);               
    s2.write(angle);
    delay(15);                   
  } 
  }
}

 
void setup() {
  Serial.begin(115200);
  //attachServo();
  lcdSetup();
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
}

// the loop function runs over and over again forever
void loop() {
  
  digitalWrite(LED_BUILTIN, LOW);   // Turn the LED on (Note that LOW is the voltage level
  // but actually the LED is on; this is because
  // it is active low on the ESP-01)
 
  delay(1000);                      // Wait for a second
  digitalWrite(LED_BUILTIN, HIGH);
 
  // Turn the LED off by making the voltage HIGH
  delay(1000);                      // Wait for two seconds (to demonstrate the active low LED)
}
