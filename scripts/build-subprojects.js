import { readdirSync, statSync, existsSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

// Find all subdirectories that have their own package.json (sub-projects)
const entries = readdirSync(rootDir);

for (const entry of entries) {
  const entryPath = join(rootDir, entry);

  // Skip non-directories, hidden dirs, node_modules, dist, scripts, components, public
  if (
    !statSync(entryPath).isDirectory() ||
    entry.startsWith('.') ||
    ['node_modules', 'dist', 'scripts', 'components', 'public', 'src'].includes(entry)
  ) {
    continue;
  }

  const subPkg = join(entryPath, 'package.json');
  if (!existsSync(subPkg)) continue;

  console.log(`\n=== Building sub-project: ${entry} ===`);

  // Install dependencies and build
  execSync('npm install && npm run build', {
    cwd: entryPath,
    stdio: 'inherit',
  });

  // Copy build output to dist/<subproject>/
  const subDist = join(entryPath, 'dist');
  if (!existsSync(subDist)) {
    console.warn(`Warning: ${entry}/dist not found after build, skipping copy.`);
    continue;
  }

  const targetDir = join(distDir, entry);
  mkdirSync(targetDir, { recursive: true });
  cpSync(subDist, targetDir, { recursive: true });
  console.log(`Copied ${entry}/dist -> dist/${entry}/`);
}

console.log('\nAll sub-projects built successfully.');
