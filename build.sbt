
// lazy val scalaHttpJS = project.in(file("RosHTTP"))

lazy val apiSharedJS = project.in(file("api-shared"))

lazy val apiClientJS = project.in(file("api-client"))

lazy val scalajsRedux = project.in(file("scalajs-redux"))

lazy val reduxClient = project.in(file("redux-client"))//.settings(scalacOptions ++= Seq("-Ymacro-debug-lite", "-Xprint:", "-Yshow-trees-compact"))

lazy val frontendExperimental = project.in(file("."))
  .aggregate(apiSharedJS, apiClientJS, scalajsRedux, reduxClient)

onLoad.in(Global) ~= { f => s => ResolveInternalDependencies.resolveInternalDependenciesImpl(f(s)) }