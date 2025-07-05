const fs = require('fs');
const path = require('path');

function parseMarkdown() {
    const mdPath = path.join(__dirname, '..', '..', 'company-profile.md');
    const content = fs.readFileSync(mdPath, 'utf-8');

    const sections = {};
    const lines = content.split('\n');

    let currentSection = null;
    let sectionContent = '';

    for (const line of lines) {
        if (line.startsWith('**')) {
            if (currentSection) {
                sections[currentSection] = sectionContent.trim();
            }
            currentSection = line.replace(/\*\*/g, '').trim().toLowerCase();
            sectionContent = '';
        } else if (currentSection) {
            sectionContent += line + '\n';
        }
    }
    if (currentSection) {
        sections[currentSection] = sectionContent.trim();
    }

    const about = parseAbout(sections.about || '');
    const services = parseServices(sections.services || '');
    const projects = parseProjects(sections.projects || '');
    const { team, policy } = parseTeamAndPolicy(sections.team || '');
    const heroImages = fs.readdirSync(path.join(__dirname, '..', '..', 'frontend', 'public', 'images', 'hero'));

    return { about, services, projects, team, policy, heroImages };
}

function parseAbout(aboutContent) {
    const about = {};
    const lines = aboutContent.split('\n');
    let currentHeading = null;

    for (const line of lines) {
        if (line.startsWith('#')) {
            currentHeading = line.replace(/#/g, '').trim().toLowerCase().replace('our goal', 'goal');
            about[currentHeading] = '';
        } else if (currentHeading) {
            about[currentHeading] += line + '\n';
        }
    }

    for (const key in about) {
        about[key] = about[key].trim();
    }

    return about;
}

function parseServices(servicesContent) {
    return servicesContent.split('\n').map(s => s.trim()).filter(s => s.match(/^\d+\.\s/)).map(s => s.replace(/^\d+\.\s/, '').trim());
}

function parseProjects(projectsContent) {
    const projectEntries = projectsContent.split(/\n\d+\.\s/).filter(p => p.trim() !== '');
    if (projectsContent.match(/^\d+\.\s/)) {
        projectEntries.unshift(projectsContent.split(/\n\d+\.\s/)[0].replace(/^\d+\.\s/, ''));
    }

    const projects = projectEntries.map(entry => {
        const parts = entry.split(',').map(part => part.trim());
        
        const projectName = parts[0] || 'N/A';
        const clientPart = parts[1] || '';
        const workPart = parts[2] || '';
        const valuePart = parts[3] || '';

        const clientMatch = clientPart.match(/(.*?)(--|—|\s+)(\+?\d.*)/);
        const clientName = clientMatch ? clientMatch[1].trim() : clientPart;
        const contactInformation = clientMatch ? clientMatch[3].trim() : 'N/A';

        const workMatch = workPart.match(/(.*?)(--|—|\s+)(Ongoing|\d{4})/i);
        const typeOfWorkPerformed = workMatch ? workMatch[1].trim() : workPart;
        let yearOfCompletion = 0;
        if (workMatch) {
            const yearStr = workMatch[3].trim().toLowerCase();
            yearOfCompletion = yearStr === 'ongoing' ? new Date().getFullYear() : parseInt(yearStr, 10);
        }

        const valueOfContractUSD = valuePart ? parseFloat(valuePart.replace(/[^\d.]/g, '')) : 0;

        return {
            projectName,
            country: 'Liberia', // Assuming Liberia as default
            clientName,
            contactInformation,
            typeOfWorkPerformed,
            yearOfCompletion: isNaN(yearOfCompletion) ? 0 : yearOfCompletion,
            valueOfContractUSD: isNaN(valueOfContractUSD) ? 0 : valueOfContractUSD,
            images: [],
        };
    });

    return projects.filter(p => p.projectName !== 'N/A');
}

function parseTeamAndPolicy(teamContent) {
    const team = {
        keyTechnicalPersonnel: [],
        methodology: [],
        teamMembers: []
    };
    let policyContent = '';

    // Split by headings, keeping the headings
    const parts = teamContent.split(/(^#\s.*$)/m);

    for (let i = 1; i < parts.length; i += 2) {
        const heading = parts[i].replace(/#/g, '').trim().toLowerCase();
        const body = parts[i + 1] ? parts[i + 1].trim() : '';

        if (heading.includes('key technical personnel')) {
            team.keyTechnicalPersonnel = body.split('\n').map(l => l.replace(/^\d+\.\s/, '').trim()).filter(Boolean);
        } else if (heading.includes('methodology')) {
            team.methodology = body.split('\n').map(l => l.replace(/^\d+\.\s/, '').trim()).filter(Boolean);
        } else if (heading.includes('health safety security and environment')) {
            policyContent = body;
        }
    }

    const policy = { content: policyContent };

    return { team, policy };
}

module.exports = parseMarkdown;

