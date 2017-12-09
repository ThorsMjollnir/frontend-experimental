
lazy val scalaHttpJS = project.in(file("RosHTTP"))

lazy val apiSharedJS = project.in(file("api-shared"))

lazy val apiClientJS = project.in(file("api-client"))

lazy val reduxClient = project.in(file("redux-client"))

lazy val frontendExperimental = project.in(file("."))
  .aggregate(scalaHttpJS, apiSharedJS, apiClientJS, reduxClient)

onLoad.in(Global) ~= { f => s => ResolveInternalDependencies.resolveInternalDependenciesImpl(f(s)) }