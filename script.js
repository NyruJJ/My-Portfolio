'use strict';
const DASHBOARD_URL = 'https://cipher-private-dashboard.tangybead2.chatgpt.site';
const assetUrl = (name) => 'assets/' + name;
const projectData = [
{
    id:'network-dashboard', number:'01', title:'Network Monitoring & Troubleshooting Dashboard',
    category:'networking', type:'PERSONAL · AI-ASSISTED', year:'IN PROGRESS',
    summary:'A personal, AI-assisted monitoring prototype inspired by working with Hiveon and LoadIQ in a production environment. Built around device visibility, performance, and troubleshooting — currently with simulated data.',
    tags:['Python learning','Simulated telemetry','AI-assisted'], art:true, featured:'flagship-project',
    intro:'A personal, AI-assisted exploration of how network teams can move from disconnected device information to a useful monitoring and troubleshooting workspace. Informed by my production monitoring experience, but independently prototyped with simulated data.',
    role:'Independent project direction and learning. I defined requirements, selected the design direction, guided changes and iterations, and am learning the Python concepts involved. AI assistance was part of the implementation process. This is not an employer-developed tool or a connection to employer infrastructure.',
    highlights:[
      'Defined the goal: help networking teams see device status, interpret performance, and investigate problems.',
      'Selected a dashboard-style experience and directed design and functionality changes.',
      'Applied lessons from infrastructure monitoring and post-curtailment restart checks to think about actionable alerts and reliable device-status views.',
      'Used AI assistance while learning the Python behind the prototype; not presented as independently hand-coded production software.',
      'Explicitly distinguish simulated telemetry from verified live hardware measurements.'
    ],
    result:'A working interactive prototype using simulated network data. It is a demonstration, not yet a live device-monitoring or packet-capture deployment.',
    next:'Connect to verified live lab measurements and packet-analysis workflows, validate real telemetry, and document findings.',
    stack:['Python (learning)','AI-assisted prototyping','Network monitoring concepts','Performance analysis'],
    link:DASHBOARD_URL,
    linkLabel:'Visit dashboard prototype',
    linkNote:'The dashboard currently returns an authorization-required response when checked outside its authorized environment. Access may require the original account or permissions.',
    gallery:[]
  },
{
    id:'network-firewall-lab', number:'02', title:'Network Configuration & Firewall Validation',
    category:'networking', type:'SYSTEMS SECURITY COURSEWORK', year:'SPRING 2026',
    summary:'Configured static IP addressing, DNS, gateways, and pfSense rules in a guided Windows/Linux lab, then tested connectivity and access restrictions.',
    tags:['IPv4 / DNS','pfSense','Connectivity testing'], image:'network_cover.webp', featured:'small-feature',
    intro:'A combined case study from two University at Buffalo MGS 427 Systems Security labs. Configured Windows 11 and Ubuntu client network settings and worked through pfSense firewall exercises in a segmented AdminNet/ServerNet environment.',
    role:'Completed and documented the structured lab exercises. My reports show Windows PowerShell addressing and DNS setup, Ubuntu Netplan configuration, pfSense rule configuration, and verification tests. This was guided coursework, not an independently engineered enterprise network.',
    highlights:[
      'Set static IPv4 addresses, subnet prefixes, default gateways, and DNS servers with PowerShell and Ubuntu Netplan.',
      'Verified gateway reachability, enterprise routing, DNS name resolution, and external access with command-line tests.',
      'Configured approved inbound and outbound pfSense firewall rules for lab services including WinRM and FTP.',
      'Limited pfSense management access to a designated Windows client and tested permitted and blocked connections.',
      'Documented network topologies, screenshots, and system-test results.'
    ],
    result:'Submitted lab documentation showing working client network connectivity and firewall access-control tests. Results apply to the course lab environment.',
    next:'Practice the same configurations in a self-directed lab and document troubleshooting scenarios, packet captures, and rule verification.',
    stack:['Windows PowerShell','Ubuntu Netplan','Static IPv4','DNS / routing','pfSense','Ping / connectivity tests'],
    gallery:[
      {src:'network_topology.webp',caption:'Lab network topology with pfSense, AdminNet, ServerNet, and external segment'},
      {src:'network_ipv4.webp',caption:'Static IPv4 configuration on Windows 11 using PowerShell'},
      {src:'network_netplan.webp',caption:'Ubuntu Netplan configuration evidence'},
      {src:'network_rules.webp',caption:'pfSense firewall management rules and authorized device configuration'},
      {src:'network_blocked.webp',caption:'Access restriction test from a non-authorized device'},
      {src:'network_ping.webp',caption:'Documented gateway connectivity testing'}
    ]
  },
{
    id:'pentest-assessment', number:'03', title:'Penetration Testing & Vulnerability Assessment',
    category:'security', type:'AUTHORIZED SECURITY LAB', year:'SPRING 2026',
    summary:'Assessed an assigned training web application and documented four vulnerabilities, proof of findings, severity ratings, and remediation steps.',
    tags:['Nmap','Web security','Risk findings'], image:'pentest_cover.webp', featured:'small-feature',
    intro:'An authorized MGS 427 penetration-testing exercise against a designated retail-store application in a controlled academic network. The written assessment defined scope, testing methods, evidence, and recommendations.',
    role:'Performed and documented the assigned penetration-testing lab. This was authorized training-system testing, not an external assessment or a claim of advanced independent pentesting expertise.',
    highlights:[
      'Used Nmap to discover the assigned target host and enumerate exposed services.',
      'Demonstrated an authentication bypass caused by SQL injection in the lab application.',
      'Validated unsafe PHP file-upload execution leading to command-line access as the web-server account.',
      'Identified excessive sudo permissions and documented privilege escalation to root in the lab.',
      'Rated four findings (two Critical, one High, one Medium) and wrote mitigation recommendations.'
    ],
    result:'Produced a scoped penetration test report supported by lab screenshots, four documented findings, and remediation guidance. No real-world systems were targeted.',
    next:'Practice vulnerability validation and remediation checks in isolated labs; learn to compare findings with standard scoring approaches and retest fixes.',
    stack:['Kali Linux','Nmap','Netcat','Web testing','Linux permissions','Security reporting'],
    gallery:[
      {src:'pentest_nmap.webp',caption:'Nmap service discovery evidence in the assigned lab'},
      {src:'pentest_sql.webp',caption:'SQL injection test against the intentionally vulnerable lab login'},
      {src:'pentest_shell.webp',caption:'Command-line access resulting from unsafe file-upload execution'},
      {src:'pentest_sudo.webp',caption:'Evidence documenting excess sudo permissions on the lab server'}
    ]
  },
{
    id:'cis-catflix', number:'04', title:'CIS Controls & Catflix Infrastructure Hardening',
    category:'security', type:'CYBERSECURITY COURSEWORK', year:'SPRING 2026',
    summary:'Applied CIS Controls 4, 6, and 8 to a segmented Linux/Windows wiki environment, with access validation and security evidence.',
    tags:['CIS Controls','Linux servers','Segmentation'], image:'cis_topology.webp', featured:'small-feature',
    intro:'Course lab work culminating in a CIS Critical Security Controls assessment of the Catflix wiki environment. Related Linux lab documentation covers Ubuntu/Rocky Linux services, pfSense network segmentation, Apache, MariaDB, and MediaWiki.',
    role:'Security Engineer (role identified in the technical report). Documented the CIS control applications and availability tests; separately completed instructional Linux server configuration and firewall-hardening exercises in the same academic environment. Individual ownership of every component in the broader environment was not specified.',
    highlights:[
      'Control 4 — documented Ubuntu SSH hardening, including disabling direct root login and restricting administrator access.',
      'Control 6 — reviewed least-privilege administrative memberships across Linux, Active Directory, pfSense, and MediaWiki.',
      'Control 8 — examined Apache access logs and SSH service activity for troubleshooting, accountability, and investigation.',
      'Validated that the internal wiki remained accessible after the security-control changes.',
      'Related Linux lab: configured and verified Ubuntu Apache and Rocky Linux MariaDB services, linked the MediaWiki application to the database, and tested firewall segmentation between AdminNet, ServerNet, and the external segment.'
    ],
    result:'The submitted report documents narrowed administrative exposure and improved audit visibility while preserving authorized wiki access.',
    next:'Extend validation with periodic access reviews, secure update procedures, log-retention tests, and post-change availability checks.',
    stack:['CIS Critical Security Controls','Ubuntu / Rocky Linux','Active Directory','MediaWiki','Apache logs','pfSense','MariaDB'],
    gallery:[
      {src:'cis_topology.webp',caption:'Catflix final network topology (report appendix)'},
      {src:'cis_pf_rules.webp',caption:'Firewall-hardening rules included as report evidence'},
      {src:'cis_wiki_availability.webp',caption:'Catflix wiki service availability-validation screenshot'},
      {src:'linux_topology.webp',caption:'Linux lab topology showing Ubuntu web and Rocky Linux database servers'},
      {src:'linux_db.webp',caption:'MariaDB backend setup and database user configuration'},
      {src:'linux_mediawiki.webp',caption:'Deployed MediaWiki application in the lab'},
      {src:'linux_firewall.webp',caption:'pfSense segmentation rules in the Linux lab'}
    ]
  },
{
    id:'windows-ad-gpo', number:'05', title:'Windows Server, Active Directory & Group Policy',
    category:'security', type:'SYSTEMS SECURITY COURSEWORK', year:'SPRING 2026',
    summary:'A guided Windows lab covering Active Directory domain membership, IIS hosting, user/group administration, and PowerShell audit logging via Group Policy.',
    tags:['Active Directory','Group Policy','PowerShell logging'], image:'windows_cover.webp', featured:'full-feature',
    intro:'University at Buffalo MGS 427 coursework using Windows clients and servers in a domain environment. The lab documented centralized administration, an IIS web service, Active Directory groups, and Group Policy enforcement.',
    role:'Completed and documented a structured Windows systems lab. Configured and validated domain membership, service installation, identity groups, and Group Policy settings in the assigned lab environment; not a production Active Directory deployment.',
    highlights:[
      'Joined a Windows 11 client and an IIS server to the lab Active Directory domain.',
      'Created domain user accounts and managed group membership, including domain administration and workstation groups.',
      'Installed the IIS web server role and verified access to its default webpage from another lab device.',
      'Configured and verified a domain desktop-background Group Policy.',
      'Enabled PowerShell transcription through Group Policy and confirmed transcript files were written to the shared location.'
    ],
    result:'Documented functioning domain membership, IIS access, Group Policy application, and centralized PowerShell transcript generation within the course environment.',
    next:'Develop an independent Windows Server lab to explore least privilege, GPO troubleshooting, security event collection, and AD auditing.',
    stack:['Windows Server','Active Directory','Group Policy','IIS','PowerShell','Audit logging'],
    gallery:[
      {src:'windows_domain.webp',caption:'Windows client successfully joined to the lab Active Directory domain'},
      {src:'windows_iis.webp',caption:'IIS default website accessible from the test client'},
      {src:'windows_gpo.webp',caption:'Active Directory workstation security group membership'},
      {src:'windows_transcript.webp',caption:'Verified PowerShell transcript generated under Group Policy'},
      {src:'windows_topology.webp',caption:'Expanded Windows domain and IIS server topology'}
    ]
  },
{
    id:'mt-access', number:'06', title:'M&T Bank Visitor Access Management System',
    category:'database', type:'GROUP DATABASE COURSEWORK', year:'SPRING 2026',
    summary:'A Microsoft Access visitor authorization system with forms, approval workflows, audit-oriented reports, and related records.',
    tags:['Microsoft Access','Reports','Testing'], image:'access_menu.webp', featured:'full-feature',
    intro:'A team-developed academic prototype of a visitor access management system for a financial institution, designed to record requests, manage approval decisions, and support activity auditing.',
    role:'My documented contributions: developed all system reports (detail and grouped), led testing/debugging and overall functionality validation, added forms and improved interface layout, and completed the prototype write-up and documentation.',
    highlights:[
      'Built visitor-activity and approved/denied/pending access reports alongside grouped analyses by employee and restricted area.',
      'Resolved report readability by showing descriptive names rather than numeric database identifiers.',
      'Led testing and bug resolution involving record saves, filtered pending requests, macros, and approval status updates.',
      'Improved interface visual organization and produced project documentation.'
    ],
    result:'Submitted an academic Microsoft Access prototype with navigable forms, role-oriented reports, and documented issue resolution. It is not described as a deployed M&T Bank production system.',
    next:'Explore stronger input validation, automatic timestamps, dashboards, and enhanced multi-field search.',
    stack:['Microsoft Access','Relational design','Forms and reports','Macro troubleshooting','Functional testing'],
    gallery:[
      {src:'access_menu.webp',caption:'Main menu form with navigation controls'},
      {src:'access_visitor.webp',caption:'Visitor access request input form'},
      {src:'access_report.webp',caption:'A report generated from the visitor access records'},
      {src:'access_relationship.webp',caption:'Database table relationships and reference keys'}
    ]
  },
{
    id:'toolips-db', number:'07', title:'Toolips Tools Shop Database Design',
    category:'database', type:'GROUP DBMS COURSEWORK', year:'FALL 2026',
    summary:'Database modeling and SQL coursework including entity definitions, EER diagrams, relational schemas, normalization, and data queries.',
    tags:['SQL','EER diagram','Normalization'], image:'db_eer.webp', featured:'full-feature',
    intro:'A group database management systems project for a fictional tools retailer, mapping suppliers, warehouses, customers, orders, tools, charities, and related business rules into relational structures.',
    role:'Team member in Datab8se Consulting. The submitted report credits the group but does not assign individual tasks; the following are documented team deliverables rather than claimed sole contributions.',
    highlights:[
      'Defined business entities, attributes, metadata, and relationship rules.',
      'Modeled primary and foreign keys and produced an enhanced entity-relationship diagram and relational schema.',
      'Analyzed functional dependencies, integrity constraints, and normalization anomalies.',
      'Documented table implementation and SQL queries for supplier gaps, maximum order counts, and product sales.'
    ],
    result:'A detailed 37-page course submission with data model, SQL implementation evidence, normalization analysis, and example query results.',
    next:'Add live sample datasets, query performance measurements, and a small app interface to demonstrate database usage.',
    stack:['SQL','EER modeling','Relational schemas','Primary / foreign keys','Normalization'],
    gallery:[
      {src:'db_eer.webp',caption:'Toolips Tools Shop enhanced entity-relationship diagram'},
      {src:'db_relational.webp',caption:'Relational schema and table relationships'}
    ]
  },
{
    id:'nickel-city', number:'08', title:'Nickel City Networking — IT Business Concept',
    category:'strategy', type:'ACADEMIC BUSINESS CONCEPT', year:'2026',
    summary:'Built a Buffalo-centered IT consulting concept with service packages, brand identity, investor materials, and illustrative financial models.',
    tags:['Network services','Business strategy','Branding'], image:'ncn_cover.webp', featured:'wide-feature',
    intro:'An entrepreneurial course concept for an IT consulting business serving local organizations through network design, infrastructure support, cybersecurity, and advisory services.',
    role:'Founder and project author of the Nickel City Networking concept. Developed a consistent brand direction and a collection of proposed services and business communications. This showcase does not imply a registered operating business or confirmed customer contracts.',
    highlights:[
      'Outlined network design, cybersecurity and data protection, cloud integration, and IT consulting service offerings.',
      'Organized Essential, Professional, and Enterprise service tiers around different business needs.',
      'Created business card, flyer, letterhead, investment letter, and investor presentation assets.',
      'Prepared sample client-hour, service-rate, billing, and revenue calculations for planning purposes.'
    ],
    result:'A cohesive academic business package demonstrating service design, professional communication, visual branding, and business-oriented IT thinking. All billing/client figures are project examples, not verified revenue.',
    next:'Translate the concept into a technical service delivery plan with documented infrastructure designs, lab demonstrations, and realistic support workflows.',
    stack:['IT services planning','Network design strategy','Business communications','Financial modeling','Microsoft Office'],
    gallery:[
      {src:'ncn_cover.webp',caption:'Nickel City Networking investor presentation cover'},
      {src:'ncn_services.webp',caption:'Proposed networking, security, and cloud service offerings'},
      {src:'ncn_flyer.webp',caption:'Designed service flyer for the academic business concept'},
      {src:'ncn_card.webp',caption:'Brand identity and business card concept'},
      {src:'ncn_billing.webp',caption:'Sample billing and service calculations; illustrative coursework only'}
    ]
  }

];
const grid = document.getElementById('projects-grid');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalOverline = document.getElementById('modal-overline');
const lightbox = document.getElementById('lightbox');
const toast = document.getElementById('toast');
let filter = 'all', search = '', currentProject = null, currentImage = 0, previousFocus = null, previousModalFocus = null;
let toastTimer;
function dashboardArt(compact=false){ return `<div class="dashboard-art${compact?' compact':''}" role="img" aria-label="Illustrative network dashboard graphic, not real live telemetry"><div class="dashboard-frame"><div class="dashboard-head"><span><i></i>NETWORK / PROTOTYPE</span><span>SIMULATED DATA</span></div><div class="dashboard-kpis"><div class="dashboard-kpi"><small>MONITORED DEVICES</small><strong>12 <b>DEMO</b></strong></div><div class="dashboard-kpi"><small>NETWORK HEALTH</small><strong>98% <b>DEMO</b></strong></div><div class="dashboard-kpi"><small>LATENCY</small><strong>18ms <b>DEMO</b></strong></div></div><div class="dashboard-graph"><svg viewBox="0 0 350 75" preserveAspectRatio="none" aria-hidden="true"><path class="gridlines" d="M0 16H350M0 38H350M0 60H350"/><path d="M0 47L19 44L40 51L58 29L76 36L95 43L119 34L135 39L156 23L177 32L200 25L220 38L241 21L260 30L279 19L299 27L320 16L350 20"/></svg></div></div></div>`; }
function projectMarkup(p){
 const cover=p.art?dashboardArt(true):`<img src="${assetUrl(p.image)}" alt="Project visual for ${p.title}" loading="lazy">`;
 const flagship=p.id==='network-dashboard';
 return `<article class="project-card ${p.featured}" data-category="${p.category}"><button class="project-image" type="button" data-open="${p.id}" aria-label="View case study: ${p.title}">${cover}<span class="project-type">${p.type}</span><span class="project-open-icon" aria-hidden="true">↗</span></button><div class="project-card-body">${flagship?'<span class="flagship-kicker">FEATURED / CIPHER</span>':''}<div class="project-meta"><span>${p.number} / ${p.category.toUpperCase()}</span><span class="meta-sep">•</span><span>${p.year}</span></div><h3>${p.title}</h3><p>${p.summary}</p>${flagship?'<p class="flagship-explainer">Real-world monitoring inspiration. An independent networking-focused prototype.</p>':''}<div class="project-footer"><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><button type="button" class="project-card-link" data-open="${p.id}" aria-label="Open ${p.title}">${flagship?'Explore the story':'View case study'} ↗</button></div></div></article>`;
}
function renderProjects(){
 const arr=projectData.filter(p =>
   (filter==='all' || p.category===filter) &&
   (`${p.title} ${p.summary} ${p.tags.join(' ')} ${p.type}`).toLowerCase().includes(search)
 );
 const groups=[
   {key:'networking', label:'NETWORKING'},
   {key:'security', label:'SECURITY'},
   {key:'database', label:'DATABASES'},
   {key:'strategy', label:'STRATEGY'}
 ];
 // Group cards within their own grid, preventing category headings from
 // consuming grid cells and leaving accidental empty columns between rows.
 grid.innerHTML=groups.map(group=>{
   const items=arr.filter(p=>p.category===group.key);
   if(!items.length)return '';
   return `<section class="project-category-group" aria-labelledby="project-group-${group.key}">
     <div class="project-group-divider"><h3 class="project-group-name" id="project-group-${group.key}">${group.label}</h3><span class="project-group-line" aria-hidden="true"></span></div>
     <div class="project-category-grid" data-category="${group.key}">${items.map(projectMarkup).join('')}</div>
   </section>`;
 }).join('');
 document.getElementById('empty-state').hidden=!!arr.length;
}
function imageGalleryHTML(p){if(!p.gallery.length)return '';
 const g=p.gallery[0];
 return `<div class="modal-gallery"><h3>Project evidence & visuals</h3><div class="gallery-main"><img id="gallery-image" src="${assetUrl(g.src)}" alt="${g.caption}" title="Click to enlarge" tabindex="0"><button class="gallery-btn gallery-prev" data-gallery="prev" type="button" aria-label="Previous image">‹</button><button class="gallery-btn gallery-next" data-gallery="next" type="button" aria-label="Next image">›</button></div><div class="gallery-caption"><span id="gallery-caption">${g.caption}</span><span id="gallery-counter">1 / ${p.gallery.length}</span></div><div class="gallery-thumbs">${p.gallery.map((im,i)=>`<button type="button" class="gallery-thumb${i===0?' active':''}" data-image="${i}" aria-label="Show image ${i+1}: ${im.caption}"><img src="${assetUrl(im.src)}" alt=""></button>`).join('')}</div></div>`;
}
function cipherModalHTML(p){
 return `<div class="cipher-case-study">
   <div class="cipher-story-head">
     <div class="cipher-brow"><span class="cipher-live-dot"></span> CIPHER / INDEPENDENT PROJECT / IN PROGRESS</div>
     <h2 id="modal-title">Inspired by real operations.<br><em>Built for network visibility.</em></h2>
     <p>Working with production monitoring tools made me think about how much easier troubleshooting becomes when device health, performance, and changes are visible in one place. Cipher is my personal, AI-assisted attempt to bring that thinking into a networking-focused dashboard.</p>
     <div class="cipher-pills"><span>Personal project</span><span>AI-assisted</span><span>Simulated telemetry</span><span>Python learning</span></div>
   </div>
   <div class="cipher-feature-visual">
     ${dashboardArt(false)}
     <div class="cipher-visual-footer"><span>CIPHER / NETWORK MONITORING PROTOTYPE</span><span>SIMULATED DATA — NOT LIVE TELEMETRY</span></div>
   </div>
   <section class="cipher-origin" aria-labelledby="cipher-origin-title">
     <div class="cipher-section-top"><span>01 / THE INSPIRATION</span><h3 id="cipher-origin-title">Two monitoring tools.<br>One idea.</h3><p>In my IT role, I use different dashboards to follow equipment conditions and the information that shapes day-to-day operations. Seeing how those tools organize complex information influenced what I wanted Cipher to do.</p></div>
     <div class="cipher-influence-grid">
       <article class="cipher-influence">
         <div class="cipher-influence-image" style="background-image:url('${assetUrl('hiveon_dashboard.webp')}')"><span class="cipher-influence-watermark">01 / OPERATIONS</span><strong>Hiveon Enterprise</strong>
           <button class="cipher-shot-trigger" type="button" data-shot-preview="hiveon" aria-label="View Hiveon Enterprise dashboard screenshot" aria-expanded="false"><span class="cipher-shot-crop"><img src="${assetUrl('hiveon_detail.webp')}" alt="" loading="lazy"></span><span class="cipher-shot-hint">HOVER / TAP TO ENLARGE <span aria-hidden="true">↗</span></span><span class="cipher-shot-preview" aria-hidden="true"><img src="${assetUrl('hiveon_dashboard.webp')}" alt="" loading="lazy"><span class="cipher-shot-caption">HIVEON ENTERPRISE <span>ACTUAL DASHBOARD SCREENSHOT</span></span></span></button>
         </div>
         <div class="cipher-influence-copy"><h4>Make infrastructure status visible.</h4><p>Fleet health, availability, worker status, and alerts showed me the importance of quickly spotting devices that need attention.</p></div>
       </article>
       <article class="cipher-influence">
         <div class="cipher-influence-image" style="background-image:url('${assetUrl('loadiq_dashboard.webp')}')"><span class="cipher-influence-watermark">02 / ANALYTICS</span><strong>LoadIQ</strong>
           <button class="cipher-shot-trigger" type="button" data-shot-preview="loadiq" aria-label="View LoadIQ dashboard screenshot" aria-expanded="false"><span class="cipher-shot-crop"><img src="${assetUrl('loadiq_detail.webp')}" alt="" loading="lazy"></span><span class="cipher-shot-hint">HOVER / TAP TO ENLARGE <span aria-hidden="true">↗</span></span><span class="cipher-shot-preview" aria-hidden="true"><img src="${assetUrl('loadiq_dashboard.webp')}" alt="" loading="lazy"><span class="cipher-shot-caption">LOADIQ <span>ACTUAL DASHBOARD SCREENSHOT</span></span></span></button>
         </div>
         <div class="cipher-influence-copy"><h4>Give the numbers context.</h4><p>Real-time and day-ahead market views showed me how trends and time-based information can help explain what's happening and inform decisions.</p></div>
       </article>
     </div>
     <p class="cipher-photo-note">Actual Hiveon and LoadIQ interface screenshots, captured at one point in time. Readings change as systems operate.</p>
   </section>
   <div class="cipher-bridge"><span>THE CONNECTION</span><p>What if a networking team could bring device status, performance trends, and troubleshooting clues into one clear workspace?</p><strong>That's the question behind Cipher. <span aria-hidden="true">↗</span></strong></div>
   <section class="cipher-build" aria-labelledby="cipher-build-title">
     <div class="cipher-section-top cipher-build-heading"><span>02 / THE BUILD</span><h3 id="cipher-build-title">From idea to prototype.</h3></div>
     <div class="cipher-build-grid">
       <div class="cipher-build-block"><span>THE GOAL</span><h4>Understand the network at a glance.</h4><p>Help a networking team monitor devices, see performance trends, and investigate problems.</p></div>
       <div class="cipher-build-block"><span>MY CONTRIBUTION</span><h4>Direct the concept and learn the tools.</h4><p>Defined requirements, chose the design, directed iterations, and learned Python with AI assistance during development.</p></div>
       <div class="cipher-build-block"><span>THE CURRENT RESULT</span><h4>A working prototype.</h4><p>An interactive dashboard demonstrating monitoring and troubleshooting workflows using simulated data.</p></div>
     </div>
     <div class="cipher-next"><span>WHAT'S NEXT</span><p>Connect Cipher to verified live lab measurements and packet-analysis data, then validate and document the results.</p></div>
   </section>
   <div class="cipher-case-actions"><a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener noreferrer">Open Cipher prototype <span aria-hidden="true">↗</span></a><button type="button" class="btn btn-outline" data-share="${p.id}">Copy case study link <span aria-hidden="true">⧉</span></button></div>
 </div>`;
}
function modalHTML(p){
 if(p.id==='network-dashboard') return cipherModalHTML(p);
 const hero=p.art?dashboardArt(false):`<img src="${assetUrl(p.image)}" alt="${p.title} cover" loading="lazy">`;
 return `<div class="modal-header"><div class="modal-eyebrow">${p.number} / ${p.type} / ${p.year}</div><h2 id="modal-title">${p.title}</h2><p class="modal-intro">${p.intro}</p><div class="modal-pills">${p.stack.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="modal-cover">${hero}</div><div class="modal-detail-grid"><div class="modal-detail-col"><h3>My contribution</h3><p>${p.role}</p></div><div class="modal-detail-col"><h3>Project highlights</h3><ul>${p.highlights.map(h=>`<li>${h}</li>`).join('')}</ul></div></div><div class="modal-result"><div class="modal-result-grid"><div><h4>THE OUTCOME</h4><p>${p.result}</p></div><div><h4>WHAT'S NEXT</h4><p>${p.next}</p></div></div></div>${imageGalleryHTML(p)}<div class="modal-actions">${p.link?`<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener noreferrer">${p.linkLabel} ↗</a>`:''}<button type="button" class="btn btn-outline" data-share="${p.id}">Copy project link ⧉</button>${p.linkNote?`<p class="modal-disclaimer">${p.linkNote}</p>`:''}</div>`;
}
function showToast(message){clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),2700)}
function openProject(id, updateHash=true){
 const p=projectData.find(x=>x.id===id);if(!p)return;
 if(modal.hidden)previousFocus=document.activeElement;
 currentProject=p;currentImage=0;modalContent.innerHTML=modalHTML(p);modalOverline.textContent=`${p.number} / PROJECT CASE STUDY`;
 modal.hidden=false;document.body.style.overflow='hidden';const panel=modal.querySelector('.modal-panel');panel.classList.toggle('cipher-panel',p.id==='network-dashboard');panel.scrollTop=0;panel.focus();
 if(updateHash&&location.hash!==`#project=${p.id}`)history.replaceState(null,'',`#project=${p.id}`);
}
function closeProject(updateHash=true){modal.hidden=true;currentProject=null;if(lightbox.hidden)document.body.style.overflow='';if(updateHash&&location.hash.startsWith('#project='))history.replaceState(null,'','#work');if(previousFocus&&document.contains(previousFocus))previousFocus.focus();}
function switchImage(next){if(!currentProject||!currentProject.gallery.length)return;const n=currentProject.gallery.length;currentImage=(next+n)%n;const im=currentProject.gallery[currentImage];const main=document.getElementById('gallery-image');if(!main)return;main.src=assetUrl(im.src);main.alt=im.caption;document.getElementById('gallery-caption').textContent=im.caption;document.getElementById('gallery-counter').textContent=`${currentImage+1} / ${n}`;document.querySelectorAll('.gallery-thumb').forEach((e,i)=>e.classList.toggle('active',i===currentImage));}
function openLightbox(){if(!currentProject||!currentProject.gallery.length)return;previousModalFocus=document.activeElement;const im=currentProject.gallery[currentImage];document.getElementById('lightbox-image').src=assetUrl(im.src);document.getElementById('lightbox-image').alt=im.caption;document.getElementById('lightbox-caption').textContent=im.caption;lightbox.hidden=false;document.getElementById('lightbox-close').focus();}
function closeLightbox(){lightbox.hidden=true;if(modal.hidden)document.body.style.overflow='';if(previousModalFocus&&document.contains(previousModalFocus))previousModalFocus.focus();}
async function copyText(text,message){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}else{let t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();let done=document.execCommand('copy');t.remove();if(!done)throw new Error('Clipboard unavailable')}showToast(message)}catch(e){showToast('Copy unavailable in this browser — use the visible email or URL.')}}
function syncHash(){if(location.hash.startsWith('#project=')){const id=decodeURIComponent(location.hash.slice(9));if(!currentProject||currentProject.id!==id)openProject(id,false)}else if(!modal.hidden)closeProject(false)}
document.getElementById('filter-chips').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderProjects()});
document.getElementById('search-projects').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();renderProjects()});
grid.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openProject(b.dataset.open)});
function clearShotPreviews(){modal.querySelectorAll('.cipher-shot-trigger.is-expanded').forEach(el=>{el.classList.remove('is-expanded');el.setAttribute('aria-expanded','false')})}
modal.addEventListener('click',e=>{const shot=e.target.closest('[data-shot-preview]');if(shot){const wasOpen=shot.classList.contains('is-expanded');clearShotPreviews();if(!wasOpen){shot.classList.add('is-expanded');shot.setAttribute('aria-expanded','true')}return}clearShotPreviews();if(e.target.closest('[data-close]')||e.target.closest('#modal-close')){closeProject();return}const g=e.target.closest('[data-gallery]');if(g)switchImage(currentImage+(g.dataset.gallery==='next'?1:-1));const thumb=e.target.closest('[data-image]');if(thumb)switchImage(Number(thumb.dataset.image));if(e.target.closest('#gallery-image'))openLightbox();const sh=e.target.closest('[data-share]');if(sh){const url=location.href.replace(/#.*$/,'')+`#project=${sh.dataset.share}`;copyText(url,'Project link copied')}});
modal.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='gallery-image')openLightbox()});
document.getElementById('lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!lightbox.hidden){closeLightbox();return}if(modal.querySelector('.cipher-shot-trigger.is-expanded')){clearShotPreviews();return}if(!modal.hidden)closeProject();return;}if(!lightbox.hidden)return;if(!modal.hidden&&e.key==='ArrowRight')switchImage(currentImage+1);if(!modal.hidden&&e.key==='ArrowLeft')switchImage(currentImage-1);if(!modal.hidden&&e.key==='Tab'){const focusable=[...modal.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')].filter(el=>el.offsetParent!==null);if(focusable.length){const a=focusable[0],z=focusable.at(-1);if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}}});
window.addEventListener('hashchange',syncHash);
const root=document.documentElement;let storedTheme=null;try{storedTheme=localStorage.getItem('nj-portfolio-theme')}catch(e){}if(storedTheme==='light'||storedTheme==='dark')root.dataset.theme=storedTheme;
const themeToggle=document.getElementById('theme-toggle');
themeToggle.addEventListener('click',()=>{const light=root.dataset.theme!=='light';root.dataset.theme=light?'light':'dark';try{localStorage.setItem('nj-portfolio-theme',root.dataset.theme)}catch(e){}showToast(`${light?'Light':'Dark'} mode enabled`)});
try{
  const hinted=sessionStorage.getItem('nj-theme-hint-shown');
  if(!hinted){
    window.setTimeout(()=>themeToggle.classList.add('theme-nudge'),700);
    window.setTimeout(()=>themeToggle.classList.remove('theme-nudge'),5200);
    sessionStorage.setItem('nj-theme-hint-shown','1');
  }
}catch(e){
  window.setTimeout(()=>themeToggle.classList.add('theme-nudge'),700);
  window.setTimeout(()=>themeToggle.classList.remove('theme-nudge'),5200);
}
const menuToggle=document.getElementById('menu-toggle'),nav=document.getElementById('primary-nav');
menuToggle.addEventListener('click',e=>{
  e.stopPropagation();
  if(window.setExplorerOpen) window.setExplorerOpen(!nav.classList.contains('open'));
});
// Explorer stays open while the page scrolls; only explicit actions close it.
document.getElementById('copy-email').addEventListener('click',()=>copyText('nyruj84@gmail.com','Email address copied'));
document.getElementById('year').textContent=new Date().getFullYear();
renderProjects();syncHash();

// The Terratek viewer only swaps the selected image; the original source media remains untouched.
const ttSlides = [
  {src:'terratek_solar_hero.webp',alt:'Survey software showing a processed solar-field model and layout rows',label:'SOLAR-FIELD PROCESSING',caption:'Processed model showing solar-array rows, surveyed features, and site layout.'},
  {src:'terratek_hollimont.webp',alt:'Mapping and linework view of the ski resort area',label:'SKI-RESORT MAPPING',caption:'Resort-area drawing showing mapped features and linework over aerial imagery.'},
  {src:'terratek_tin_civil3d.webp',alt:'TIN surface represented as a wireframe terrain model in Civil 3D',label:'TIN TERRAIN SURFACE',caption:'TIN terrain surface displayed in Civil 3D, with mesh and contour information.'}
];
const ttButtons=[...document.querySelectorAll('[data-tt-index]')];
const ttPanel=document.getElementById('tt-stage');
function selectTerratekSlide(index,focusTab=false){
  const slide=ttSlides[index], img=document.getElementById('tt-stage-image');
  if(!slide||!img)return;
  img.src=assetUrl(slide.src);img.alt=slide.alt;
  document.getElementById('tt-stage-caption').textContent=slide.caption;
  document.getElementById('tt-stage-label').textContent=slide.label;
  document.getElementById('tt-image-counter').textContent=`0${index+1} / 03`;
  ttButtons.forEach((button,i)=>{
    const selected=i===index;button.classList.toggle('is-active',selected);
    button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;
  });
  ttPanel.setAttribute('aria-labelledby',ttButtons[index].id);
  if(focusTab)ttButtons[index].focus();
}
ttButtons.forEach((button,index)=>{
  button.addEventListener('click',()=>selectTerratekSlide(index));
  button.addEventListener('keydown',event=>{
    let next=null;
    if(event.key==='ArrowRight')next=(index+1)%ttSlides.length;
    if(event.key==='ArrowLeft')next=(index+ttSlides.length-1)%ttSlides.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=ttSlides.length-1;
    if(next!==null){event.preventDefault();selectTerratekSlide(next,true)}
  });
});
