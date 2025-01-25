#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "dmow";
const char* password = "jA3kvD26p$14";

String doorStatusEndpoint = "http://drzwi.live:3000/status?password=__arduino";
String doorCloseEndpoint = "http://drzwi.live:3000/report-opened?password=__arduino";

unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

const int PILOT = 0;

void setup() {
  pinMode(PILOT, OUTPUT);
  digitalWrite(PILOT, LOW);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 1 second (timerDelay variable), it will take 1 second before publishing the first reading.");
}

// Function to send an HTTP GET request and return the response code and payload
int sendHttpRequest(String url, String& responsePayload) {
  WiFiClient client;
  HTTPClient http;

  http.begin(client, url.c_str());
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    responsePayload = http.getString();
    Serial.println(responsePayload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    responsePayload = "";
  }
  http.end();
  return httpResponseCode;
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    if (WiFi.status() == WL_CONNECTED) {
      String response;
      int doorStatusResponseCode = sendHttpRequest(doorStatusEndpoint, response);

      if (doorStatusResponseCode > 0) {
        if (response == "PENDING_OPEN") {
          digitalWrite(PILOT, HIGH);
          delay(100);
          digitalWrite(PILOT, LOW);

          int doorCloseResponseCode = sendHttpRequest(doorCloseEndpoint, response);
        }
      }
    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}