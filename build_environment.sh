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

