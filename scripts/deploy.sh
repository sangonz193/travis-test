eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | base64 -di > sshkey
echo "" >> sshkey
cat sshkey | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "" >> ./.env
echo "APP_VERSION=$TRAVIS_TAG" >> ./.env
cat .env
echo "$PRIVATE_HOST_KEY" | base64 -di > ~/.ssh/known_hosts
ssh openfing@openfing.fing.edu.uy 'rm -rf ~/openfing/preview; mkdir ~/openfing/preview'
rsync -vaz -e ssh dist/ openfing@openfing.fing.edu.uy:~/openfing/preview