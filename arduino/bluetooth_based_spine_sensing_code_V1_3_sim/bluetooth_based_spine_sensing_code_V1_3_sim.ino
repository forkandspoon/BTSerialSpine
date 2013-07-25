
/*

 V1 Spine Sensing Interface code
 Based on the SoftwareSerialExample example code from arduino.
 Overall Goal: 
 Bluetooth Serial Comms to mobile device
 Simple extensible protocol (CSV based, but with empahsis on human readability)
 Sense and report state or readings from ADC and digi IO if needed   
 Long run time
 
 Current Goal:
 Sense directly 5 ADCs readings and spit it out
 Just stick to simple methods for now, and aim for elegance later
 
 */

#include <SoftwareSerial.h>
#define DEBUG 1

// Preconfiger the software serial interface to the bluetooth serial module
SoftwareSerial btSerial(15,14); // RX, TX (pin 10 and 11 is supported in both arduino leonardo and arduino uno and others)

//
int i = 0;

// Send to all serial devices connected (How do i make this work for integers?)
void sendSerial( String str ){
  Serial.print(str);
  btSerial.print(str);

}

void setup(){
  // Normal Serial interface for debug purpose opened.
  Serial.begin(9600);
  // waiting for serial port to connect. Only required for leonardo  
  // Bluetooth Serial Interface activated
  btSerial.begin(9600);

  //Delay to settle serial interface
  delay(1000) ;
  Serial.println("Serial Console Online");  
  btSerial.println("BTSerial Console Online");  
  delay(1000) ;

  // Analog multiplexer digital pin set - JD
  pinMode(1, OUTPUT); // s0
  pinMode(2, OUTPUT); // s1
  pinMode(3, OUTPUT); // s2
  pinMode(4, OUTPUT); // s3
  // end - JD

}

void loop(){
  
  Serial.print("[5,0,15,0,20,2,50,1]");
  btSerial.print("[5,0,15,0,20,2,50,1]");
  sendSerial("\n");
  
  delay(500);
  
  Serial.print("[8,0,13,0,15,3,40,2]");
  btSerial.print("[8,0,13,0,15,3,40,2]");
  sendSerial("\n");
  
  delay(500);
  
  Serial.print("[2,1,9,2,5,5,28,2]");
  btSerial.print("[2,1,9,2,5,5,28,2]");
  sendSerial("\n");
  
  delay(500);
  
  Serial.print("[1,2,2,9,5,5,2,28]");
  btSerial.print("[1,2,2,9,5,5,2,28]");
  sendSerial("\n");
  
  delay(500);
  
  Serial.print("[0,8,0,13,3,15,2,40]");
  btSerial.print("[0,5,0,15,20,2,50,1]");
  sendSerial("\n");

  delay(500); // give ADC time to settle

}



