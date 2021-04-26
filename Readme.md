# RapidSec Static Site(JAM Stack) Microagent

RapidSec Microagent monitors and protects your users and data from the most common and painful Web Client side attacks.

These include:

- XSS · Cross Site Scripting: The most common attack on web platforms, accounting for over 40% of all bug bounties worldwide, and behind many major attacks and lawsuits. XSS forces your site to run unauthorized javascript code, giving attackers full control of the user's session, forging requests, exfiltrating data, or deleting data.
- CSRF · Cross Site Request Forgery: A malicious attack where a user is tricked into performing an action he or she didn't intend to do. It can result in damaged client relationships, unauthorized fund transfers, changed passwords and data theft - including stolen session cookies.
- ClickJacking · An attack that tricks a user into clicking a webpage element which is invisible or disguised as another element. This can cause users to unwittingly download malware, visit malicious web pages, provide credentials or sensitive information, transfer money, or purchase products online.
- Magecart · It works by operatives gaining access to websites either directly or via third-party services and injecting malicious JavaScript that steals data shoppers enter into online payment forms, typically on checkout pages.
- CSIM · Client Side Injected Malware: These vulnerabilities arise when applications using a client-side template framework dynamically embed user input in web pages. The security impact of client-side injection vulnerabilities is dependent upon the nature of the vulnerable application, the kinds of data and functionality that it contains, and the other applications that belong to the same domain and organization.

For more details, visit [rapidsec.com](https://www.rapidsec.com/?utm_source=static_npm_agent)

## Installation

1. You will need first to [signup](https://rapidsec.com/sign-up) with Node.js integration to get a token.
1. Set environment variable `RAPIDSEC_SDK_TOKEN`.
1. Install Node.js module:
   ```
   yarn add @rapidsec/static-sdk
   ```
   or
   ```
   npm install @rapidsec/static-sdk
   ```
1. Add `postbuild` script as shown below

   1. For Netlify

      ```json
        "postbuild": "rapidsec netlify"
      ```

   1. For Vercel

      ```json
        "postbuild": "rapidsec vercel"
      ```

   1. For Firebase

      ```json
        "postbuild": "rapidsec firebase"
      ```

   1. Interested in others?
      Let us know [here](https://rapidsec.com/contact-us)

1. That's all, no more config 🎉

## Compatibility

This Microagent is compatible with Node.js 10 and higher.

## LICENSE

See [LICENSE](https://github.com/rapidsec-com/static-sdk/blob/master/LICENSE)
