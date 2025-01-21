#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "dmow";
const char* password = "jA3kvD26p$14";

String doorStatusEndpoint = "http://drzwi.live:3000/status";
String doorCloseEndpoint = "http://drzwi.live:3000/close";

unsigned long lastTime = 0;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 1000;

const int PILOT = 0;

void setup() {
  pinMode(PILOT, OUTPUT);
  digitalWrite(PILOT, LOW);
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      String serverPath = doorStatusEndpoint + "?userName=admin&password=admin";
      bool openTheDoor = false;
      
      http.begin(client, serverPath.c_str());
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
        if(payload == "OPEN") openTheDoor = true;
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();

      if(openTheDoor) {
        digitalWrite(PILOT, HIGH);
        delay(100);
        digitalWrite(PILOT, LOW);

        serverPath = doorCloseEndpoint + "?userName=admin&password=admin";

        http.begin(client, serverPath.c_str());
        httpResponseCode = http.GET();
        
        if (httpResponseCode>0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.print("Error code: ");
          Serial.println(httpResponseCode);
        }
        // Free resources
        http.end();
      }
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
