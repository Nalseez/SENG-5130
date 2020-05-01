/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "/home/user/Desktop/iot_final/iot_final_project/src/iot_final_project.ino"
/*
 * Project iot_final_project
 * Description:
 * Author: Nalseez Duke
 * Date: 05/01/2020
 */


void setup();
void loop();
#line 9 "/home/user/Desktop/iot_final/iot_final_project/src/iot_final_project.ino"
int moisture_pin = A5;

int analog_reading = 0;
int voltage = 0;


void setup() {
    pinMode(moisture_pin, INPUT);
    Serial.begin(115200);
    
}

void loop() {
    
    analog_reading = analogRead(moisture_pin);
    Serial.print("Analog reading in counts is: "); Serial.println(analog_reading);
    voltage = (analog_reading * 3300) / 4096;
    Serial.print("Reading in millivolts is: "); Serial.println(voltage);


}