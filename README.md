# Personal Site Version 4

## Overview

A sleek, open-source portfolio template for developers, built with HTML, CSS, and JS. Features sections for an introduction, resume, portfolio, and contact info.

## Methodology

This code intendes to follow a simple, modular approach, ensuring that the code is easy to understand and well-commented. This makes it straightforward to update or change components according to personal needs or preferences.


## Quick Setup with Docker 🚢

Getting this code up and running is as easy as:

1. __Installing Docker__: If you haven't already, you'll need to install Docker on your machine. Find the installation guide for your OS [here](https://docs.docker.com/engine/install/).

2. __Cloning This Repo__: Clone this repo to your local system:

    ```bash
    git clone https://github.com/ambercaravalho/personal-site-v4
    ```

3. __Customize__: Before deploying, make sure to personalize the content. This template is a starting point - your content brings it to life.

4. __Running the Dockerfile__: Navigate to the code's root directory in your terminal and run:

    ```bash
    docker build -t personal-site-v4 .
    docker run -d -p 80:80 --restart unless-stopped personal-site-v4
    ```

Voilà! 🥳 You should now have the portfolio running on `http://localhost`. 

Other devices can access the site through your system's IP address (e.g., `http://192.168.1.25`).