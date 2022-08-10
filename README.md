# TFMS

TFMS: Traffic Flow Monitoring System at Tsinghua

## Description

This repository contains code for TFMS, a WeChat mini program realizing real-time pedestrian and bicycle flow monitoring on Tsinghua campus arterial roads and providing users with route suggestions to avoid congestion.

The frontend is developed using WXML, WXSS and JavaScript, in a framework provided by WeChat with access to its APIs. WXML and WXSS are similar to HTML and CSS, but are specific to WeChat mini programs. The backend is developed using python, and it utilizes YOLOv5 algorithm to detect the traffic flow in campus surveillance videos.

## Demo

### Login and Authorization

<p align="center" width="100%">
    <img src="pics/Login.png" style="width: 200px" />
</p>

When users login for the first time, they need to authorize with their WeChat account. There is also a special button for administrators to login.

### Main Interface

The navigation bar on the bottom of the page contains three tabs: navigation, query and information.

<p align="center" width="100%">
    <img src="pics/Navigation1.png" style="width: 200px" />
    <img src="pics/Navigation2.png" style="width: 200px" />
</p>

The navigation page initially shows the campus map and waits for users' further instructions to provide route suggestions. The start point of the navigation is automatically set to the current place of the user. The text box on the screen prompts the user to enter the destination. Then the app will color the suggested route on the map. If the route goes through some congestion zone, there will be a pop-up window warning the user.

<p align="center" width="100%">
    <img src="pics/Query.png" style="width: 200px" />
</p>

On the query page, users can click on specific red marks on the map to check the traffic flow of places of interest.

<p align="center" width="100%">
    <img src="pics/Info.png" style="width: 200px" />
</p>

The information page shows the most recent update of the traffic flow information on the whole campus as a list.

### Administrator

<p align="center" width="100%">
    <img src="pics/Administrator1.png" style="width: 150px" />
    <img src="pics/Administrator2.png" style="width: 150px" />
    <img src="pics/Administrator3.png" style="width: 150px" />
</p>

The administrator can check the real-time traffic flow and time of update of every monitoring points. He can also manually change the data to tackle emergency situations such as disconnection from backend server.
