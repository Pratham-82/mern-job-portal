import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Job from '../models/Job.js';

export async function seedDemoData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return;
    }

    console.log('Seeding initial demo data...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    const recruiter = await User.create({
      name: 'Sarah Recruiter',
      email: 'recruiter@example.com',
      password: hashedPassword,
      role: 'recruiter',
    });

    const applicant = await User.create({
      name: 'Alex Applicant',
      email: 'applicant@example.com',
      password: hashedPassword,
      role: 'applicant',
    });

    await Job.create([
      {
        title: 'Senior Full-Stack Engineer',
        companyName: 'TechCorp Solutions',
        description: 'Building modern scalable web platforms using React, Node.js, and cloud microservices.',
        location: 'Remote',
        employmentType: 'Full-time',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
        salary: { min: 1500000, max: 2500000, currency: 'INR' },
        recruiter: recruiter._id,
        status: 'open',
      },
      {
        title: 'Frontend Developer',
        companyName: 'DesignCraft Studio',
        description: 'Crafting responsive, high-performance web applications with modern CSS and React.',
        location: 'Bangalore, India',
        employmentType: 'Full-time',
        skills: ['React', 'CSS', 'JavaScript', 'Tailwind', 'UI/UX'],
        salary: { min: 900000, max: 1600000, currency: 'INR' },
        recruiter: recruiter._id,
        status: 'open',
      },
      {
        title: 'DevOps & Cloud Specialist',
        companyName: 'CloudScale Tech',
        description: 'Automating deployment pipelines, managing Kubernetes clusters, and ensuring 99.99% uptime.',
        location: 'Hyderabad, India',
        employmentType: 'Contract',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
        salary: { min: 1400000, max: 2200000, currency: 'INR' },
        recruiter: recruiter._id,
        status: 'open',
      },
      {
        title: 'Software Development Intern',
        companyName: 'NextGen AI Labs',
        description: 'Join our engineering team to build AI-powered tools and backend APIs.',
        location: 'Remote',
        employmentType: 'Internship',
        skills: ['JavaScript', 'Python', 'Node.js', 'REST APIs'],
        salary: { min: 30000, max: 50000, currency: 'INR' },
        recruiter: recruiter._id,
        status: 'open',
      },
      {
        title: 'Lead Product Designer',
        companyName: 'InnovateHQ',
        description: 'Leading design systems, UX research, and user interaction design across our web products.',
        location: 'Mumbai, India',
        employmentType: 'Full-time',
        skills: ['Figma', 'User Research', 'Design Systems', 'Wireframing'],
        salary: { min: 1200000, max: 2000000, currency: 'INR' },
        recruiter: recruiter._id,
        status: 'open',
      },
    ]);

    console.log('Demo data seeded successfully (admin, recruiter, applicant & sample jobs created).');
  } catch (error) {
    console.warn('Note: Seed step failed or skipped:', error.message);
  }
}
