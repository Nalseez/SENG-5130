# Overview

This is a quick application I made that utilizes Express.js + Node.js + postgreSQL.

## High-Level Description

1) Reads moisture-sensor readings from Pub/Sub subscription
2) Stores them in postgreSQL
3) For each input event, evaluates if a watering event needs to be triggered. (pretty primitive TBH)
4) If a watering event should be triggered, utilize Dev's Particle Cloud Basic Auth to get OAuth2 Access Token to Particle Cloud, then publish a toggle on event

## Local setup

Ha!

0) Have your Argon publishing to Particle Cloud + have Particle Cloud Integration to GCP Pub/Sub topic

1) Start postgreSQL
2) Start event-hub
3) ????
4) Profit

## GKE setup
