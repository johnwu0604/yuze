#!/usr/bin/env bash

set -e

# Update apt-get
echo "Updating apt-get..."
sudo apt-get update

# Install Dependencies
echo "Installing dependencies"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y --no-install-recommends nodejs
sudo npm install -g @angular/cli
sudo apt-get clean
sudo rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo mkdir -p /data/db
sudo chmod -R go+w /data/db
