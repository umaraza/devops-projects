import { mobile, backend, creator, web } from "../assets";

import linux from "../assets/tech/linux.png";
import aws from "../assets/tech/aws.png";
import docker from "../assets/tech/docker.png";
import kubernetes from "../assets/tech/kubernetes.png";
import terraform from "../assets/tech/terraform.png";
import ansible from "../assets/tech/ansible.png";
import jenkins from "../assets/tech/jenkins.png";
import gitlab from "../assets/tech/gitlab.png";
import prometheus from "../assets/tech/prometheus.png";
import grafana from "../assets/tech/grafana.png";
import nginx from "../assets/tech/nginx.png";
import python from "../assets/tech/python.png";
import bash from "../assets/tech/bash.png";

import ussd from "../assets/projects/ussd.svg";
import ivr from "../assets/projects/ivr.svg";
import iac from "../assets/projects/iac.svg";
import cicd from "../assets/projects/cicd.svg";

const LINKEDIN = "https://www.linkedin.com/in/muhammad-umar-raza-devops";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Cloud & AWS", icon: web },
  { title: "CI/CD Automation", icon: mobile },
  { title: "Infrastructure as Code", icon: backend },
  { title: "Monitoring & Observability", icon: creator },
];

const technologies = [
  { name: "Linux", icon: linux },
  { name: "AWS", icon: aws },
  { name: "Docker", icon: docker },
  { name: "Kubernetes", icon: kubernetes },
  { name: "Terraform", icon: terraform },
  { name: "Ansible", icon: ansible },
  { name: "Jenkins", icon: jenkins },
  { name: "GitLab", icon: gitlab },
  { name: "Prometheus", icon: prometheus },
  { name: "Grafana", icon: grafana },
  { name: "Nginx", icon: nginx },
  { name: "Python", icon: python },
];

const experiences = [
  {
    title: "DevOps Engineer",
    company_name: "Mercurial Minds, Islamabad",
    icon: terraform,
    iconBg: "#E6DEDD",
    date: "Oct 2025 - Present",
    points: [
      "Installed and configured Prometheus and Grafana, creating alert rules and dashboards with Grafana plugins.",
      "Deployed a self-hosted GitLab instance and built a build, test and deploy CI/CD pipeline for a Python application.",
      "Automated VM provisioning with Terraform and software configuration with Ansible on the company Proxmox server.",
      "Configured scheduled Proxmox VM/container backups and daily database backup jobs.",
    ],
  },
  {
    title: "System Engineer (SOC / Back Office)",
    company_name: "Mercurial Minds, Islamabad",
    icon: linux,
    iconBg: "#383E56",
    date: "Dec 2022 - Sep 2025",
    points: [
      "Resolved alerts escalated from the NOC, and handled data queries and call-log investigations.",
      "Deployed new services and added monitoring checks according to service requirements.",
      "Administered Linux servers, web hosting (Apache, Nginx) and HAProxy load balancing.",
      "Installed and administered iTop (users and organizations) for client ticketing.",
    ],
  },
  {
    title: "NOC Engineer (Front Office)",
    company_name: "Mercurial Minds, Islamabad",
    icon: grafana,
    iconBg: "#E6DEDD",
    date: "Oct 2021 - Nov 2022",
    points: [
      "Monitored servers and services 24x7 through Nagios, Zabbix and Grafana.",
      "Created trouble tickets in Jira for alerts and assigned them to back-office resources.",
      "Maintained first-response SLA (15 minutes) compliance above 99%.",
      "Guided colleagues through incident scenarios.",
    ],
  },
  {
    title: "Assistant NOC Engineer",
    company_name: "Mercurial Minds, Islamabad",
    icon: bash,
    iconBg: "#383E56",
    date: "Apr 2021 - Sep 2021",
    points: [
      "Performed Windows and Linux installations and basic server setup.",
      "Supported the NOC team with routine monitoring and operational tasks.",
    ],
  },
];

const testimonials = [];

const projects = [
  {
    name: "Seamless USSD Gateway",
    description:
      "Supported deployment and operations of a large-scale, multi-vendor USSD gateway solution spanning 100+ machines across multiple countries.",
    tags: [
      { name: "ussd", color: "blue-text-gradient" },
      { name: "linux", color: "green-text-gradient" },
      { name: "monitoring", color: "pink-text-gradient" },
    ],
    image: ussd,
    source_code_link: LINKEDIN,
  },
  {
    name: "IVR & Outbound Dialer",
    description:
      "Configured Asterisk SIP trunks and dialplans, and deployed IVR and outbound dialer (OBD) applications for partner subscription and value-added services.",
    tags: [
      { name: "asterisk", color: "blue-text-gradient" },
      { name: "sip", color: "green-text-gradient" },
      { name: "ivr", color: "pink-text-gradient" },
    ],
    image: ivr,
    source_code_link: LINKEDIN,
  },
  {
    name: "Proxmox IaC Automation",
    description:
      "Automated VM provisioning with Terraform and software configuration with Ansible on the company Proxmox server, with scheduled VM and database backups.",
    tags: [
      { name: "terraform", color: "blue-text-gradient" },
      { name: "ansible", color: "green-text-gradient" },
      { name: "proxmox", color: "pink-text-gradient" },
    ],
    image: iac,
    source_code_link: LINKEDIN,
  },
  {
    name: "GitLab CI/CD Pipeline",
    description:
      "Deployed a self-hosted GitLab instance and built a build, test and deploy CI/CD pipeline for a Python application.",
    tags: [
      { name: "gitlab", color: "blue-text-gradient" },
      { name: "cicd", color: "green-text-gradient" },
      { name: "python", color: "pink-text-gradient" },
    ],
    image: cicd,
    source_code_link: LINKEDIN,
  },
];

export { services, technologies, experiences, testimonials, projects };
