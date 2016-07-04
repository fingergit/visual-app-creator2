/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  //var ngVer = '@2.0.0-rc.3'; // lock in the angular package version; do not let it float to current!
  //var routerVer = '@3.0.0-alpha.7'; // lock router version
  //var formsVer = '@0.1.1'; // lock forms version

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app',

    '@angular':                   'node_modules/@angular', // sufficient if we didn't pin the version
    '@angular/router':            'node_modules/@angular/router',
    '@angular/forms':             'node_modules/@angular/forms',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api', // get latest
    'rxjs':                       'node_modules/rxjs',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'node_modules/typescript/lib/typescript.js',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router-deprecated',
    'upgrade',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    //map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  // Forms not on rc yet
  packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
