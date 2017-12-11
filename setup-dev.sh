sbt reduxClient/packageForNpm
pushd redux-client/target/npm && npm link
popd
cd web && npm link intake24-redux-client
echo -e "\n\033[0;32mDone!\033[0m\n"
