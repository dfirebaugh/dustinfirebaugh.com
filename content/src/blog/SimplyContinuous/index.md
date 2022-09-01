---
path: '/SimplyContinuous'
date: '2021-07-31'
title: 'A simple pipeline to deploy your code'
tags: ['CI/CD']
excerpt: ''
---

# Overview
This is a basic pipeline that facilitates continuous deployment.
i.e. commit something to the main branch and it deploys that code to production.

The general pipeline for this setup is as follows:
1. write some code
2. commit to main branch
3. a github action will build and publish a new image to dockerhub
4. a docker container running on the production server frequently checks dockerhub to see if a new image has been published. If it sees a new image, it will pull it down and run it.

The downtime when deploying new code is so minimal that a user probably wouldn't even notice that a deployment happened.

The repo that I have this pipeline set up in is https://github.com/HackRVA/memberdashboard

# Dockerhub
Dockerhub is a public registry for hosting docker images.  You will need to create an account here.

You can follow instructions on how to setup credentials on dockerhub [here](https://docs.docker.com/ci-cd/github-actions/#set-up-a-docker-project).

# Github
In your github repo, you will need to create secrets for authenticating to dockerhub.

1. Navigate to your repo in the browser.
2. Click settings
3. Click secrets
4. Click the `Add Repository Secret` button

Do this for both `DOCKER_PASSWORD` and `DOCKER_USERNAME`

## Github action

[./.github/workflows/main.yml](https://github.com/HackRVA/memberdashboard/blob/main/.github/workflows/main.yml)
```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      
      - name: Publish to Registry
        uses: elgohr/Publish-Docker-Github-Action@master
        with:
          name: hackrva/memberserver
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
```

# Production Environment

The docker-compose used in our production environment can be seen here: https://github.com/HackRVA/HackRVA-docker-infrastructure/blob/master/docker-compose.yml

the `label` on `memberserver` is what tells watchtower to track it.

```yaml
version: '2'
    networks:
        hackrva:
            driver: bridge
    services:
        memberserver:
            image: hackrva/memberserver:latest
            env_file:
            - ./memberserver.env
            networks:
            hackrva:
                aliases:
                - memberserver
            labels:
            - "com.centurylinklabs.watchtower.enable=true"
        watchtower:
            command: --label-enable --cleanup --interval 300
            image: containrrr/watchtower
            labels:
            - "com.centurylinklabs.watchtower.enable=true"
            network_mode: none
            restart: always
            volumes:
            - /var/run/docker.sock:/var/run/docker.sock
```