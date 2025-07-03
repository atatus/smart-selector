#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏗️  Building Smart Selector...');

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

console.log('📦 Compiling TypeScript...');

// Build with TypeScript
try {
  execSync('npx tsc --build --force', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Create package.json info
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage || 'https://github.com/your-username/smart-selector'}
 * 
 * @license ${pkg.license}
 */`;

// Read the main compiled file
const mainFile = fs.readFileSync('dist/index.js', 'utf8');

// Create ESM version
const esmContent = `${banner}\n${mainFile}`;
fs.writeFileSync('dist/index.esm.js', esmContent);

// Create CommonJS version
const cjsContent = `${banner}\n${mainFile}`;
fs.writeFileSync('dist/index.cjs.js', cjsContent);

// Create UMD version
const umdWrapper = `${banner}
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmartSelector = {}));
}(this, (function (exports) { 'use strict';

// UMD module content
${mainFile.replace(/export\s+default/g, 'exports.default =').replace(/export\s+/g, 'exports.')}

})));`;

const umdContent = umdWrapper;

fs.writeFileSync('dist/index.umd.js', umdContent);

console.log('📁 Generated output files:');
console.log('  - dist/index.js (CommonJS)');
console.log('  - dist/index.esm.js (ES Module)');
console.log('  - dist/index.cjs.js (CommonJS)');
console.log('  - dist/index.umd.js (UMD)');
console.log('  - dist/index.d.ts (TypeScript definitions)');

console.log('✅ Build completed successfully!');