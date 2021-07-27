---
path: '/Member_Dashboard'
date: '2021-07-27'
title: 'Member Dashboard'
tags: ['Member_Dashboard', 'makerspace', 'rfid']
excerpt: 'Makerspace rfid fob system'
---
# High Level
The Problem with physical keys is that it's difficult to verify that someone returned their key if they stopped paying for membership.

An RFID fob system allows us to give someone a key and revoke access whenever we need to.
We should be able to automate this based on whether or not a member has paid.

## Repo
https://github.com/HackRVA/memberdashboard

### Technologies
#### Golang
[Golang](https://golang.org/) is used for backend code.

some notable libraries used: 
* [gorilla/mux](github.com/gorilla/mux) web server
* [go-guardian](github.com/shaj13/go-guardian) auth
* [paho.mqtt.golang](github.com/eclipse/paho.mqtt.golang) mqtt

#### lit-element
[lit-element](https://lit-element.polymer-project.org/guide) used for frontend.  lit-element is a library that makes it easy to create web components.

This was a pretty cool way to make a frontend.  We were able to avoid using a frontend framework entirely.  This does take a bit of discipline to keep things clean, but we ended up with very lightweight fully encapsulated custom components.  The result is a fairly snappy UI.

We also took advantage of [rxjs](https://rxjs.dev/) to make our http requests.

#### MQTT
[MQTT](https://mqtt.org/) is the pub/sub protocol used to communicate with devices on the network.

#### PostgresQL
[postgres](https://www.postgresql.org/) Database

#### mosquitto
We are using [mosquitto](https://mosquitto.org/) as an MQTT broker.

#### Docker
Docker is used as a CI/CD pipeline.
We are also now using a docker dev container to make it easy to have a consistent dev environment.  See the README in the repo for more details.

# Requirements
* Pull down member information from the payment provider
* keep a database that knows which members are active
* sync up with RFID device so that member access is up to date with the automation on the server
* allow for different groups and the ability to add different RFID devices that have different Access Control Lists (ACLs)
* allow leadership to credit a membership
* automatically determine different membership levels
* send notifications that membership is going to expire and membership is entering a grace period
* keep track of connection status of RFID devices
* don't be dependant on the network for gaining access.  Network access isn't garunteed.
* be able to determine if an ACL on a device is out of date.
* allow members to self serve their RFID tag (if they lose it, they can replace it themselves if necessary)
* be able to manually revoke a members access

# Make vs Buy
Finding a preexisting solution that would meet all of our integration needs would be difficult.
Primarily, we need something that would hook up to the Paypal API and pull down active subscriptions to determine a members status.

Typically if you go to a vendor for this kind of solution, they will want to charge a subscription fee for the service.  These vendor solutions are typically very manual. You have to manually give someone a badge/fob and manually revoke it when the time comes.  Since hackrva is a member ran organization (i.e. nobody works there), it's harder rely on humans to push the right buttons when the time comes. Automation is highly preferred.
Also, I've seen several scenarios where the manufacturer of RFID devices go out of business and you become stuck with a device with limited support.

The initial thought was to build this with highly available off the shelf parts. 
highly available off-the-shelf parts:
* esp8266
* RFID-RC522

![esp8266-rfid](https://github.com/HackRVA/memberdashboard/blob/main/resources/rfidreader/docs/basic_diagram.PNG)

I started prototyping a solution using the esp8266 in this 
[repo](https://github.com/HackRVA/memberdashboard/tree/main/resources/rfidreader).  The main principal of this prototype was that it stored an Access List locally and would sync with a server to make sure that access list was up to date.  The server would handle integration with the payment provider to automatically determine if memberships have expired.  This allows the RFID device to still grant access without relying on a network connection. Sending a web request would likely cause some delay and it's not guaranteed to be available.

This worked well in concept, but it would have taken a fair amount of time and there was plenty of work to be done on the server solution.  While I was working on this, I discovered an open source project that had a reasonably mature codebase and several people were already using it.  It seemed to meet most of our needs for the device and they offer a reasonably priced PCB that you can just buy.  The PCB (printed circuit board) isn't an off the shelf part, but if we needed to, we could build it from scratch using an esp8266, a RC-522 RFID reader, and a small relay.
[esprfid](https://github.com/esprfid/esp-rfid)

# Hardware Installation
The PCB made the hardware installation fairly simple.  Since the RFID reader is a separate device, I had to route copper wire from the esp8266 PCB through the door (to the outside) and to the RFID reader (the RC-522).  we could have had the PCB outside the door, but this would have allowed someone to open the faceplate and bridge a few connections to gain access.  The RFID reader communicates with the eps8266 PCB via a digital connection.  So, it's much harder than just bridging some connections to break in.

# Buzzer
After installing the RFID reader, I noticed people were swiping several times before actually opening the door.  I attributed this toward the fact that there was no feedback given to the user.  There was nothing telling them that their swipe was successful.  I added a piezo buzzer that activated when a successful swipe was made.  It's a subtle beep, but now it's fairly uncommon for someone to swipe more than once before they open the door.

# Conclusion
This project is continuously developed so as we find more things to improve or integrate, we write some code and it gets deployed immediately.