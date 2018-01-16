ttab -t "Frontend sbt" "sbt ~reduxClient/packageForNpm"
ttab -t "Frontend dev-server" "cd web && npm run dev-server"
open "http://localhost:8080"
