Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/xenial64"
    config.vm.provider "virtualbox" do |v|
        v.memory = 1024
        v.cpus = 1
    config.vm.network "private_network", ip: "192.168.100.100"
    #config.vm.network "forwarded_port", guest: 5000, host: 8000
    #config.vm.network "forwarded_port", guest: 4200, host: 3000
    end
end
