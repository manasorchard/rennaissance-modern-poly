import { ProprietorInfo, CouncilMember, CouncilGalleryItem } from '../types';

export const DEFAULT_PROPRIETOR_INFO: ProprietorInfo = {
  name: 'Chief Dr. Sir Emmanuel O. Okonkwo',
  titles: 'KSP, OON, B.Sc (Hons), M.Sc (Engineering Systems), Ph.D (Hon. Causa), FNSE, FCIA',
  position: 'Founder, Proprietor & Chairman of the Board of Trustees',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  quote: '"True national greatness is never imported in containers; it is forged with bare hands, calibrated instruments, and passionate minds in modern polytechnic workshops."',
  biography: `Chief Dr. Sir Emmanuel O. Okonkwo is a distinguished Nigerian industrialist, philanthropist, and lifelong advocate for technological education. Born with an unyielding conviction that practical technical skill is the ultimate bedrock of national sovereignty and economic prosperity, he spent over three decades establishing manufacturing, fabrication, and clean-energy infrastructure across West Africa before channeling his resources into foundational educational enterprise.

Driven by a passionate desire to bridge the critical gap between theoretical classroom pedagogy and real-world industrial demands, Sir Okonkwo championed the establishment of Renaissance Modern Polytechnic in Mbaukwu, Anambra State. His philosophy rejects the conventional culture of credentialism without capability, insisting that every graduate of the institution must possess certified industrial competencies that enable self-reliance, innovation, and enterprise creation.

Beyond the polytechnic, Sir Emmanuel has endowed substantial humanitarian projects, healthcare centers, rural electrification initiatives, and tertiary education trust funds. In recognition of his patriotic contributions to Nigerian industry and education, he was conferred with the Officer of the Order of the Niger (OON) and elevated to Knight of St. Paul (KSP), alongside numerous academic fellowships and civic honors.`,
  foundingVision: `To establish Renaissance Modern Polytechnic, Mbaukwu as a premier center of technical innovation in Sub-Saharan Africa—equipping scholars with cutting-edge engineering skills, digital programming fluency, and entrepreneurial discipline to power Africa's industrial renaissance.`,
  philanthropyAndScholarships: `Through the Okonkwo Educational Foundation and the Renaissance Endowment Fund, the Proprietor sponsors 50 annual full-tuition scholarships for brilliant indigent candidates from rural and underserved communities admitted into National Diploma (ND) and Higher National Diploma (HND) programmes in Engineering, Computer Science, and Renewable Energy Technology. He has also directly funded the procurement of contemporary Computer Numerical Control (CNC) lathe machines, 3D printing equipment, and advanced solar inverters for polytechnic workshops.`,
  corePillars: [
    'Technological Self-Reliance & Applied Craftsmanship',
    'Zero Disruption to Academic Calendars',
    'Modern Workshop Infrastructure & Industry Partnerships',
    'Uncompromising Academic & Moral Integrity',
    'Equal Opportunity & Subsidized Technical Education'
  ],
  educationAndCredentials: [
    'B.Sc. (First Class Honours) Mechanical & Production Engineering',
    'M.Sc. Industrial Systems & Project Management',
    'Fellow, Nigerian Society of Engineers (FNSE)',
    'Fellow, Chartered Institute of Administration (FCIA)',
    'Registered Engineer, Council for the Regulation of Engineering in Nigeria (COREN)',
    'Doctor of Technology (Honoris Causa) in Vocational Excellence'
  ],
  honorsAndRecognitions: [
    'Officer of the Order of the Niger (OON) – Federal Republic of Nigeria',
    'Knight of Saint Paul (KSP)',
    'Eminent Industrialist of the Year – Manufacturers Association of Nigeria (MAN)',
    'Distinguished Patron of Technical Education – National Association of Polytechnic Students',
    'Honorary Chieftaincy Title of Eze Nwanne Di Na Mba of Mbaukwu Ancient Kingdom'
  ],
  officeContact: {
    email: 'proprietor.office@renaissancemodern.edu.ng',
    phone: '+234 803 330 9980',
    location: 'Founder’s Executive Secretariat, Top Floor, Senate & Administrative Tower, Renaissance Modern Polytechnic, Mbaukwu, Anambra State'
  }
};

export const DEFAULT_COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: 'council-1',
    name: 'Prof. Okey A. Nnaji',
    titles: 'FAS, FNIP, Ph.D (Solid State & Applied Physics), MNES',
    role: 'Chairman of the Governing Council',
    category: 'Executive',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Eminent scholar, former Dean of Physical Sciences, and internationally published researcher in semiconductor materials and applied physics.',
    fullBiography: `Prof. Okey A. Nnaji serves as the Chairman of the Governing Council of Renaissance Modern Polytechnic, Mbaukwu. With an illustrious academic career spanning four decades across top federal universities and international research consortia, Prof. Nnaji provides visionary policy steering, strategic academic governance, and statutory oversight. Under his council leadership, the institution has attained expedited NBTE programmatic accreditations and forged vital linkages with industrial manufacturing firms.`,
    qualifications: [
      'Ph.D. Solid State Physics – University of Nigeria, Nsukka',
      'M.Sc. Applied Physics & Solar Materials',
      'Fellow, Academy of Science (FAS)',
      'Fellow, Nigerian Institute of Physics (FNIP)'
    ],
    tenure: '2022 – Present (Reappointed 2nd Term)',
    committees: [
      'Finance and General Purposes Committee (Chairman)',
      'Senior Staff Appointments and Promotions Board',
      'Council Tenders and Procurement Board'
    ],
    email: 'council.chairman@renaissancemodern.edu.ng'
  },
  {
    id: 'council-2',
    name: 'Engr. Prof. E. C. Maduka',
    titles: 'FNSE, FNIEEE, COREN Reg., Ph.D (Power Systems)',
    role: 'Rector & Council Member',
    category: 'Executive',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Chief Academic and Executive Officer of the Polytechnic, pioneer advocate for hands-on solar microgrid engineering in technical education.',
    fullBiography: `Engr. Prof. E. C. Maduka leads the day-to-day administrative and academic operations of the polytechnic as its Rector. He is a recognized authority in high-voltage engineering, renewable power architecture, and tertiary technical education management. As a statutory council member, he presents the polytechnic’s academic policies, infrastructural expansions, and faculty performance directly to the Governing Council.`,
    qualifications: [
      'Ph.D. Power Systems & Control Engineering',
      'Fellow, Nigerian Society of Engineers (FNSE)',
      'Registered Engineer, COREN',
      'Chartered Electrical Engineer'
    ],
    tenure: 'Ex-Officio (Tenured Rector)',
    committees: [
      'Academic Board (Chairman)',
      'Finance and General Purposes Committee',
      'Management Committee (Chairman)'
    ],
    email: 'rector@renaissancemodern.edu.ng'
  },
  {
    id: 'council-3',
    name: "Rev'd Can James",
    titles: 'B.A. (Ed), M.Ed (Educational Management), FCIA, FIPMA, JP',
    role: 'Registrar & Secretary to the Governing Council',
    category: 'Executive',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Chief Administrative Officer of the Polytechnic, custodian of the institutional seal, archives, and official council records.',
    fullBiography: `Rev'd Can James is the statutory Secretary to the Governing Council and Head of the Registry Administration. With extensive senior administrative experience across tertiary educational systems, he ensures the lawful execution of council resolutions, statutory compliance under NBTE guidelines, and prompt documentation of council proceedings and academic policies.`,
    qualifications: [
      'M.Ed. Educational Administration & Planning',
      'B.A. (Ed) English & Educational Governance',
      'Fellow, Chartered Institute of Administration (FCIA)',
      'Fellow, Institute of Professional Managers and Administrators (FIPMA)'
    ],
    tenure: 'Ex-Officio (Secretary to Council)',
    committees: [
      'Governing Council Secretariat (Secretary)',
      'Appointments and Promotions Board (Secretary)',
      'Tenders and Procurement Committee (Secretary)'
    ],
    email: 'registrar@renaissancemodern.edu.ng'
  },
  {
    id: 'council-4',
    name: 'Barr. Lady Chinyere Obi-Eze',
    titles: 'SAN, LL.B (Hons), BL, LL.M (Corporate Law)',
    role: 'Representative of the Proprietor / Board of Trustees',
    category: 'Executive',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Senior Advocate of Nigeria, specialist in corporate governance, educational trust law, and institutional ethics.',
    fullBiography: `Barr. Lady Chinyere Obi-Eze, SAN represents the Board of Trustees and the Founder on the Governing Council. She ensures that the founding ideals, educational investments, and legal fidelity of Renaissance Modern Polytechnic are vigorously upheld. Her legal expertise guides the polytechnic’s contractual agreements, intellectual property protocols, and land tenure governance.`,
    qualifications: [
      'Senior Advocate of Nigeria (SAN)',
      'LL.M. International Commercial and Corporate Law',
      'Member, Nigerian Bar Association (NBA)',
      'Associate, Chartered Institute of Arbitrators (CIArb)'
    ],
    tenure: '2023 – 2027',
    committees: [
      'Finance and General Purposes Committee',
      'Legal Advisory & Disciplinary Panel (Chairperson)',
      'Tenders Board'
    ],
    email: 'council.legal@renaissancemodern.edu.ng'
  },
  {
    id: 'council-5',
    name: 'Dr. (Mrs.) Ifeoma Okafor',
    titles: 'B.Sc, M.Sc, Ph.D (Analytical Chemistry), FCSN, MICCON',
    role: 'Representative of the Academic Board',
    category: 'Academic',
    photoUrl: 'https://images.unsplash.com/photo-1580894732488-828e833189fa?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Dean of Applied Sciences, champion of laboratory safety and curriculum accreditation compliance.',
    fullBiography: `Elected by the Polytechnic Academic Board to represent the academic community on Council, Dr. Okafor champions teaching excellence, laboratory infrastructure modernization, and research ethics. She acts as a vital bridge communicating faculty innovations and academic requirements directly into the council’s budgetary agenda.`,
    qualifications: [
      'Ph.D. Industrial & Analytical Chemistry',
      'Fellow, Chemical Society of Nigeria (FCSN)',
      'Chartered Chemist (ICCON)'
    ],
    tenure: '2024 – 2026 (Elected Representative)',
    committees: [
      'Curriculum and Academic Standards Committee',
      'Staff Welfare and Development Committee'
    ],
    email: 'academic.board.rep@renaissancemodern.edu.ng'
  },
  {
    id: 'council-6',
    name: 'Alhaji Mohammed K. Usman',
    titles: 'B.Eng, M.Sc (Vocational Education), MNSE',
    role: 'Representative of the National Board for Technical Education (NBTE)',
    category: 'Government & NBTE',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Senior director and regulatory officer with extensive experience in polytechnic quality assurance and national skills frameworks.',
    fullBiography: `Alhaji Usman serves as the statutory governmental and regulatory representative from the National Board for Technical Education (NBTE). He ensures that all curriculum offerings, examination protocols, credit structures, and laboratory apparatus at Renaissance Modern Polytechnic adhere strictly to federal benchmark minimum academic standards (BMAS).`,
    qualifications: [
      'M.Sc. Technical & Vocational Education',
      'B.Eng. Mechanical Engineering',
      'Member, Nigerian Society of Engineers (MNSE)'
    ],
    tenure: 'Statutory Regulatory Appointment',
    committees: [
      'Accreditation and Quality Assurance Board',
      'Institutional Audit and Standards Panel'
    ],
    email: 'nbte.liaison@renaissancemodern.edu.ng'
  },
  {
    id: 'council-7',
    name: 'Engr. Emeka D. Okoye',
    titles: 'B.Eng, MBA, FNSE, FIEE',
    role: 'Representative of Industry & Manufacturing Sector (MAN)',
    category: 'Industry & Private Sector',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Group Managing Director of Apex Industrial Fabricators and regional chairman for public-private technical partnerships.',
    fullBiography: `Engr. Emeka D. Okoye represents the organized private sector and industrial employers on the Council. He is instrumental in securing guaranteed Student Industrial Work Experience Scheme (SIWES) placements, facilitating dual-apprenticeship curricula, and arranging industrial machine donations from multinational fabrication firms.`,
    qualifications: [
      'MBA Corporate Industrial Strategy',
      'B.Eng. Electrical & Electronic Engineering',
      'Fellow, Nigerian Society of Engineers (FNSE)'
    ],
    tenure: '2023 – 2027',
    committees: [
      'Industrial Linkages and SIWES Board (Chairman)',
      'Finance and General Purposes Committee'
    ],
    email: 'industry.liaison@renaissancemodern.edu.ng'
  },
  {
    id: 'council-8',
    name: 'Ichie Sir Bennett Nwankwo',
    titles: 'KSM, B.Sc (Economics), MPA',
    role: 'Representative of the Host Community (Mbaukwu Town)',
    category: 'Community & Stakeholders',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    profileSummary: 'Respected community elder, former permanent secretary, and liaison officer between Mbaukwu town and polytechnic management.',
    fullBiography: `Ichie Sir Bennett Nwankwo represents the traditional council, elders, and youth of Mbaukwu town on the Governing Council. He preserves harmonious community relations, oversees polytechnic-community security agreements, and coordinates local employment and scholarship quotas for indigents.`,
    qualifications: [
      'Master of Public Administration (MPA)',
      'B.Sc. Economics – University of Ibadan',
      'Knight of St. Mulumba (KSM)'
    ],
    tenure: '2022 – 2026',
    committees: [
      'Host Community Relations Committee (Chairman)',
      'Campus Security and Environmental Safety Board'
    ],
    email: 'host.community@renaissancemodern.edu.ng'
  }
];

export const DEFAULT_COUNCIL_GALLERY: CouncilGalleryItem[] = [
  {
    id: 'cg-1',
    title: '14th Statutory Sitting of the Governing Council',
    caption: 'The Chairman of Council, Prof. Okey Nnaji, presiding over the 14th regular session at the Senate Chambers to approve the 2025 Capital Development Budget.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&auto=format&fit=crop&q=80',
    category: 'Council Sittings',
    date: '12 January 2025',
    location: 'Senate Chambers & Council Boardroom, Mbaukwu'
  },
  {
    id: 'cg-2',
    title: 'Council On-Site Inspection of New Robotics & Software Incubator',
    caption: 'Governing Council members inspecting the newly installed high-speed computing clusters and embedded robotics stations in the Department of Computer Science.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80',
    category: 'Campus Inspections',
    date: '28 November 2024',
    location: 'Engineering & Computing Complex, Wing B'
  },
  {
    id: 'cg-3',
    title: 'Joint Council & NBTE Full Accreditation Verification Walkthrough',
    caption: 'Council delegates alongside federal NBTE resource evaluators examining electrical power transmission benches and heavy mechanical machining workshops.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&auto=format&fit=crop&q=80',
    category: 'Accreditation & Governance',
    date: '15 October 2024',
    location: 'Mechanical Engineering Workshop Plaza'
  },
  {
    id: 'cg-4',
    title: 'Council Academic Procession at 2024 Matriculation Ceremony',
    caption: 'Members of the Governing Council in official university academic regalia leading the solemn matriculation procession at the Mbaukwu Convocation Arena.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80',
    category: 'Ceremonial & Matriculation',
    date: '18 May 2024',
    location: 'Mbaukwu Convocation Amphitheater'
  },
  {
    id: 'cg-5',
    title: 'Groundbreaking Ceremony for Solar Microgrid Research Farm',
    caption: 'The Proprietor, Chief Dr. Emmanuel Okonkwo, and Council Chairman performing the ceremonial turning of the sod for the 150kW Campus Solar Farm.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=80',
    category: 'Campus Inspections',
    date: '04 March 2024',
    location: 'Renewable Energy Innovation Enclave'
  },
  {
    id: 'cg-6',
    title: 'Council Interactive Parley with Student Union Executives',
    caption: 'Governing Council standing committee meeting with newly elected SUG leaders to discuss student welfare, campus broadband WiFi, and hostel amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    category: 'Council Sittings',
    date: '19 February 2025',
    location: 'Council Conference Suite, Administrative Wing'
  }
];
