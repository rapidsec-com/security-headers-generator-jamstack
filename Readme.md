# Security Headers Generator for Static Sites (JAM Stack) by RapidSec

RapidSec's integration monitors and protects your users and data from the most common and painful Web Client side attacks.

These include:

- XSS · Cross Site Scripting: The most common attack on web platforms, accounting for over 40% of all bug bounties worldwide, and behind many major attacks and lawsuits. XSS forces your site to run unauthorized javascript code, giving attackers full control of the user's session, forging requests, exfiltrating data, or deleting data.
- CSRF · Cross Site Request Forgery: A malicious attack where a user is tricked into performing an action he or she didn't intend to do. It can result in damaged client relationships, unauthorized fund transfers, changed passwords and data theft - including stolen session cookies.
- ClickJacking · An attack that tricks a user into clicking a webpage element which is invisible or disguised as another element. This can cause users to unwittingly download malware, visit malicious web pages, provide credentials or sensitive information, transfer money, or purchase products online.
- Magecart · It works by operatives gaining access to websites either directly or via third-party services and injecting malicious JavaScript that steals data shoppers enter into online payment forms, typically on checkout pages.
- CSIM · Client Side Injected Malware: These vulnerabilities arise when applications using a client-side template framework dynamically embed user input in web pages. The security impact of client-side injection vulnerabilities is dependent upon the nature of the vulnerable application, the kinds of data and functionality that it contains, and the other applications that belong to the same domain and organization.

For more details, visit [rapidsec.com](https://www.rapidsec.com/?utm_source=jam_stack_npm_agent)

## Installation

1. You will need first to [Sign Up](https://rapidsec.com/sign-up) to RapidSec and start a project.
1. Choose either Firebase or Netlify deployment method.
1. Set the environment variable `RAPIDSEC_SDK_TOKEN` in the hosting dashboard. RapidSec creates 3 tokens by default - for development, staging (preview), production.

1. Install NPM module:

   ```
   yarn add @rapidsec/sec-header-generator
   ```

   or

   ```
   npm install @rapidsec/sec-header-generator
   ```

   This package exposes a CLI command `rapidsec-headers` you can check all options it supports by running `yarn rapidsec-headers -h`

1. In you project `package.json`, add a `postbuild` script as shown below

   ```json
     "scripts": {
         // Your other scripts here //
         "postbuild": "rapidsec-headers YOUR_PLATFORM"
     }
   ```

   1. For Netlify

      ```json
        "postbuild": "rapidsec-headers netlify"
      ```

   1. For Vercel

      > Note: Not working at present due to [this limitation](https://github.com/vercel/vercel/discussions/6162)

      ```json
        "postbuild": "rapidsec-headers vercel"
      ```

   1. For Firebase

      ```json
        "postbuild": "rapidsec-headers firebase"
      ```

   1. Interested in other integrations?
      Let us know [here](https://rapidsec.com/contact-us)

1. Deploy your site, and visit it, to make sure that CSP events are being generated. You can use [CSP scanner](https://chrome.google.com/webstore/detail/csp-scanner-test-analyze/eoiiiomeoogcpnkdedcodoeaacpdfmdj?hl=en) to make sure.
1. Great, RapidSec UI should let you know that you are conncected 🎉
1. Follow the instructions in RapidSec to choose the best Security headers for your site.
1. When you Publish a new vesion of your security headers in RapidSec, you will be prompted to add deploy hooks for your enviroment, so that you can issue new builds when RapidSec versions are built (this is Optional).

## Compatibility

This integration is compatible with Node.js 10 and higher.

## LICENSE

See [LICENSE](https://github.com/rapidsec-com/security-headers-generator-jamstack/blob/master/LICENSE)
