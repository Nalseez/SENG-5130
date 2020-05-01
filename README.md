# Overview

This is a quick application I made that utilizes Express.js + Node.js + postgreSQL.

## High-Level Description

1) Reads moisture-sensor readings from Pub/Sub subscription
2) Stores them in postgreSQL
3) For each input event, evaluates if a watering event needs to be triggered. (pretty primitive TBH)
4) If a watering event should be triggered, utilize Dev's Particle Cloud Basic Auth to get OAuth2 Access Token to Particle Cloud, then publish a toggle on event
