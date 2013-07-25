
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
SoftwareSerial btSerial(10,11); // RX, TX (pin 10 and 11 is supported in both arduino leonardo and arduino uno and others)

//
int i = 0;

// analogmux start - JD
int r0 = 0;
int r1 = 0;
int r2 = 0;
int r3 = 0;
int analogMuxCount = 0; // for counter
int analogMuxRead = 0; // recorded result value from analogmux output
int analogMuxReadPin = 5; // pin connected from output of mux into arduino analog pin
// analogmux end - JD

// Send to all serial devices connected (How do i make this work for integers?)
void sendSerial( String str ){
  Serial.print(str);
  btSerial.print(str);

}

void setup(){
  // Normal Serial interface for debug purpose opened.
  Serial.begin(9600);
  while (!Serial){;} // waiting for serial port to connect. Only required for leonardo  
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
    
    for( i=0 ; i <= 7 ; i++){
      btSerial.print("ADC");
      btSerial.print(i);
      btSerial.print(": ");
      btSerial.print(analogRead(i));
      btSerial.print(" : ");
      btSerial.print( analogRead(i) - 1024/2 );
      btSerial.print(", ");
      
    }
    
    
    if(DEBUG){
      for( i=0 ; i <= 7 ; i++){
        Serial.print("ADC");
        Serial.print(i);
        Serial.print(": ");
        Serial.print(analogRead(i));
        Serial.print(" : ");
        Serial.print( analogRead(i) - 1024/2 );
        Serial.print(" : ");
        // Assuming it bends from 30deg to 30deg both sides (total assumed swing at 60 degrees total)
        //Serial.print( map(analogRead(i), 0, 1024, -30, 30) );
        Serial.print( -0.1025*(analogRead(i) - 1024/2));
        Serial.print(", ");
      }
    }
    
    for (analogMuxCount = 0; analogMuxCount <=8; analogMuxCount++){ // analogmux read side sensor start - JD
      
      // select bit
      r0 = bitRead(analogMuxCount, 0);
      r1 = bitRead(analogMuxCount, 1);
      r2 = bitRead(analogMuxCount, 2);
      r3 = bitRead(analogMuxCount, 3);
      
      digitalWrite(1, r0);
      digitalWrite(2, r1);
      digitalWrite(3, r2);
      digitalWrite(4, r3);
      
      analogMuxRead = analogRead(analogMuxReadPin);
      
      if(DEBUG){
        Serial.print("SideS");
        Serial.print(analogMuxCount);
        Serial.print(": ");
        Serial.print(analogMuxRead);
        Serial.print(", ");
      }else{
        btSerial.print("SideS");
        btSerial.print(analogMuxCount);
        btSerial.print(": ");
        btSerial.print(analogMuxRead);
        btSerial.print(", ");        
      }   
    }     // analogmux read side sensor end - JD
    
    
  sendSerial("\n");
  
  delay(2); // give ADC time to settle
  
}


