// Applies Muhammad Umar Raza's text customizations to the upstream 3D portfolio source.
// Runs inside the Docker build. Fails the build if any expected text is missing,
// so an upstream change can never silently produce the wrong site.
import { readFileSync, writeFileSync } from "node:fs";

const ABOUT =
  "DevOps Engineer with 5+ years of experience in infrastructure operations, monitoring, " +
  "incident management and production support for telecom platforms. I automate infrastructure " +
  "with Terraform and Ansible, build CI/CD pipelines with GitLab, Jenkins and Docker, and keep " +
  "high-availability, multi-region production systems healthy with Prometheus, Grafana, Nagios " +
  "and Zabbix, maintaining SLA compliance in 24x7 environments.";

const edits = [
  ["src/components/Navbar.jsx", /Adrian(\s*&nbsp;)/, "Umar Raza$1"],
  ["src/components/Navbar.jsx", /JavaScript Mastery/, "DevOps Engineer"],
  ["src/components/Hero.jsx", />\s*Adrian\s*</, ">Umar<"],
  ["src/components/Hero.jsx", /I develop 3D visuals[\s\S]*?web applications/,
    "I automate, deploy and monitor <br className='sm:block hidden' />cloud infrastructure at scale"],
  ["src/components/About.jsx", /I'm a skilled software developer[\s\S]*?ideas to life!/, ABOUT],
  ["src/components/Contact.jsx", /JavaScript Mastery/g, "Muhammad Umar Raza"],
  ["src/components/Contact.jsx", /sujata@jsmastery\.pro/g, "m.umaraza@gmail.com"],
  ["src/App.jsx", /\s*<Feedbacks\s*\/>/, ""],
  ["index.html", /<title>[\s\S]*?<\/title>/, "<title>Muhammad Umar Raza | DevOps Engineer</title>"],
];

let failed = 0;
for (const [file, pattern, replacement] of edits) {
  const text = readFileSync(file, "utf8");
  if (!pattern.test(text)) {
    console.error(`MISS ${file} ${pattern}`);
    failed++;
    continue;
  }
  pattern.lastIndex = 0;
  writeFileSync(file, text.replace(pattern, replacement));
  console.log(`OK   ${file} ${pattern}`);
}

if (failed) {
  console.error(`${failed} customization(s) failed - upstream code has changed`);
  process.exit(1);
}
console.log("All customizations applied.");
