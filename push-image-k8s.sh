. ./kube-clean.sh
microk8s ctr images rm localhost:32000/music-search:v0.1
docker build . -t localhost:32000/music-search:v0.1
docker push localhost:32000/music-search:v0.1
. ./deploy.sh
