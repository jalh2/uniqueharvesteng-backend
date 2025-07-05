const fs = require('fs');
const path = require('path');
const parseMarkdown = require('./seed');

const API_URL = 'http://localhost:5000/api';

const main = async () => {
    const { about, services, projects, team, policy, heroImages } = parseMarkdown();

    try {
        console.log('--- Populating About section ---');
        const aboutResponse = await fetch(`${API_URL}/about`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(about)
        });
        if (!aboutResponse.ok) throw new Error(`About request failed with status ${aboutResponse.status}`);
        console.log('About section populated.');

        console.log('--- Populating Services ---');
        for (const serviceName of services) {
            const serviceResponse = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: serviceName, description: 'Service description to be added.' })
            });
            if (!serviceResponse.ok) throw new Error(`Service request for '${serviceName}' failed with status ${serviceResponse.status}`);
        }
        console.log('Services populated.');

        console.log('--- Populating Projects ---');
        for (const project of projects) {
            const projectResponse = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            });
            if (!projectResponse.ok) console.error(`Project request for '${project.projectName}' failed with status ${projectResponse.status}`);
        }
        console.log('Projects populated.');

        console.log('--- Populating Team section ---');
        const teamResponse = await fetch(`${API_URL}/team`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team)
        });
        if (!teamResponse.ok) {
            const errorData = await teamResponse.json();
            throw new Error(`Team request failed with status ${teamResponse.status}: ${errorData.message}`);
        }
        console.log('Team section populated.');

        console.log('--- Populating Policy section ---');
        const policyResponse = await fetch(`${API_URL}/policy`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(policy)
        });
        if (!policyResponse.ok) {
            const errorData = await policyResponse.json();
            throw new Error(`Policy request failed with status ${policyResponse.status}: ${errorData.message}`);
        }
        console.log('Policy section populated.');

        console.log('--- Uploading Hero images ---');
        const heroFormData = new FormData();
        heroFormData.append('heading', 'Unique Harvest Engineering Group');
        heroFormData.append('subheading', 'Your Partner in Engineering Excellence');
        const heroDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'images', 'hero');
        for (const imageName of heroImages) {
            const imagePath = path.join(heroDir, imageName);
            const imageBuffer = fs.readFileSync(imagePath);
            const blob = new Blob([imageBuffer], { type: 'image/jpeg' }); // Assuming jpeg, adjust if needed
            heroFormData.append('images', blob, imageName);
        }
        const heroResponse = await fetch(`${API_URL}/hero`, {
            method: 'PUT',
            body: heroFormData
        });
        if (!heroResponse.ok) throw new Error(`Hero request failed with status ${heroResponse.status}`);
        console.log('Hero images uploaded.');

        console.log('Database populated successfully!');
    } catch (error) {
        console.error('Failed to populate database:', error.message);
        process.exit(1);
    }
}

main();

