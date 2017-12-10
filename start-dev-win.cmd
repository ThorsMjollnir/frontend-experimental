start cmd /c "sbt ~reduxClient/packageForNpm"
start cmd /c "cd web && npm run dev-server"
start explorer "http://localhost:8080"
