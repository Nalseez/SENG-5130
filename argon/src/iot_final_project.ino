/*
 * Project iot_final_project
 * Description:
 * Author: Nalseez Duke
 * Date: 05/01/2020
 */


int moisture_pin = A5;
int analog_reading = 0;
int voltage = 0;

int waterpump_pin = D6;


void setup() {
    Particle.subscribe("toggle-water-pump", toggleWaterPump, ALL_DEVICES);
    pinMode(waterpump_pin, OUTPUT);
    pinMode(moisture_pin, INPUT);
    Serial.begin(115200);
    
}

void loop() {
    
    analog_reading = analogRead(moisture_pin);
    Serial.print("Analog reading in counts is: "); Serial.println(analog_reading);
    voltage = (analog_reading * 3300) / 4096;
    Serial.print("Reading in millivolts is: "); Serial.println(voltage);

    Particle.publish("moisture-sensor-reading", String(voltage), PRIVATE);

    // Wait 60 seconds
    delay(60000);
}

void toggleWaterPump(const char *event, const char *data){

    if (String(data).equals("turn-on")){
        digitalWrite(waterpump_pin, HIGH);

    } else if(String(data).equals("turn-off")){
        digitalWrite(waterpump_pin, LOW);
    } else {
        Serial.print("Unknown input from integration: "); Serial.println(String(data));
    }
}